import React, { useState } from "react";
import MinesBtn from "./Mines/MinesBtn";

const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
];

const MinesPlay = ({ betting, checkWhat, setBetting, game }) => {
  return (
    <div className='bg-slate-900 grid grid-cols-5 gap-2 p-5 rounded '>
      {arr.map((no, i) => {
        return (
          <MinesBtn
            key={i}
            no={no}
            betting={betting}
            i={i}
            checkWhat={checkWhat}
            setBetting={setBetting}
            game={game}
          />
        );
      })}
    </div>
  );
};

export default MinesPlay;
