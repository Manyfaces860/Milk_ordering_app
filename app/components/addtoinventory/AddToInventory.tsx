'use client';
import React, { useRef, useState } from 'react'
import { LuMilk } from 'react-icons/lu';
import { GrCheckmark } from 'react-icons/gr';
import { AiOutlineReload } from 'react-icons/ai';

const AddToInventoryForm = () => {
    const quantityref = useRef<HTMLInputElement>(null);
    const fatref = useRef<HTMLInputElement>(null);
    const priceref = useRef<HTMLInputElement>(null);
    const [showloading, setLoading] = useState(false);
    const [inventorydata, setInventoryData] = useState(false);

    const handleClick = async (quantity: number , fat : number , price : number) => {
        try {
          setInventoryData(false)
          setLoading(true);
          const response = await fetch("/api/addtoinventory", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: quantity , fat : fat , price : price }),
          });
          setLoading(false);
          // const result = await response.json()
          
          response.status === 201 && setInventoryData(true)
          
          response.status === 201 && console.log(response);
    
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };

      const myStyle = {
        width: "inherit",
      };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen font-sans text-lg"
      style={myStyle}
    >
      {showloading !== true && (
        <p className="font-extrabold text-black">Add to Inventory</p>
      )}
      {showloading === false ? (
        <form action="" className="w-1/2">
          <div className="mb-3 flex-1 flex-col flex justify-center items-stretch">
            <label className="text-rose-600" htmlFor="quantity">
              Quantity (mL)
            </label>
            <input
              ref={quantityref}
              className="block text-indigo-800 bg-indigo-200 rounded h-8 p-2 ring-2 ring-pink-500"
              id="quantity"
              type="number"
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="fat"
              className="block font-medium leading-6 text-gray-900 font-mono sm:text-lg sm:leading-6"
            >
              Fat(g)
            </label>
            <div className="mt-2">
              <input
                type='number'
                ref={fatref}
                id="fat"
                className="block max-w-full w-full overflow-scroll rounded border-0 py-1.5 px-2 bg-indigo-200 text-indigo-800 placeholder:text-gray-400 sm:text-lg sm:leading-6"
              />
            </div>
          </div>
          <div className="mb-3 flex-1 flex-col flex justify-center items-stretch">
            <label className="text-indigo-500" htmlFor="price">
              Price
            </label>
            <input
              type='number'
              ref={priceref}
              className="text-indigo-800 rounded bg-indigo-200 h-8 p-1 ring-inset ring-red-500"
              id="price"
            />
          </div>
          <div className="mb-3 flex-col flex-1 text-black flex justify-center items-stretch">
            <button
              className="bg-red-300 rounded text-red-700 hover:bg-transparent transition-all ease-in hover:border-2 hover:border-red-700"
              onClick={async (event) => {
                event.preventDefault();
                let quantity = quantityref.current?.value;
                let fat = fatref.current?.value;
                let price = priceref.current?.value;
                await handleClick(parseInt(quantity!), parseInt(fat!), parseInt(price!) );
              }}
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
      ) : (
        <div className="text-black text-4xl animate-spin">
          <AiOutlineReload />
        </div>
      )}
    </div>
  )
}

export default AddToInventoryForm