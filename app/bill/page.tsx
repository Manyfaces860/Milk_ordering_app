"use client";

import Bill from "../components/bill/Bill"
import { useSession } from "next-auth/react";
import { myStyle } from "../page";


const page = () => {
  const {status , data : session} = useSession();

  return (
    <div style={{width : '80%', height : '100vh', padding : '20px'}}>
        <Bill role={session?.user.role!} />
    </div>
  )
}

export default page