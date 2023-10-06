"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

const ProductChooseForm = () => {
  const quantityref = useRef<HTMLInputElement>(null);
  const planref = useRef<HTMLSelectElement>(null);
  const [showloading, setLoading] = useState(false);
  const [order, setOrder] = useState(false);

  const handleClick = async (quantity: string, plan: string) => {
    try {
      setOrder(false)
      setLoading(true);
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: quantity, plan: plan }),
      });
      setLoading(false);
      // const result = await response.json()
      
      console.log(response);
      response.status === 201 && setOrder(true)
      
      response.status === 201 && (alert('you request was successfull...........thanks for ordering'))

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const myStyle = {
    width: 'inherit',
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen font-sans text-lg" style={myStyle} >
        {showloading !== true && <p className="font-extrabold text-black" >Make an Order</p>}
      {showloading === false ? (
        <form action="" className="w-1/2" >
          <div className="mb-3 flex-1 flex-col flex justify-center items-stretch">
            <label className="text-rose-600" htmlFor="quantity">
              Quantity
            </label>
            <input
              ref={quantityref}
              className="text-indigo-800 bg-indigo-200 rounded h-6 p-2 ring-2 ring-pink-500"
              id="quantity"
              type="number"
            />
          </div>
          <div className="mb-3 flex-1 flex-col flex justify-center items-stretch">
            <label className="text-indigo-500" htmlFor="plan">
              Plan
            </label>
            <select ref={planref} className="text-indigo-800 rounded bg-indigo-200 h-8 p-1 ring-inset ring-red-500" id="plan">
              <option value="">Select Plan</option>
              <option value="month">month</option>
              <option value="daily">daily</option>
            </select>
          </div>
          <div className="mb-3 flex-col flex-1 text-black flex justify-center items-stretch">
            <button
              className="bg-red-300 rounded text-red-700 hover:bg-transparent transition-all ease-in"
              onClick={async (event) => {
                event.preventDefault();
                let quantity = quantityref.current?.value;
                let plan = planref.current?.value;
                await handleClick(quantity ?? "lol", plan ?? "llol");
              }}
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
      ) : (
        <div className="text-black text-4xl animate-spin" >processing...</div>
      )}
    </div>
  );
};
export default ProductChooseForm;
