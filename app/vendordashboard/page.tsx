"use client";

import { useEffect, useRef, useState } from "react";
import { GetAllData } from "../utility/GetAllData";

interface data {
  id: number;
  quantity: string;
  deliveredTo: string;
  deliverystatus: boolean;
}

const VendorDashboard = () => {
  const [dataCame, setDataCame] = useState<data[]>([]);
  const filterref = useRef<HTMLSelectElement>()
  useEffect(() => {
    const GetUserData = async () => {
      const response = await GetAllData("/api/orderdataforvendor", {});
      setDataCame(response.data);
    };
    GetUserData();
  }, [filterref.current?.value]);

  return (
    <div className="flex flex-col flex-1 w-full h-full gap-10 items-center justify-center" style={{width : '90vw'}}>
      <div className="inline-flex flex-col items-start">
        <select ref={filterref} className="btn glass btn-wide">
          <option value="">Filter</option>
          <option value="">week</option>
          <option value="">month</option>
          <option value="">year</option>
        </select>
      </div>

      <div className="overflow-x-auto" style={{width : '90vw' , height : '70vh'}}>
        <table className="table bg-red-800 rounded-md p-3">
          {/* head */}
          <thead>
            <tr>
              <th>Orderid</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>From</th>
              <th>Delivered to</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {dataCame.map((item) => (
              <tr className="bg-base-200">
                <th>{item.id}</th>
                <td>Milk</td>
                <td>{item.quantity}</td>
                <td>Krishna</td>
                <td>{item.deliveredTo}</td>
                <td>
                  {item.deliverystatus === false ? (
                    <span className="inline-flex items-center rounded-md bg-red-300 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                      pending
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      success
                    </span>
                  )}
                </td>
                <td>
                  <button className="btn btn-outline btn-secondary">
                    Delivery?
                  </button>
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
