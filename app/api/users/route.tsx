import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export async function GET(req : NextRequest){
    const response = await prisma.user.findMany()
    return NextResponse.json(response)
}

export async function POST(req : NextRequest){
    const body = await req.json()
    const validation = schema.safeParse(body)
    if(!validation.success) {
        return NextResponse.json('give correct information',{status : 400})
    }
    const user = await prisma.user.findUnique({
        where : {email : body.email}
    })
    if(!user) {
        const newUser = await prisma.user.create({
            data : {
                name : body.name,
                email : body.email
            }
        })
        return NextResponse.json(newUser,{status : 201})
    }
    return NextResponse.json('give a different email',{status : 400})
}