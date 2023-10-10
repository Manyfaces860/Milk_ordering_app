import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { z } from "zod";
import { prisma } from "@/prisma/client";
import bcrypt from 'bcrypt'

const schema = z.object({
    firstname : z.string().min(3),  // only z.string() does not work the validation will return true on an empty string too.
    lastname : z.string().optional(),
    email : z.string().optional(),
    password : z.string().optional(),
})

export async function POST(req : NextRequest) {
    const session = await getServerSession(authOptions)
    console.log(session?.user.email,'this is my')
    const body = await req.json()

    const validation = schema.safeParse(body)
    console.log(validation)
    if (!validation.success) return NextResponse.json({message : "something with the input is not right!"},{status : 400})

    const user = await prisma.usertable.findUnique({
        where : {email : session?.user.email}
    })
    // console.log(user , 'is my user')
    // console.log(body.email ?? user?.email , 'result')       this ?? operators does not work like an or operator
    // const hashedPassword = await bcrypt.hash(body.password, 10)
    const newUser = await prisma.usertable.update({
        where : {email : session?.user.email},
        data : {
            email : body.email || user?.email,
            hashedPassword : user?.hashedPassword,
            firstname : body.firstname || user?.firstname,
            lastname : body.lastname || user?.lastname,
        }
    })
    return NextResponse.json({message : 'user updated successfully!'}, {status : 200})
}