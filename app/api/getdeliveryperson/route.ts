import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req : NextRequest) {
    return NextResponse.json({data : await prisma.usertable.findMany({
        where : {role : 'deliveryboy'},
        select : {
            username: true,
            firstname: true,
            lastname: true,
            id: true,
            email: true,
            hashedPassword: false,
            registeredAt: true,
            role: true,
            orders: true,
            addresses: true,
            extramilk: true,
        }
    })},{status : 200})
}