"use client";

import { SetStateAction, useRef, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { GrCheckmark } from "react-icons/gr";

const Feedback = ({ orderId , HideFeedbackAgain, HideFeedbackAgainByCancelButton } : { orderId : number , HideFeedbackAgain : () => void, HideFeedbackAgainByCancelButton : () => void}) => {
  const feedbackref = useRef<HTMLTextAreaElement>(null);
  const [showloading, setLoading] = useState(false);
  const [feedbacksent, setFeedBack] = useState(false);
  const mystyle = {
    width: "inherit",
  };

  const handleClick = async (feedback: string , orderId : number) => {
    try {
      setFeedBack(false);
      setLoading(true);
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback: feedback , orderId : orderId }),
      });
      setLoading(false);
      // const result = await response.json()

      response.status === 200 && setFeedBack(true);

      response.status === 200 && console.log(response);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-start bg-black rounded p-3 justify-between gap-7 absolute -bottom-full left-14 w-3/4">
        <div className="flex flex-col">
          <p className=" block text-sm text-slate-400">Please provide a feedback</p>
          <p className="block text-slate-400 text-xs">
            for the <i className="text-violet-500" >product quality</i>
          </p>
        </div>
        <div className="w-full">
          <textarea
            ref={feedbackref}
            id="feedback"
            placeholder="start typing something..."
            className="p-2 text-xs focus:ring-inset text-white placeholder:text-slate-600"
            style={mystyle}
          />
        </div>
        <div className="flex justify-end items-center -mt-3 w-full gap-2">
          <button 
          className="flex gap-1 items-center bg-red-300 text-red-700 p-1 px-2 rounded hover:bg-transparent hover:border-2 hover:border-red-700 transition-all text-sm font-medium"
          onClick={async (event) => {
            event.preventDefault();
            HideFeedbackAgainByCancelButton()        // after submitting the feedback this function again hides the feedback form, this function comes as a prop from profile page and is also implemented there.
          }}
          >
            { showloading && <span className='animate-spin' ><AiOutlineReload/></span>}{"  "}
            {feedbacksent && <span><GrCheckmark/></span> }{"  "}
            Cancel
          </button>
          <button 
          className="flex gap-1 items-center bg-green-300 text-green-700 p-1 px-2 rounded hover:bg-transparent hover:border-2 hover:border-green-700 transition-all text-sm font-medium"
          type="submit"
          onClick={async (event) => {
            event.preventDefault();
            let feedback = feedbackref.current?.value!
            await handleClick(feedback , orderId);
            HideFeedbackAgain()        // after submitting the feedback this function again hides the feedback form, this function comes as a prop from profile page and is also implemented there.
          }}
          >
            { showloading && <span className='animate-spin' ><AiOutlineReload/></span>}{"  "}
            {feedbacksent && <span><GrCheckmark/></span> }{"  "}
            submit feedback
          </button>
        </div>
      </div>
    </>
  );
};

export default Feedback;
