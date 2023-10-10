import React from "react";
import Feedback from "../components/feedback/Feedback";

const page = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {/* <div className="text-violet-600 text-6xl font-extrabold">Welcome to our Family!!</div> */}
      <Feedback />
    </div>
  );
};

export default page;
