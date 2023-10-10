"use client";
import React, { useRef, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";

const ProductChooseForm = () => {
  const quantityref = useRef<HTMLInputElement>(null);
  const planref = useRef<HTMLSelectElement>(null);
  const streetaddressref = useRef<HTMLTextAreaElement>(null);
  const [showloading, setLoading] = useState(false);
  const [order, setOrder] = useState(false);

  const handleClick = async (
    quantity: number,
    plan: string,
    streetaddress: string
  ) => {
    try {
      setOrder(false);
      setLoading(true);
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: quantity,
          plan: plan,
          streetaddress: streetaddress,
        }),
      });
      setLoading(false);
      // const result = await response.json()

      console.log(response);
      response.status === 201 && setOrder(true);

      response.status === 201 &&
        alert("you request was successfull...........thanks for ordering");
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
        <p className="font-extrabold text-black">Make an Order</p>
      )}
      {showloading === false ? (
        <form action="" className="w-1/2">
          <div className="mb-3 flex-1 flex-col flex justify-center items-stretch">
            <label className="text-rose-600" htmlFor="quantity">
              Quantity
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
              htmlFor="streetaddress"
              className="block font-medium leading-6 text-gray-900 font-mono sm:text-lg sm:leading-6"
            >
              Street address
            </label>
            <div className="mt-2">
              <textarea
                ref={streetaddressref}
                id="streetaddress"
                className="block max-w-full w-full overflow-scroll rounded border-0 py-1.5 px-2 bg-indigo-200 text-indigo-800 placeholder:text-gray-400 sm:text-lg sm:leading-6"
              />
            </div>
          </div>
          <div className="mb-3 flex-1 flex-col flex justify-center items-stretch">
            <label className="text-indigo-500" htmlFor="plan">
              Plan
            </label>
            <select
              ref={planref}
              className="text-indigo-800 rounded bg-indigo-200 h-8 p-1 ring-inset ring-red-500"
              id="plan"
            >
              <option value="">Select Plan</option>
              <option value="month">month</option>
              <option value="daily">daily</option>
            </select>
          </div>
          <div className="mb-3 flex-col flex-1 text-black flex justify-center items-stretch">
            <button
              className="bg-red-300 rounded text-red-700 hover:bg-transparent transition-all ease-in hover:border-2 hover:border-red-700"
              onClick={async (event) => {
                event.preventDefault();
                let quantity = quantityref.current?.value;
                let plan = planref.current?.value;
                let streetaddress = streetaddressref.current?.value;
                await handleClick(parseInt(quantity!), plan!, streetaddress!);
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
  );
};
export default ProductChooseForm;
