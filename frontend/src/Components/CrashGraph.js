import React from "react";
import { useSelector } from "react-redux";

const CrashGraph = () => {
  const { crashAtText, gameEnd } = useSelector((state) => state.crash);

  return (
    <div
      id='graph'
      className='relative w-full h-full flex justify-center items-center'
    >
      <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between py-10 child:opacity-40 px-4'>
        <div className='w-full bg-white' style={{ height: "1px" }}></div>
        <div className='w-full bg-white' style={{ height: "0.5px" }}></div>
        <div className='w-full bg-white' style={{ height: "1px" }}></div>
        <div className='w-full bg-white' style={{ height: "0.5px" }}></div>
        <div className='w-full bg-white' style={{ height: "0.5px" }}></div>
      </div>
      <p className={`text-4xl ${gameEnd && "text-red-500"}`}>{crashAtText}</p>
    </div>
  );
};

export default CrashGraph;
