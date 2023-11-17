import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/prisma/client';

const schema = z.object({
    orderId : z.number(),
    feedback : z.string(),
    deliverydate : z.date()
})

export async function POST(req : NextRequest) {
    const session = await getServerSession(authOptions)

    const body = await req.json()
    console.log(body);
    // const validation = schema.safeParse(body)
    // if (!validation.success) return NextResponse.json({message : "please provide a valid string"},{status : 400})

    const makingFeedback = await prisma.orderDelivery.update({
        where : {id : body.orderId , deliverydate : body.deliverydate},
        data : {
            customerfeedback : body.feedback
        }
    })
    return NextResponse.json({message : 'success'},{status : 200})
}


