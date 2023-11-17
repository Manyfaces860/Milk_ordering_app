'use client';

import React, { useEffect, useState } from "react";
import ProfileChangeForm from "../components/profilechangeform/ProfileChangeForm";
import Feedback from "../components/feedback/Feedback";
import { GetAllData } from "../utility/GetAllData";

interface data {
  id : number,
  quantity : string, 
  deliveredTo : string, 
  deliverystatus : boolean
}

const Profilepage = () => {
  const [dataCame , setDataCame] = useState<data[]>([])
  
  useEffect(() => {
    const GetUserData = async () => {
      const response =  await GetAllData('/api/orderdata',{})
      setDataCame(response.data)
    }
    GetUserData()


  },[])



  const [change,setChange] = useState(false)
  const [showFeedback,setFeedback] = useState(false)
  
  const HandleSubmitFeedback = () => {
    setFeedback(false)
  }
  const HandleCancelFeedback = () => {
    setFeedback(false)
  }

  const dummyData = [
    {orderId : 1 ,name : "Milk" , quantity : "10L" , deliveredto : "sirol road shiv nagar" , deliverystatus : "success"},
    {orderId : 2 ,name : "Milk" , quantity : "13L" , deliveredto : "sirol road shiv nagar" , deliverystatus : "success"},
    {orderId : 3 ,name : "Milk" , quantity : "8L" , deliveredto : "sirol road shiv nagar" , deliverystatus : "pending"},
    {orderId : 4 ,name : "Milk" , quantity : "30L" , deliveredto : "sirol road shiv nagar" , deliverystatus : "success"}
]


  const mystyle = {
    width : 'inherit'
  }
  return (
    <div className="flex justify-evenly md:flex-row flex-col gap-4 flex-1" style={mystyle}>
      <div className="flex flex-col justify-evenly gap-4 border-2 border-green-800 p-3 md:p-3 md:w-2/5">
        { change ? <ProfileChangeForm /> :<div className="card bg-base-100 shadow-xl" >
          <figure>
            <img
              src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
              alt="profile image" 
            />
          </figure>
          <div className="card-body"> 
            <h2 className="card-title">abhishek gupta</h2>
            <p>agbli@gmail.com</p>

          </div>
        </div>}
        <button className="btn btn-primary" onClick={(event) => setChange(true) }>Edit info</button>
        { change && <button className="btn btn-danger" onClick={() => setChange(false)} >cancel</button> }
        
        <hr className="text-black" />

        <div className="overflow-x-scroll text-black" >
          <table className="table">
            {/* head */}
            <thead className="text-blue-700">
              <tr>
                <th></th>
                <th>Address</th>
                <th>Phone no.</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>320403903</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;

              {/* <td>
                {(item.deliverystatus === false) ? <span className="inline-flex items-center rounded-md bg-red-300 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                pending
                </span> : <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                success
                </span>}
              </td> */}
              
              // <th>
              //   { showFeedback ? <Feedback orderId={item.id} HideFeedbackAgain={HandleSubmitFeedback} HideFeedbackAgainByCancelButton={HandleCancelFeedback} /> : <button 
              //   className="btn btn-ghost btn-xs" 
              //   onClick={() => setFeedback(true)}
              //   >
              //     give feedback
              //   </button>}
              // </th>