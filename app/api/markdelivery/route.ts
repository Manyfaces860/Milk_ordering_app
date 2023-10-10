
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/prisma/client'
import { getToken } from 'next-auth/jwt'

const schema = z.object({
    deliveryStatus : z.boolean() 
})

export async function POST(req : NextRequest) {
    const token = await getToken({req : req})
    if (!token) return NextResponse.json({message : 'you are not logged in'},{status : 400})
    const body = await req.json()

    const validation = schema.safeParse(body)
    if (!validation.success) return NextResponse.json({message : "please mark true or false according to the delivery status!"},{status : 400})

    const settingDeliveryStatus = await prisma.orderstable.update({
        where : {usertableId : parseInt(token?.sub!)},
        data : {
            deliverystatus : body.deliveryStatus
        }
    })

    return NextResponse.json({deliveryStatus : body.deliveryStatus} , {status : 200})
    
}