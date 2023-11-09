import { prisma } from "@/prisma/client"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"



const schema = z.object({
    quantity : z.number(),
    fat : z.number(),
    price : z.number(),
})

export async function POST(req: NextRequest) {
    const token = await getToken({req : req})
    const body = await req.json()

    const validation = schema.safeParse(body)
    if (!validation.success) return NextResponse.json({message : "please provide correct order details!"},{status : 400})

    const newAddition = await prisma.inventory.create({
        data : {
            quantity : body.quantity,
            fat : body.fat,
            price : body.price
        }
    })
    // console.log(newAddition)
    // return NextResponse.redirect(new URL('/success',req.url))
    return NextResponse.json(newAddition , {status : 201})
}