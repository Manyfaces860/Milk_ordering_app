import { prisma } from "@/prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions : NextAuthOptions = {
  adapter : PrismaAdapter(prisma),
  providers : [
    CredentialsProvider({
                name: "Credentials",
                credentials: {
                  email: { label: "Email", type: "email", placeholder: "abhi@gmail.com" },
                  password: { label: "Password", type: "password" , placeholder: '12345' }
                },
                async authorize(credentials, req) {
                    if (!credentials?.email || !credentials?.password) return null
      
                    const reqUser = await prisma.usertable.findUnique({
                      where : {email : credentials.email}
                    })
                    if (!reqUser) return null
      
                    const passwordMatch = await bcrypt.compare(credentials.password , reqUser.hashedPassword)
                    return passwordMatch ? reqUser : null
                    
                }
              }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session : {
    strategy : "jwt"
  },
}

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST}





