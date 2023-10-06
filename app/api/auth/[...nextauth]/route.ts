import { prisma } from "@/prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";
import { OAuthUserConfig } from "next-auth/providers/oauth";
export const authOptions : NextAuthOptions = {
  adapter : PrismaAdapter(prisma),
  providers : [
    CredentialsProvider({
                name: "Credentials",
                credentials: {
                  email: { label: "Email", type: "email", placeholder: "abhi@gmail.com" },
                  password: { label: "Password", type: "password" , placeholder: '12345' }
                },
                async authorize(credentials , req) {
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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        const newProfile = { 
          id : profile.sub,
          name : profile.name,
          email : profile.email ,
          image : profile.picture,
          role: profile.role ?? "user"
        }
        return newProfile
      }
    }),
  ],
  session : {
    strategy : "jwt"
  },
  
  callbacks: {
    async jwt({ token, user }) {
      // console.log(token)
      if(user) token.role = user.role
      console.log(token)
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      // console.log(session)
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST}





