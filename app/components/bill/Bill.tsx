"use client";
import { GetAllData } from "@/app/utility/GetAllData";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";

interface billData {
  id: number;
  quantity: number;
  plan: string;
  deliveredTo: string;
  planstartat: string;
  actualplanendat: string;
}

const Bill = () => {
  const {status , data : session} = useSession()
  const [data, setData] = useState<billData>();
  const [bill, setBill] = useState(0);
  const [month, setMonth] = useState('');

  useEffect(() => {
    const GetUserBill = async () => {
      const response = await GetAllData("/api/generatebill", {});
      setBill(response.data.bill["_sum"].soldat);
      setData(response.data.userinfo);
      console.log(response.data);
    };

    GetUserBill();
  }, []);

  useEffect(() => {getMonthName()}, [data])

  const getMonthName = () => {
    // if (data?.plan !== "daily") {
      const date = moment(data?.planstartat);
      setMonth(date.format('MMMM'));
    // }
  };
  

  return (
    <>
    { session?.user.role === 'user' &&
      <div className="flex w-2/4 flex-col p-10 border-2 rounded-lg bg-black">
        <div className="flex justify-center">
          <header>Bill</header>
        </div>

        <p>Milker.com</p>

        <p>
          plan started in <b>{month}</b>
        </p>

        <div className="overflow-x-auto mt-3 rounded-3">
          <table className="table table-danger">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">total(month+daily)</th>
                <th scope="col">plan</th>
                <th scope="col">ordered on</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">Milk</td>
                <td scope="row">{bill}</td>
                <td scope="row">{data?.plan}</td>
                <td scope="row">{data?.planstartat}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3">
          <b>Address</b>
          <address>{data?.deliveredTo}</address>
        </div>

        <div className="mt-1">
          <b>Payment method</b>
          <p>Phone-pe</p>
        </div>
      </div>
    }
    { session?.user.role === 'admin' &&
      <div className="flex w-2/4 flex-col p-10 border-2 rounded-lg bg-black">
        <div className="flex justify-center">
          <header>Admin Bill</header>
        </div>

        <p>Milker.com</p>

        <p>
          Month <b>{month}</b> 
        </p>

        <div className="overflow-x-auto mt-3 rounded-3">
          <table className="table table-danger">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">Milk</td>
                <td scope="row">{bill}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    }
    </>
  );
};

export default Bill;
