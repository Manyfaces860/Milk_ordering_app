import { prisma } from "@/prisma/client";
import moment from "moment";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const schema = z.object({
    orderid : z.number(),
    deliveryboyemail : z.string().email(),
    deliveryboyname : z.string()
})

export async function POST(req : NextRequest){
    const token = await getToken({req : req})
    const body = await req.json()
    // console.log(body)
    const today = moment().toDate()
    // const validation = schema.safeParse(body)
    // if (!validation.success) return NextResponse.json({message : "please provide correct order details!"},{status : 400})

    const previousDay = await prisma.orderDelivery.findFirst({
        where : { 
            orderstableId : body.orderid 
        },
        orderBy : { deliverydate : "desc"}
    })
    if ( !previousDay ) {
        // first delivery of the order
        const setDelivery = await prisma.orderDelivery.create({
            data : {
                deliveryboyemail : body.deliveryboyemail,
                deliveryboyname : body.deliveryboyname,
                orderstableId : body.orderid,
                day : 1,
                assigned : true,
                assigningtime : today,
                assigningdate : moment().format('YYYY-MM-DD')
            }
        })
        return NextResponse.json({data : setDelivery} , {status : 201})
    }
    else {
        const setDelivery = await prisma.orderDelivery.create({
            data : {
                deliveryboyemail : body.deliveryboyemail,
                deliveryboyname : body.deliveryboyname,
                orderstableId : body.orderid,
                day : previousDay.day + 1,
                assigned : true,
                assigningtime : today,
                assigningdate : moment().format('YYYY-MM-DD')
            }
        })
            return NextResponse.json({data : setDelivery} , {status : 201})
    }

} 