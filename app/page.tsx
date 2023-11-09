import { getServerSession } from "next-auth";
import { LuMilk } from "react-icons/lu";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const myStyle = {
    width: "inherit",
  };
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div
      className="flex flex-1 justify-center items-center h-screen w-screen max-[500px]:w-screen"
      style={myStyle}
    >
      <main className="font-extrabold text-2xl sm:text-7xl text-cyan-600 -mt-24">
        {session && (
          <span className="font-sans text-gray-700 text-center capitalize -mt-10">
            Hello {session.user.user?.name}
          </span>
        )}
        {session === null && (
          <div className="flex text-black">
            welcome to
            <p className="text-purple-500 ml-2 ">MILKER</p>
            .com
          </div>
        )}
        <p className="text-1xl sm:text-4xl font-light flex gap-1">
          Should we Order. <LuMilk />{" "}
        </p>
        <p className="text-1xl sm:text-4xl font-light flex gap-1">
          role : {session?.user.role}
        </p>
        
      </main>
    </div>
  );
}
