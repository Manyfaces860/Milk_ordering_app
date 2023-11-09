import { prisma } from "@/prisma/client";
import moment from "moment";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req : NextRequest) {
    const token = await getToken({req : req})
    const getOrderId = await prisma.orderstable.findFirst({
        where : { usertableId : parseInt(token?.sub!) },
        orderBy : { planstartat : "desc"},
        select : {
            id : true,
            quantity: true,
            plan: true,
            deliverystatus: false,   
            Usertable: false,     
            usertableId: false,
            deliveredTo: true,
            customerfeedback: false,
            planstartat: true,
            orignallyplanendat: false,
            actualplanendat: true,
            extramilkquantity : false,  
            extramilkordertotaldays : false,    
            extramilkfulfillment : false,
            orderdelivery  : false,
        }
    })
    console.log(getOrderId)
    if ( token?.role === 'admin') {
        const totalBill = await prisma.inventory.aggregate({
            where : { addedat : { gte : moment().subtract('1' ,'month').toDate() } },
            _sum: {
                price : true
            }
        })
        const crafTotalBill = { _sum : {soldat : 0} }
        crafTotalBill['_sum']['soldat'] = totalBill['_sum']['price']!;
        return NextResponse.json({data : {bill : crafTotalBill  , userinfo : {}}} , {status : 200});
        }
    else {
        const totalBill = await prisma.orderDelivery.aggregate({
            where : { orderstableId : getOrderId?.id },
            _sum : {
                soldat : true
            }
        })
        return NextResponse.json({data : {bill : totalBill , userinfo : getOrderId}} , {status : 200});
    }

    // generate the bill with order id.
}