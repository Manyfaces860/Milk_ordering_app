import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import bcrypt from 'bcrypt'

const schema = z.object({
    email : z.string().email(),
    password : z.string()
})

export async function POST(req : NextRequest) {
    const body = await req.json()
    const validation = schema.safeParse(body)

    if(!validation.success) return NextResponse.json({info : 'provide correct details'}, {status : 400})
    const user = await prisma.usertable.findUnique({
        where : {email : body.email}
    })
    if (user) return NextResponse.json({info : 'user already exists'}, {status : 400})
    const hashedPassword = await bcrypt.hash(body.password, 10)
    const newUser = await prisma.usertable.create({
        data : {
            email : body.email,
            hashedPassword : hashedPassword
        }
    })
    return newUser ? NextResponse.json(newUser, {status : 201}) :  NextResponse.json('an error ocurred', {status : 400})
}
