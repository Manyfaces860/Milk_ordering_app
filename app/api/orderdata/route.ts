import { prisma } from "@/prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req : NextRequest) {
    const token = await getToken({req : req})
    if (!token) return NextResponse.json({message : 'Sorry lad you are not logged in'},{status : 400})
    // const body = req.json()
    const allData = await prisma.orderstable.findMany({
        where : {usertableId : parseInt(token.sub!) }
    })
    // console.log(allData)
    return NextResponse.json({data : allData} , {status : 200})
}