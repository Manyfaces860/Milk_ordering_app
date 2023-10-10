import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";


export async function GET(req: NextRequest) {
    const order = await prisma.orderstable.findUnique({
        where : {id : 1}
    }
    )
    console.log(order)
    return NextResponse.json(order,{status : 200})
}

const schema = z.object({
    quantity : z.number(),
    plan : z.string(),
    streetaddress : z.string(),
})

export async function POST(req: NextRequest) {
    const token = await getToken({req : req})
    const body = await req.json()

    const validation = schema.safeParse(body)
    if (!validation.success) return NextResponse.json({message : "please provide correct order details!"},{status : 400})
    body.quantity = (parseFloat(body.quantity)*1000)
    const newOrder = await prisma.orderstable.create({
        data : {
            quantity : body.quantity,
            plan : body.plan,
            deliveredTo : body.streetaddress,
            deliverystatus : false,
            usertableId : parseInt(token?.sub!),
            customerfeedback : 'nofeedbackyet'
        }
    })
    console.log('created')
    // return NextResponse.redirect(new URL('/success',req.url))
    return NextResponse.json(newOrder , {status : 201})
}