import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
// import middleware from 'next-auth/middleware'
// export { default } from 'next-auth/middleware'  // exporting default object from this module which it exports 


// export function middleware(req : NextRequest) {    // custom middleware implementation
//     return NextResponse.json({message : 'success'})
// }

import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'

export default withAuth (
    function middleware( req :NextRequestWithAuth){
        // console.log(req.nextUrl.pathname,'heyyo')
        // console.log(req.nextauth.token, 'heythere')
    },
    {
        callbacks : {
            authorized : ({token}) => token?.role === 'admin'
        }
    }
)


export const config = {
    // matcher : ['/ordering/:id*']
    matcher : ['/admin']
}