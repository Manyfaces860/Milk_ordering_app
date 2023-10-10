'use client';
import Link from "next/link";
import React from "react";
import { VscSignIn,VscSignOut } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineUserAdd } from "react-icons/ai"
import { BsBoxSeam } from "react-icons/bs"
import { useSession } from "next-auth/react";
import RoleChooseForm from "../rolechooseform/RoleChooseForm";


const NavBar = () => {
  const {status , data : session} = useSession()
  return (
    <div className="flex justify-between sm:p-3 p-2 font-sans font-normal text-gray-800 backdrop-blur h-fit w-full">
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
            { session?.user.role === 'vendor' && <li>
              <Link
                href={"/vendordashboard"}
                className="flex items-center gap-1 text-green-500 hover:text-yellow-300 transition-all ease-in"
              >
                <BsBoxSeam /> Orders
              </Link>
            </li>}
          </ul>
        </details>
      </div>
      <div className="flex">
        {session?.user.role === 'user' && <span><RoleChooseForm /></span> }
      </div>
    </div>
  );
};

export default NavBar;
