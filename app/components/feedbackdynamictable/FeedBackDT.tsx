"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import Feedback from '../feedback/Feedback'


interface Props {
    columnNames : string[],
    columnItems : any[][],
}


const FeedbackDT = ({columnNames , columnItems } : Props) => {
    const [showFeedback,setFeedback] = useState(false);

    const HandleSubmitFeedback = () => {
        setFeedback(false)
      }
      const HandleCancelFeedback = () => {
        setFeedback(false)
      }

  return (
    <>
        <div
        className="overflow-x-scroll rounded-md"
        style={{ width: "70vw", height: "40vh" }}
      >
        <table className="table bg-yellow-900 rounded-md p-3">
          {/* head */}
          <thead>
            <tr>
              {columnNames.map((item) => <th>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {columnItems.map((item) => <tr key={item[4]} className="bg-base-200">{item.map((value) => <td>  {String(value)}  </td> )} <td>
                { showFeedback ? <Feedback orderId={parseInt(item[0])} HideFeedbackAgain={HandleSubmitFeedback} deliverydate={item[1]} HideFeedbackAgainByCancelButton={HandleCancelFeedback} /> : <button 
                className="btn btn-ghost" 
                onClick={() => {
                    setFeedback(true);
                    console.log(item);
                }}
                >
                  give feedback
                </button>}
              </td> 
            </tr>)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default FeedbackDT