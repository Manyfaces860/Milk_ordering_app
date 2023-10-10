import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import bcrypt from 'bcrypt'

const schema = z.object({
    username : z.string().min(3),
    firstname : z.string().min(3),
    lastname : z.string().optional(),
    email : z.string().email(),
    password : z.string(),
    role : z.string()
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
            hashedPassword : hashedPassword,
            firstname : body.firstname,
            lastname : body.lastname,
            username : body.username,
            role : body.role
        }
    })
    return newUser ? NextResponse.json(newUser, {status : 201}) :  NextResponse.json('an error ocurred', {status : 400})
}
