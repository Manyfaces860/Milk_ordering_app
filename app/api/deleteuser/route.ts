import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req : NextRequest) {
    const body = await req.json();
    console.log(body);
    const deletedUser = await prisma.usertable.delete({
        where : {
            id : parseInt(body.userid)
        }
    })
    return NextResponse.json({data : deletedUser}, {status : 200 , statusText : 'user deleted successfully'})
}