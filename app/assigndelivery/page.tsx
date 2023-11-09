"use client";

import React, { useEffect, useState } from "react";
import { GetAllData } from "../utility/GetAllData";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5"

export const inheritWidth = {
  width : 'inherit'
}
const AssignDelivery = () => {
  const [dataCame, setDataCame] = useState<any[]>([]);
  const [partner, setDeliveryPartner] = useState<any[]>([]);
  const [isDeliverySet, SetDeliveryStatus] = useState(false)
  
  useEffect(() => {
    const GetUserData = async () => {
      const response = await GetAllData("/api/getordertoassign", {});
      console.log(response.data);
      SetDeliveryStatus(false);
      setDataCame(response.data);
    };

    GetUserData();
  }, [isDeliverySet]);

  useEffect(() => {
    const GetDeliveryPartner = async () => {
      const response = await GetAllData("/api/getdeliveryperson", {});
      setDeliveryPartner(response.data);
    };
    GetDeliveryPartner();
  }, []);

  const HandleAssign = async ( orderid : number , deliveryboyemail : string , deliveryboyname : string) => {
      const response = await GetAllData("/api/assigndelivery", {
        orderid : orderid , deliveryboyemail : deliveryboyemail, deliveryboyname : deliveryboyname 
      });
      SetDeliveryStatus(true);
  }


  return (
    <>
     <div className="flex flex-col gap-5 " style={inheritWidth}>
        {partner.map((boy) => (
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion" />
            <div className="collapse-title text-xl font-medium">
              {boy.firstname}
            </div>
            <div className="collapse-content">
              {dataCame.map((item) => (
                <div className="flex gap-12 justify-between">
                  <div className="flex flex-col gap-1">
                    <div>
                      <p className="border-l-2 border-l-emerald-500 pl-2 ">order id - {item.id}</p>
                    </div>
                    <div>
                      <p className="border-l-2 border-l-emerald-700 pl-2 ">quantity - {item.quantity}</p>
                    </div>
                    <div>
                      <p className="border-l-2 border-l-emerald-900 pl-2 ">address - {item.deliveredTo}</p>
                    </div>
                    <div className="w-full h-px bg-slate-400 mb-2 mt-1"></div>
                  </div>
                  <button 
                    className="btn btn-ghost"
                    onClick={ () => {
                        HandleAssign(item.id , boy.email , boy.firstname)
                        SetDeliveryStatus(true);
                        alert(`delivery assigned for ${boy.firstname}`)
                    }}                    
                    >assign
                  </button>    
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AssignDelivery;
