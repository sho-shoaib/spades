import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBetAmt } from "../features/crash/crashSlice";

const CrashBet = ({ sendMyBet, cashOut }) => {
  const dispatch = useDispatch();
  const {
    betAmt,
    gameRunning,
    canBet,
    betting,
    crashed,
    crashAtNo,
    cashedOut,
  } = useSelector((state) => state.crash);
  const [slider, setSlider] = useState(false);
  return (
    <div className='flex flex-col justify-center items-center h-full gap-10 '>
      {gameRunning && betting && !cashedOut ? (
        <button
          className='bg-orange-500 py-2 px-5 rounded-full child:text-base child:font-semibold w-72'
          onClick={() => cashOut(betAmt * crashAtNo, crashAtNo)}
        >
          <p className='-mb-0.5'>Cash out</p>
          <p>{(betAmt * crashAtNo).toFixed(2)}</p>
        </button>
      ) : crashed ? (
        <button className='bg-orange-500 py-2 px-5 rounded-full child:text-base child:font-semibold w-72'>
          <p className='-mb-0.5'>Crashed</p>
          <p>@ {crashAtNo}x</p>
        </button>
      ) : gameRunning ? (
        <button className='bg-orange-500 py-2 px-5 rounded-full child:text-base child:font-semibold w-72'>
          <p className='-mb-0.5'>Bet</p>
          <p>Next Round</p>
        </button>
      ) : canBet && betting ? (
        <button className='bg-orange-500 py-2 px-5 rounded-full child:text-base child:font-semibold w-72'>
          <p className='text-xl py-2.5'>Loading...</p>
        </button>
      ) : (
        <button
          className='bg-orange-500 py-2 px-5 rounded-full child:text-base child:font-semibold w-72'
          onClick={sendMyBet}
        >
          <p className='text-xl py-2.5'>Bet</p>
        </button>
      )}

      <div>
        <span className='text-white opacity-80 ml-4'>Bet range: 1 - 2000</span>
        <div className='relative w-72 mt-0.5 mb-0.5'>
          <input
            disabled={betting}
            type='number'
            className={`bg-slate-800 p-2 rounded-full w-full pl-4 font-semibold disabled:opacity-75`}
            value={betAmt}
            onChange={(e) =>
              dispatch(changeBetAmt({ betAmt: parseFloat(e.target.value) }))
            }
            onBlur={(e) => {
              if (e.target.value === "" || e.target.value < 1)
                dispatch(changeBetAmt({ betAmt: parseFloat(1) }));
              if (e.target.value > 2000)
                dispatch(changeBetAmt({ betAmt: parseFloat(2000) }));
            }}
          />
          <div className='flex gap-0.5 child:bg-slate-600 absolute right-0 top-0 bottom-0 child:px-4 py-0.5 pr-0.5 child:font-semibold'>
            <button
              disabled={betting}
              className='rounded-l-full'
              onClick={() => {
                betAmt === 2000 || betAmt * 2 > 2000
                  ? dispatch(changeBetAmt({ betAmt: parseFloat(2000) }))
                  : dispatch(changeBetAmt({ betAmt: parseFloat(betAmt * 2) }));
              }}
            >
              x2
            </button>
            <button
              disabled={betting}
              onClick={() => {
                betAmt === 1 || betAmt / 2 < 1
                  ? dispatch(changeBetAmt({ betAmt: parseFloat(1) }))
                  : dispatch(changeBetAmt({ betAmt: parseFloat(betAmt / 2) }));
              }}
            >
              /2
            </button>
            <button
              disabled={betting}
              className='rounded-r-full'
              onClick={() => setSlider((prev) => !prev)}
            >
              R
            </button>
          </div>
        </div>
        <div
          className={`flex items-center gap-1.5 ml-4 ${
            slider ? "visible" : "hidden"
          }`}
        >
          <span>Min</span>
          <input
            disabled={betting}
            type='range'
            style={{ transform: "translateY(1px)" }}
            min={1}
            max={2000}
            value={betAmt}
            onChange={(e) =>
              dispatch(changeBetAmt({ betAmt: parseFloat(e.target.value) }))
            }
          />
          <span>Max</span>
        </div>
      </div>
    </div>
  );
};

export default CrashBet;
