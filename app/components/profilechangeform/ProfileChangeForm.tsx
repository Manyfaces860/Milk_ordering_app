'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { GrCheckmark } from 'react-icons/gr'
import { myStyle } from '@/app/page';

const ProfileChangeForm = () => {
    const usernameref = useRef<HTMLInputElement>(null);
    const firstnameref = useRef<HTMLInputElement>(null);
    const lastnameref = useRef<HTMLInputElement>(null);
    const emailref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    const [showloading, setLoading] = useState(false);
    const [currentUserInfo, setChange] = useState(false);
    const { push } = useRouter()

    const HandleProfileChange = async (username : string , firstname : string , lastname : string , email : string , password : string) => {
        try {
            setLoading(true);
            const response = await fetch("/api/personalinfochange", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: username, firstname: firstname, lastname : lastname , email : email , password : password }),
            });
            setLoading(false);
            // const result = await response.json()
            
            // console.log(response);
            response.status === 200 && setChange(true)
            response.status === 200 && push('/api/auth/signout')
            
      
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        }
        
        return (
    <div>
        <form action="" className='flex space-x-2 items-center flex-col'>
        <div className="border-b border-pink-800 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    ref={firstnameref}
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="bg-pink-300 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    ref={lastnameref}
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="bg-pink-300 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    ref={emailref}
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="bg-pink-300 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    ref={passwordref}
                    name="password"
                    id="password"
                    autoComplete="address-level2"
                    className="bg-pink-300 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center" style={{width : 'inherit'}}>
            <button
              onClick={ async (event) => {
                event.preventDefault()
                let username = usernameref.current?.value!
                let lastname = lastnameref.current?.value!
                let firstname = firstnameref.current?.value!
                let email = emailref.current?.value!
                let password = passwordref.current?.value!
                await HandleProfileChange(username=username , firstname = firstname ,lastname=lastname , email = email , password = password)
              }}
              type="submit"
              className="btn btn-warning lowercase"
            > { showloading && <span className='animate-spin' ><HiOutlineUserCircle/></span>}{"  "}
              {currentUserInfo && <span><GrCheckmark/></span> }{"  "}
              Submit
            </button>
          </div>
        </form>
    </div>
  )
}


export default ProfileChangeForm