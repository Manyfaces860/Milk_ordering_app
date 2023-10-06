import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const order = await prisma.orderstable.findUnique({
        where : {id : 1}
    }
    )
    console.log(order)
    return NextResponse.json(order,{status : 200})
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    body.quantity = (parseFloat(body.quantity)*1000)
    const newOrder = await prisma.orderstable.create({
        data : {
            quantity : body.quantity,
            plan : body.plan
        }
    })
    console.log('created')
    // return NextResponse.redirect(new URL('/success',req.url))
    return NextResponse.json(newOrder , {status : 201})
}