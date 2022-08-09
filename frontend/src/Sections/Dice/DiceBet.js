import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBetAmt, changeWinAmt } from "../../features/dice/diceSlice";

const DiceBet = ({ rollTheDice, rolling }) => {
  const dispatch = useDispatch();

  const { betting, cashoutAt, betAmt, multiplier, winAmt } = useSelector(
    (state) => state.dice
  );

  const [slider, setSlider] = useState(false);
  return (
    <div className='flex flex-col justify-top items-center h-full gap-8 py-10'>
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
              if (e.target.value === "" || e.target.value < 1)
                dispatch(changeBetAmt({ betAmt: parseFloat(100) }));
              dispatch(
                changeWinAmt({
                  winAmt: parseFloat(e.target.value) * multiplier,
                })
              );
              if (e.target.value > 14664.603612)
                dispatch(changeBetAmt({ betAmt: parseFloat(14664.603612) }));
            }}
          />
          <div className='flex gap-0.5 child:bg-slate-600 absolute right-0 top-0 bottom-0 child:px-4 py-0.5 pr-0.5 child:font-semibold'>
            <button
              disabled={betting}
              className='rounded-l-full'
              onClick={() => {
                if (betAmt === 14664.603612 || betAmt * 2 > 14664.603612) {
                  dispatch(changeBetAmt({ betAmt: parseFloat(14664.603612) }));
                  dispatch(
                    changeWinAmt({
                      winAmt: parseFloat(14664.603612) * multiplier,
                    })
                  );
                } else {
                  dispatch(changeBetAmt({ betAmt: parseFloat(betAmt * 2) }));
                  dispatch(
                    changeWinAmt({
                      winAmt: parseFloat(betAmt * 2) * multiplier,
                    })
                  );
                }
              }}
            >
              x2
            </button>
            <button
              disabled={betting}
              onClick={() => {
                if (betAmt === 100 || betAmt / 2 < 100) {
                  dispatch(changeBetAmt({ betAmt: 100 }));
                  dispatch(
                    changeWinAmt({
                      winAmt: parseFloat(100) * multiplier,
                    })
                  );
                } else {
                  dispatch(changeBetAmt({ betAmt: betAmt / 2 }));
                  dispatch(
                    changeWinAmt({
                      winAmt: parseFloat(betAmt / 2) * multiplier,
                    })
                  );
                }
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
          Bet range: 100 - 14664.7
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
            max={14664.603612}
            value={betAmt}
            onChange={(e) => {
              dispatch(changeBetAmt({ betAmt: parseFloat(e.target.value) }));
              dispatch(
                changeWinAmt({
                  winAmt: parseFloat(e.target.value) * multiplier,
                })
              );
            }}
          />
          <span>Max</span>
        </div>
      </div>
      <button
        onClick={rollTheDice}
        disabled={rolling}
        className='bg-orange-500 py-2 px-5 rounded-full py-4 w-72 disabled:opacity-75'
      >
        <p className='text-xl font-semibold'>Roll Now</p>
      </button>
      <div className='w-72 flex flex-col gap-2'>
        <div className='px-3'>
          <span className=' opacity-90 text-base'>Win amount:</span>
        </div>
        <div className='py-2 px-4 bg-slate-900 rounded-full'>
          <span>{winAmt.toFixed(2)}</span>
        </div>
      </div>
      <div className='w-72 flex flex-col gap-2'>
        <div className='px-3'>
          <span className=' opacity-90 text-base'>Payout:</span>
        </div>
        <div className='py-2 px-4 bg-slate-900 rounded-full'>
          <span>{multiplier.toFixed(4)}x</span>
        </div>
      </div>
    </div>
  );
};

export default DiceBet;
