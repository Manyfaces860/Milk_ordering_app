import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/prisma/client';

const schema = z.object({
    role : z.string()
})

export async function POST(req : NextRequest) {
    const session = await getServerSession(authOptions)

    const body = await req.json()
    const validation = schema.safeParse(body)
    if (!validation.success) return NextResponse.json({message : "This role doesn't exist!"},{status : 400})

    // console.log(session?.user.email!,'yeah')  // this expression provides the email correct otherwise undefined
    
    const settingRole = await prisma.user.update({
        where : {email : session?.user.email!},
        data : {
            role : body.role
        }
    })

    return NextResponse.json({role : body.role} , {status : 200})
}


