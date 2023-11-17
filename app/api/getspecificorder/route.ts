import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { stringify } from "querystring";
import { z } from "zod";

const schema = z.object({
    orderid : z.number()   
})

export async function POST(req: NextRequest) {
    const body = await req.json()
    const validation = schema.safeParse(body)
    if (!validation.success) return NextResponse.json({message : 'something is wrong with the body of your request'},{status : 400})
    
    const allUsers = await prisma.orderDelivery.findMany({
        where : {
            orderstableId : body.orderid
        },
        select : {
            id : true, 
            deliverydate : true,
            deliverystatus : true,
            soldat : true,
        }
    })

    const columnNames : string[] = []
    const columnItems : any[][] = []

    for(let i in allUsers[0]){
            columnNames.push(i)
    }

    allUsers.forEach(element => {
        columnItems.push([element.id , (element.deliverydate) , element.deliverystatus , element.soldat])
    }); 
    // console.log(columnNames)
    // console.log(columnItems)

    return NextResponse.json({data : {names : columnNames , items : columnItems}} , {status : 200})
    
}