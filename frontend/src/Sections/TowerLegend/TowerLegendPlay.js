import React, { useState } from "react";
import TowerLegendBtn from "./TowerLegendBtn";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrBtn = [1, 2, 3, 4];

const TowerLegendPlay = ({ betting, setBetting, checkWhat, loading, game }) => {
  const [currRow, setCurrRow] = useState(9);

  return (
    <div className='flex flex-col bg-slate-900 p-5 gap-2 rounded'>
      {arr.map((no, i) => {
        return (
          <div
            key={i}
            className='child:w-24 child:h-12 child:m-auto child:rounded-md child:cursor-pointer child:active:translate-y-0 child:disabled:opacity-80 child:disabled:hover:translate-y-0 child:disabled:hover:bg-slate-600 child:disabled:cursor-not-allowed flex gap-2 child:flex child:items-center child:justify-center'
          >
            {arrBtn.map((btnNo, i) => {
              return (
                <TowerLegendBtn
                  key={i}
                  betting={betting}
                  loading={loading}
                  rowNo={no}
                  btnNo={btnNo}
                  setBetting={setBetting}
                  checkWhat={checkWhat}
                  currRow={currRow}
                  setCurrRow={setCurrRow}
                  game={game}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TowerLegendPlay;
