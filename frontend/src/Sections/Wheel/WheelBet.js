import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBetAmt } from "../../features/wheel/wheelSlice";

const CrashBet = ({ sendMyBet }) => {
  const dispatch = useDispatch();
  const { betAmt, betting } = useSelector((state) => state.wheel);
  const [slider, setSlider] = useState(false);
  return (
    <div className='flex flex-col justify-center items-center gap-10 '>
      <div>
        <span className='text-white opacity-80 ml-4'>Amount:</span>
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
              if (e.target.value === "" || e.target.value < 100)
                dispatch(changeBetAmt({ betAmt: 100 }));
              if (e.target.value > 100000)
                dispatch(changeBetAmt({ betAmt: 100000 }));
            }}
          />
          <div className='flex gap-0.5 child:bg-slate-600 absolute right-0 top-0 bottom-0 child:px-4 py-0.5 pr-0.5 child:font-semibold'>
            <button
              disabled={betting}
              className='rounded-l-full'
              onClick={() => {
                betAmt === 100000 || betAmt * 2 > 100000
                  ? dispatch(changeBetAmt({ betAmt: 100000 }))
                  : dispatch(changeBetAmt({ betAmt: betAmt * 2 }));
              }}
            >
              x2
            </button>
            <button
              disabled={betting}
              onClick={() => {
                betAmt === 100 || betAmt / 2 < 100
                  ? dispatch(changeBetAmt({ betAmt: 100 }))
                  : dispatch(changeBetAmt({ betAmt: betAmt / 2 }));
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
        <span className='text-white opacity-80 ml-4'>
          Bet range: 100 - 100000
        </span>
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
            min={100}
            max={100000}
            value={betAmt}
            onChange={(e) => dispatch(changeBetAmt({ betAmt: e.target.value }))}
          />
          <span>Max</span>
        </div>
      </div>
      <button
        className='bg-orange-500 py-2 px-5 rounded-full child:text-base child:font-semibold w-72'
        onClick={sendMyBet}
      >
        <p className='text-xl py-2.5'>Bet</p>
      </button>
    </div>
  );
};

export default CrashBet;
