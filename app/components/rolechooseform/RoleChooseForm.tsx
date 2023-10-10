'use client';
import React, { useRef, useState } from 'react'
import { LuMilk } from 'react-icons/lu';
import { GrCheckmark } from 'react-icons/gr';

const RoleChooseForm = () => {
    const roleref = useRef<HTMLSelectElement>(null);
    const [showloading, setLoading] = useState(false);
    const [currentrole, setRole] = useState(false);

    const handleClick = async (role: string) => {
        try {
          setRole(false)
          setLoading(true);
          const response = await fetch("/api/setrole", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: role }),
          });
          setLoading(false);
          // const result = await response.json()
          
          response.status === 200 && setRole(true)
          
          response.status === 200 && console.log(response);
    
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };

  return (
    <div>
        <form action="" className='flex space-x-2 items-center'>
          <div className="space-2 flex-1 flex justify-center items-center gap-2">
            <label className="text-indigo-500" htmlFor="plan">
              Role
            </label>
            <select ref={roleref} className="text-indigo-800 rounded bg-indigo-200 h-8 p-1 ring-inset ring-red-500" id="plan">
              <option value="">Select Your Role</option>
              <option value="farmer">Farmer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
          <div>
            <button
              className="bg-red-300 text-red-700 hover:bg-transparent gap-2 flex items-center transition-all ease-in p-1 border-white border rounded"
              onClick={async (event) => {
                event.preventDefault();
                let role = roleref.current?.value!
                await handleClick(role);
              }}
              type="submit"
            >
                {showloading && <span className='animate-spin' ><LuMilk/></span> }{"  "}
                {currentrole && <span><GrCheckmark/></span> }{"  "}
              submit
            </button>
          </div>
        </form>
    </div>
  )
}

export default RoleChooseForm