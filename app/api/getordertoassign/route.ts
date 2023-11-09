import { prisma } from "@/prisma/client";
import moment from "moment";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req : NextRequest) {
    const token = await getToken({req : req})
    // const body = await req.json()

    const today = moment().toDate()
    const todaysdate = moment().format('YYYY-MM-DD')
    
    const checkAssignment = await prisma.orderDelivery.findMany({
        where : {assigningdate : todaysdate},
        select : {
            day : false,
            id : false,
            deliveryboyemail : false,
            deliveryboyname : false,
            deliverydate : false,
            deliverystatus : false,
            orderstableId : true, 
            assigned : true,
            assigningdate : false,
            assigningtime : false
        }
    })

    let assignedDone : number[] = [] 
    checkAssignment.forEach((item) => {
        assignedDone.push(item.orderstableId!)
    })

    const toDeliver = await prisma.orderstable.findMany({
        where : {actualplanendat : { gte : today } , id : { notIn : assignedDone }}
    })

    // checkAssignment.forEach((itemm) => {
    //     toDeliver.forEach((item) => {
    //        if (item.id !== itemm.orderstableId){
    //             if (newToDeliver.length === 0){
    //                 newToDeliver.push(item)
    //             }
    //             else {
    //                 newToDeliver.forEach((itemmm) => {
    //                     if ( itemm.orderstableId !== itemmm.id && ) {
    //                         null
    //                     }
    //                 })
    //             }
    //        }
    //     })
    // })
    console.log(toDeliver , 1)
    console.log(checkAssignment, 2)

    return NextResponse.json({ data : toDeliver} ,{status : 200})
}