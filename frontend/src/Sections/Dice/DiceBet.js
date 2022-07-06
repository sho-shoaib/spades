import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBetAmt } from "../../features/dice/diceSlice";

const DiceBet = ({ bet, setBet, sendMyBet, executeCashout, rollTheDice }) => {
  const dispatch = useDispatch();

  const { betting, cashoutAt, betAmt } = useSelector((state) => state.dice);

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
            value={bet}
            onChange={(e) =>
              dispatch(changeBetAmt({ betAmt: parseFloat(e.target.value) }))
            }
            onMouseOut={(e) => {
              if (e.target.value === "" || e.target.value < 1)
                dispatch(changeBetAmt({ betAmt: 100 }));
              if (e.target.value > 2000)
                dispatch(changeBetAmt({ betAmt: 15402 }));
            }}
          />
          <div className='flex gap-0.5 child:bg-slate-600 absolute right-0 top-0 bottom-0 child:px-4 py-0.5 pr-0.5 child:font-semibold'>
            <button
              disabled={betting}
              className='rounded-l-full'
              onClick={() => {
                setBet((prevValue) =>
                  prevValue === 15402 || prevValue * 2 > 15402
                    ? dispatch(changeBetAmt({ betAmt: 15402 }))
                    : prevValue * 2
                );
              }}
            >
              x2
            </button>
            <button
              disabled={betting}
              onClick={() => {
                setBet((prevValue) =>
                  prevValue === 100 || prevValue / 2 < 100
                    ? dispatch(changeBetAmt({ betAmt: 100 }))
                    : prevValue / 2
                );
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
          Bet range: 100 - 15402
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
            max={15402}
            value={bet}
            onChange={(e) =>
              dispatch(changeBetAmt({ betAmt: parseFloat(e.target.value) }))
            }
          />
          <span>Max</span>
        </div>
      </div>
      <button
        className='bg-orange-500 py-2 px-5 rounded-full text-lg py-4 font-semibold w-72 disabled:opacity-75'
        onClick={rollTheDice}
        disabled={!betting}
      >
        Roll Now
      </button>
      {betting ? (
        <button
          onClick={executeCashout}
          className='bg-orange-500 py-2 px-5 rounded-full py-4 w-72 disabled:opacity-75'
        >
          {cashoutAt === betAmt ? (
            <p className='text-xl font-semibold'>Cancel</p>
          ) : (
            <>
              <p className='text-xl font-semibold'>Cash Out</p>
              <p className='text-xl font-semibold'>{cashoutAt}</p>
            </>
          )}
        </button>
      ) : (
        <button
          onClick={sendMyBet}
          className='bg-orange-500 py-2 px-5 rounded-full py-4 w-72 disabled:opacity-75'
        >
          <p className='text-xl font-semibold'>Bet</p>
        </button>
      )}
    </div>
  );
};

export default DiceBet;
