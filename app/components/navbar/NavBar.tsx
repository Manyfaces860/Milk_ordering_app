'use client';
import Link from "next/link";
import React from "react";
import { BiSolidKey } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useSession } from "next-auth/react";


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
                <BiSolidKey /> Sign-in
              </Link>
            </li>}
            { status === 'authenticated' && <li>
              <Link
                href={"/api/auth/signout"}
                className="flex items-center gap-1 mr-3 hover:text-yellow-500 transition-all ease-in invert"
              >
                <BiSolidKey /> Sign-out
              </Link>
            </li>}
            { status === 'authenticated' && <li>
              <Link
                href={"/ordering"}
                className="flex items-center gap-1 text-green-500 hover:text-yellow-300 transition-all ease-in"
              >
                <FiShoppingCart /> Order
              </Link>
            </li>}
          </ul>
        </details>
      </div>
      <div className="flex">
        {/* <p className="font-sans text-gray-700 text-center capitalize">{session?.user?.name}</p> */}
      </div>
    </div>
  );
};

export default NavBar;
