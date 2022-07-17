import React, { useState } from "react";
import { useSelector } from "react-redux";
import TowerLegendBtn from "./TowerLegendBtn";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrBtn = [1, 2, 3, 4];

const TowerLegendPlay = ({ cashOutAmt }) => {
  const [currRow, setCurrRow] = useState(9);

  const { gameEnd, looseText, multipliers, betAmt } = useSelector(
    (state) => state.towerLegend
  );

  return (
    <div className='flex flex-col bg-slate-900 p-5 gap-2 rounded relative'>
      {arr.map((no, i) => {
        return (
          <div className='w-full relative rounded-md'>
            <div className='bg-slate-900 border-t-2 z-10 border-slate-400 absolute w-1/3 left-1/3 -top-6 rounded-t-3xl text-center text-sm py-0.5'>
              {(betAmt * multipliers[no]).toFixed(2)}
            </div>
            <div
              key={i}
              className='w-full child:w-24 child:h-12 child:m-auto child:rounded-md child:cursor-pointer child:active:translate-y-0 child:disabled:opacity-80 child:disabled:hover:translate-y-0 child:disabled:hover:bg-slate-600 child:disabled:cursor-not-allowed flex gap-2 child:flex child:items-center child:justify-center'
            >
              {arrBtn.map((btnNo, i) => {
                return (
                  <TowerLegendBtn
                    key={i}
                    rowNo={no}
                    btnNo={btnNo}
                    currRow={currRow}
                    setCurrRow={setCurrRow}
                    cashOutAmt={cashOutAmt}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      {gameEnd && (
        <div className='flex justify-center items-center p-5 rounded-lg absolute top-0 bottom-0 left-0 right-0 w-60 bg-slate-600 h-24 m-auto z-20'>
          <p className='text-center'>{looseText}</p>
        </div>
      )}
    </div>
  );
};

export default TowerLegendPlay;
