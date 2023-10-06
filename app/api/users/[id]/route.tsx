import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export async function GET(req : NextRequest, { params : { id } } : { params : { id : string } }){
    const user = await prisma.user.findUnique({
        where : {id : parseInt(id)}
    })
    if (!user) return NextResponse.json('user not found')
    else return NextResponse.json(user)
}

export async function PUT(req : NextRequest, { params : { id } } : { params : { id : string } }) {
    const body = await req.json()
    
    const user = await prisma.user.findUnique({
        where : {id : parseInt(id)}
    })
    if(!user) {
        return NextResponse.json('user does not exist.',{status : 400})
    }
    else {
        const updatedUser = await prisma.user.update({
            where : {id : parseInt(id)},
            data : {
                name : body.name,
                email : body.email
            }
        })
        return NextResponse.json(updatedUser,{status : 201})
    }
}

export async function DELETE(req : NextRequest, { params : { id } } : { params : { id : string } }){
    const body = await req.json()
    
    const user = await prisma.user.findUnique({
        where : {id : parseInt(id)}
    })
    if(!user) {
        return NextResponse.json('user does not exist.',{status : 400})
    }
    else {
        await prisma.user.delete({
            where : {id : user.id}
        })
        return NextResponse.json({},{status : 200})
    }
}