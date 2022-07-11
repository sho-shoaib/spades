import React, { useState } from "react";
import { useSelector } from "react-redux";
import MinesBtn from "./Mines/MinesBtn";

const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
];

const MinesPlay = () => {
  return (
    <div
      className='w-full h-full flex justify-center items-center'
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div className='grid grid-cols-5 gap-2 p-5 rounded'>
        {arr.map((no, i) => {
          return <MinesBtn key={i} no={no} i={i} />;
        })}
      </div>
    </div>
  );
};

export default MinesPlay;
