import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    // id should be ordersdelivery id
    orderid : z.number(),
    deliverystatus : z.boolean()
})

export async function POST(req: NextRequest) {
    const body = await req.json()
   
    const validation = schema.safeParse(body)
    if (!validation.success) return NextResponse.json({message : "please provide correct order details!"},{status : 400})
   
    const assignDelivery = await prisma.orderDelivery.update({
        where : { id : body.orderid },
        data : {
            deliverystatus : body.deliverystatus
        }
    })
    return NextResponse.json({data : assignDelivery} , {status : 200})
}