"use client";

import { useEffect, useRef, useState } from "react";
import { GetAllData } from "../utility/GetAllData";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import BubbleBox from "../components/bubblebox/BubbleBox";
import Feedback from "../components/feedback/Feedback";
interface data {
  id: number;
  quantity: string;
  deliveredTo: string;
  deliverystatus: boolean;
}

const VendorDashboard = () => {
  const [ dataCame, setDataCame ] = useState<data[]>([]);
  const [ columnNames, setColumnNames ] = useState<string[]>()
  const [ columnItems, setColumnItems ] = useState<any[][]>()
  const [isSpecificData , setIsSpecificData] = useState(false);
  const [ filter, setFilter ] = useState("");
  const filterref = useRef<HTMLSelectElement>(null);
  
  useEffect(() => {
    const GetUserData = async () => {
      const response = await GetAllData("/api/orderdata", {
        filter: filterref.current?.value,
      });
      setDataCame(response.data);
    };
    GetUserData();
  }, [filter]);

  const handleCut = () => {
    setIsSpecificData(false);
  }

  return (
    <div
      className="flex flex-col flex-1 w-full h-full gap-10 items-center"
      style={{ width: "90vw" , height : "100vh" }}
    >
      {isSpecificData && <BubbleBox handleCut={handleCut} columnItems={columnItems!} columnNames={columnNames!} />}
      <div className="flex items-start md:flex-row flex-col space-x-1 gap-2">
        <select ref={filterref} className="btn glass btn-wide font-sans text-gray-600">
          <option value="">Filter</option>
          <option value="week">week</option>
          <option value="month">month</option>
          <option value="year">year</option>
        </select>

        <button
          className="btn btn-primary font-sans"
          onClick={(event) => {
            event.preventDefault();
            setFilter(filterref.current?.value!);
          }}
        >
          hit it
        </button>
      </div>

      <div
        className="overflow-x-auto rounded-md"
        style={{ width: "90vw" , height : "50vh" }}
      >
        <table className="table bg-yellow-900 rounded-md p-3">
          {/* head */}
          <thead>
            <tr>
              <th>Orderid</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>From</th>
              <th>Delivered to</th>
              <th>see all</th>
            </tr>
          </thead>
          <tbody>
            {dataCame.map((item) => (
              <tr className="bg-base-200">
                <td>{item.id}</td>
                <td>Milk</td>
                <td>{item.quantity}ml</td>
                <td>Krishna</td>
                <td>{item.deliveredTo}</td>
                {/* <td>
                  {item.deliverystatus === false ? (
                    <span className="inline-flex items-center rounded-md bg-red-300 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                      pending
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      success
                    </span>
                  )}
                </td> */}
                <td>
                  <button onClick={async () => {
                    const response = await GetAllData('/api/getspecificorder' , {orderid : item.id});
                    setColumnItems(response.data.items);
                    setColumnNames(response.data.names);
                    console.log(response.data)
                    setIsSpecificData(true);
                  }}> <IoIosArrowDown/> </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorDashboard;
