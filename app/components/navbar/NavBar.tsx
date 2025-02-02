'use client';
import Link from "next/link";
import React from "react";
import { VscSignIn,VscSignOut } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineUserAdd } from "react-icons/ai"
import { BsBoxSeam } from "react-icons/bs"
import { MdAssignmentTurnedIn } from "react-icons/md"
import { RiBillFill } from "react-icons/ri"
import { useSession } from "next-auth/react";
// import RoleChooseForm from "../rolechooseform/RoleChooseForm";
import { Bebas_Neue } from "next/font/google"
import { IoMdAdd  } from "react-icons/io";
import { LuUsers2 } from "react-icons/lu";
const bebasFont = Bebas_Neue({
  subsets : ['latin'],
  weight : ['400'],
  variable : '--font-bebas'
})

const NavBar = () => {
  const {status , data : session} = useSession();
  return (
    <div className="flex gap-1 items-center sm:p-3 p-2 font-sans font-normal text-gray-800 backdrop-blur h-fit w-full">
      <div className="">
        <details className="dropdown">
          <summary className="m-1 btn">
            {" "}
            <GiHamburgerMenu />{" "}
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40">
            { status === 'authenticated' && <li>
              <Link className="text-white" href={"/myprofile"}>
                <CgProfile /> Personal info
              </Link>
            </li>}
            { status === 'unauthenticated' && <li>
              <Link
                href={"/api/auth/signin"}
                className="flex items-center gap-1 mr-3 hover:text-yellow-500 transition-all ease-in invert"
              >
                <VscSignIn /> Log-in
              </Link>
            </li>}
            { (status === 'authenticated') && <li>
              <Link
                href={"/api/auth/signout"}
                className="flex items-center gap-1 mr-3 hover:text-yellow-500 transition-all ease-in invert"
              >
                <VscSignOut /> Sign-out
              </Link>
            </li>}
            { status === 'authenticated' && session?.user.role === 'user' && <li>
              <Link
                href={"/ordering"}
                className="flex items-center gap-1 text-green-500 hover:text-yellow-300 transition-all ease-in"
              >
                <FiShoppingCart /> Order
              </Link>
            </li>}
            { status === 'unauthenticated' && <li>
              <Link
                href={"/registeruser"}
                className="flex items-center gap-1 text-green-500 hover:text-yellow-300 transition-all ease-in"
              >
                <AiOutlineUserAdd /> register
              </Link>
            </li>}
            { <li>
              <Link
                href={"/vendordashboard"}
                className="flex items-center gap-1 text-green-500 hover:text-yellow-300 transition-all ease-in"
              >
                <BsBoxSeam /> Orders
              </Link>
            </li>}
            { status === 'authenticated' && session?.user.role === 'admin' && <li>
              <Link
                href={"/addtoinventory"}
                className="flex items-center gap-1 text-green-500 hover:text-yellow-300 transition-all ease-in"
              >
                <IoMdAdd  />Addmilk
              </Link>
            </li>}
            { status === 'authenticated' && session?.user.role === 'admin' && <li>
              <Link
                href={"/assigndelivery"}
                className="flex items-center gap-1 text-green-500 hover:text-yellow-300 transition-all ease-in"
              >
                <MdAssignmentTurnedIn /> AssignDelv
              </Link>
            </li>}
            { status === 'authenticated' && <li>
              <Link
                href={"/bill"}
                className="flex items-center gap-1 text-green-500 hover:text-yellow-300 transition-all ease-in"
              >
                <RiBillFill /> Bill
              </Link>
            </li>}
            { status === 'authenticated' && session?.user.role === 'admin' && <li>
              <Link
                href={"/seeusers"}
                className="flex items-center gap-1 text-green-500 hover:text-yellow-300 transition-all ease-in"
              >
                <LuUsers2 /> SeeUsers
              </Link>
            </li>}
          </ul>
        </details>
      </div>
      {/* <div className="flex">
        {session?.user.role === 'user' && <span><RoleChooseForm /></span> }
      </div> */}
      <div>
        <Link className={`text-lg ${bebasFont.variable} italic btn btn-outline text-cyan-800`} href={'/'}>Home</Link>
      </div>
    </div>
  );
};

export default NavBar;
