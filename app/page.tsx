import { getServerSession } from "next-auth";
import { LuMilk } from "react-icons/lu";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Anton } from "next/font/google"

const antonFont = Anton({
  subsets : ['latin'],
  weight : ['400'],
})

export const myStyle = {
  width: "inherit"
};
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  


  return (
    <div
      className="flex flex-1 justify-center items-center h-screen w-screen max-[500px]:w-screen"
      style={myStyle}
    >
      <main className=" text-2xl sm:text-6xl -mt-24">
        {session && (
          <span className= {` text-center capitalize -mt-10 ${antonFont.className}`} >
            Hello {session.user.user?.name}
          </span>
        )}
        {session === null && (
          <div className="flex text-black">
            welcome to
            <p className=" ml-2 ">MILKER</p>
            .com
          </div>
        )}
        <p className={`text-1xl sm:text-4xl font-normal flex gap-1 order-text`}>
          Should we Order. <LuMilk />{" "}
        </p>
        <p className="text-1xl sm:text-4xl font-light flex gap-1">
          role : {session?.user.role}
        </p>
        
      </main>
    </div>
  );
}
