import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TowerLegendBtn from "./TowerLegendBtn";

const easyarr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const mediumarr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const hardarr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const extremearr = [1, 2, 3, 4, 5, 6];
const nightmarearr = [1, 2, 3, 4, 5, 6];
var easy = [1, 2, 3, 4];
var medium = [1, 2, 3];
var hard = [1, 2];
var extreme = [1, 2, 3];
var nightmare = [1, 2, 3, 4];

const TowerLegendPlay = ({ cashOutAmt }) => {
  const [currRow, setCurrRow] = useState(9);

  const {
    gameEnd,
    looseText,
    easyMultipliers,
    mediumMultipliers,
    hardMultipliers,
    extremeMultipliers,
    nightmareMultipliers,
    betAmt,
    cols,
    mode,
  } = useSelector((state) => state.towerLegend);

  return (
    <div
      className='flex flex-col bg-slate-900 p-5 gap-2 rounded relative'
      style={{ height: "85%" }}
    >
      {(mode === 0
        ? // Easy
          easyarr
        : mode === 1
        ? // Medium
          mediumarr
        : mode === 2
        ? // Hard
          hardarr
        : mode === 3
        ? // Extreme
          extremearr
        : mode === 4 &&
          // Nightmare
          nightmarearr
      ).map((no, i) => {
        return (
          <div className='w-full relative rounded-md h-full'>
            <div className='bg-slate-900 border-t-2 z-10 border-slate-400 absolute w-1/3 left-1/3 -top-6 rounded-t-3xl text-center text-sm py-0.5'>
              {mode === 0
                ? // Easy
                  (betAmt * easyMultipliers[no]).toFixed(2)
                : mode === 1
                ? // Medium
                  (betAmt * mediumMultipliers[no]).toFixed(2)
                : mode === 2
                ? // Hard
                  (betAmt * hardMultipliers[no]).toFixed(2)
                : mode === 3
                ? // Extreme
                  (betAmt * extremeMultipliers[no]).toFixed(2)
                : mode === 4 &&
                  // Nightmare
                  (betAmt * nightmareMultipliers[no]).toFixed(2)}
            </div>
            <div
              key={i}
              className='w-96 child:w-full h-full child:h-full child:m-auto child:rounded-md child:cursor-pointer child:active:translate-y-0 child:disabled:opacity-80 child:disabled:hover:translate-y-0 child:disabled:hover:bg-slate-600 child:disabled:cursor-not-allowed flex gap-2 child:flex child:items-center child:justify-center'
            >
              {mode === 0
                ? // Easy
                  easy.map((btnNo, i) => {
                    return (
                      <TowerLegendBtn
                        key={i}
                        rowNo={no}
                        btnNo={btnNo}
                        currRow={currRow}
                        setCurrRow={setCurrRow}
                        cashOutAmt={cashOutAmt}
                        mode={0}
                      />
                    );
                  })
                : mode === 1
                ? // Medium
                  medium.map((btnNo, i) => {
                    return (
                      <TowerLegendBtn
                        key={i}
                        rowNo={no}
                        btnNo={btnNo}
                        currRow={currRow}
                        setCurrRow={setCurrRow}
                        cashOutAmt={cashOutAmt}
                        mode={1}
                      />
                    );
                  })
                : mode === 2
                ? // Hard
                  hard.map((btnNo, i) => {
                    return (
                      <TowerLegendBtn
                        key={i}
                        rowNo={no}
                        btnNo={btnNo}
                        currRow={currRow}
                        setCurrRow={setCurrRow}
                        cashOutAmt={cashOutAmt}
                        mode={2}
                      />
                    );
                  })
                : mode === 3
                ? // Extreme
                  extreme.map((btnNo, i) => {
                    return (
                      <TowerLegendBtn
                        key={i}
                        rowNo={no}
                        btnNo={btnNo}
                        currRow={currRow}
                        setCurrRow={setCurrRow}
                        cashOutAmt={cashOutAmt}
                        mode={3}
                      />
                    );
                  })
                : mode === 4 &&
                  // Nightmare
                  nightmare.map((btnNo, i) => {
                    return (
                      <TowerLegendBtn
                        key={i}
                        rowNo={no}
                        btnNo={btnNo}
                        currRow={currRow}
                        setCurrRow={setCurrRow}
                        cashOutAmt={cashOutAmt}
                        mode={4}
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
