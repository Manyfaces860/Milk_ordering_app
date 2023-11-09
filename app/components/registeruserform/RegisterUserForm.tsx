'use client'; 
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from "react";

const RegisterUserForm = () => {
    const usernameref = useRef<HTMLInputElement>(null);
    const firstnameref = useRef<HTMLInputElement>(null);
    const lastnameref = useRef<HTMLInputElement>(null);
    const emailref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    const roleref = useRef<HTMLSelectElement>(null);
    const [showloading, setLoading] = useState(false);
    const [statusOfRegistration, setRegister] = useState(false);
    const { push } = useRouter()

    const HandleRegistration = async (username : string , firstname : string , lastname : string , email : string , password : string , role : string) => {
      try {
        setLoading(true);
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, firstname: firstname, lastname : lastname , email : email , password : password , role : role}),
        });
        setLoading(false);
        // const result = await response.json()
        
        // console.log(response);
        response.status === 201 && setRegister(true)
        
        response.status === 201 && push('/success')
  
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }


  return (
    <div className="p-4" >
      {" "}
      <form>
        <div className="space-y-12">
          <div className="border-b border-pink-800 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      ref={usernameref}
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="bg-pink-300 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-purple-700 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="janesmith"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:col-span-3">
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  ref={roleref}
                  name="role"
                  autoComplete="role-name"
                  className="bg-pink-300 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={'user'} >Customer</option>
                  <option value={'vendor'} >Vendor</option>
                  <option value={'farmer'} >Farmer</option>
                  <option value={'deliveryboy'} >Delivery Partner</option>
                </select>
              </div>
            </div>

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

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={ async (event) => {
                event.preventDefault()
                let username = usernameref.current?.value!
                let lastname = lastnameref.current?.value!
                let firstname = firstnameref.current?.value!
                let email = emailref.current?.value!
                let password = passwordref.current?.value!
                let role = roleref.current?.value!
                await HandleRegistration(username , firstname , lastname , email , password , role)
              }}
              type="submit"
              className="hover:invert rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterUserForm;
