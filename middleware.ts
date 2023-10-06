import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
// import middleware from 'next-auth/middleware'
export { default } from 'next-auth/middleware'  // exporting default object from this module which it exports 


// export function middleware(req : NextRequest) {    // custom middleware implementation
//     return NextResponse.json({message : 'success'})
// }

export const config = {
    // matcher : ['/ordering/:id*']
    matcher : ['/ordering']
}