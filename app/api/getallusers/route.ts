import { prisma } from "@/prisma/client";
import dynamic from "next/dynamic";
import { Concert_One } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    dynamic : z.string().default('yes'),
    user : z.string().email()    
})

export async function POST(req: NextRequest) {
    // const body = await req.json()
    // const validation = schema.safeParse(body)
    // if (!validation.success) return NextResponse.json({message : 'something is wrong with the body of your request'},{status : 400})
    
    // if (body.dynamic === 'yes') {
    //     const allUsers = await prisma.usertable.findMany()

    //     const columnNames : string[] = []
    //     const columnItems : string[][] = []
    
    //     for(let i in allUsers[0]){
    //         if(i !== 'hashedPassword')
    //             columnNames.push(i)
    //     }
    
    //     allUsers.forEach(element => {
    //         columnItems.push([element.username , element.firstname , element.lastname , String(element.id) , element.email , String(element.registeredAt) , element.role])
    //     }); 
    //     // console.log(columnNames)
    //     // console.log(columnItems)
    
    //     return NextResponse.json({data : {columnNames : columnNames , columnItems : columnItems}} , {status : 200})
    // }
    // else {
    //     const singleUser = await prisma.usertable.findUnique({
    //         where : {email : body.user}
    //     })
    //     return NextResponse.json({data : singleUser}, {status : 200})
    // }

    // simple getting all users for admin 

    const allUsers = await prisma.usertable.findMany();

    const columnNames : string[] = []
    const columnItems : any[][] = []

    for(let i in allUsers[0]){
        if(i !== 'hashedPassword')
            columnNames.push(i)
    }

    allUsers.forEach(element => {
        columnItems.push([element.username , element.firstname , element.lastname , String(element.id) , element.email , String(element.registeredAt) , element.role])
    }); 
    // console.log(columnNames)
    // console.log(columnItems)

    return NextResponse.json({data : {names : columnNames , items : columnItems}} , {status : 200})

}