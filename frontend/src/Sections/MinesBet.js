import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBetAmt } from "../features/mines/minesSlice";

const MinesBet = ({ sendMyBet, cashOutAmt }) => {
  const [slider, setSlider] = useState(false);
  const dispatch = useDispatch();

  const { betting, cashoutAt, betAmt, totalProfit, nextProfit } = useSelector(
    (state) => state.mines
  );

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
                dispatch(changeBetAmt({ betAmt: parseFloat(1) }));
              if (e.target.value > 200)
                dispatch(changeBetAmt({ betAmt: parseFloat(200) }));
            }}
          />
          <div className='flex gap-0.5 child:bg-slate-600 absolute right-0 top-0 bottom-0 child:px-4 py-0.5 pr-0.5 child:font-semibold'>
            <button
              disabled={betting}
              className='rounded-l-full'
              onClick={() => {
                betAmt === 200 || betAmt * 2 > 200
                  ? dispatch(changeBetAmt({ betAmt: parseFloat(200) }))
                  : dispatch(changeBetAmt({ betAmt: parseFloat(betAmt * 2) }));
              }}
            >
              x2
            </button>
            <button
              disabled={betting}
              onClick={() => {
                betAmt === 100 || betAmt / 2 < 100
                  ? dispatch(changeBetAmt({ betAmt: parseFloat(100) }))
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
        <span className='text-white opacity-80 ml-4'>Bet range: 100 - 200</span>
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
            max={200}
            value={betAmt}
            onChange={(e) =>
              dispatch(changeBetAmt({ betAmt: parseFloat(e.target.value) }))
            }
          />
          <span>Max</span>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='w-72 flex flex-col gap-2'>
          <div className='px-3'>
            <span className=' opacity-90 text-base'>Mines:</span>
          </div>
          <div className='py-2 px-4 bg-slate-900 rounded-full'>
            <span>1</span>
          </div>
        </div>
        {betting && (
          <>
            <div className='w-72 flex flex-col gap-2'>
              <div className='px-3'>
                <span className=' opacity-90 text-base'>
                  Profit on Next Tile ({nextProfit[1]}x):
                </span>
              </div>
              <div className='py-2 px-4 bg-slate-900 rounded-full'>
                <span>{nextProfit[0].toFixed(2)}</span>
              </div>
            </div>
            <div className='w-72 flex flex-col gap-2'>
              <div className='px-3'>
                <span className=' opacity-90 text-base'>
                  Total Profit ({totalProfit[1]}x):
                </span>
              </div>
              <div className='py-2 px-4 bg-slate-900 rounded-full'>
                <span>{totalProfit[0].toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
      {betting ? (
        cashoutAt === betAmt ? (
          <button
            disabled={true}
            className=' disabled:opacity-70 cursor-not-allowed bg-orange-500 py-2 px-5 rounded-full text-lg py-4 font-semibold w-72'
          >
            <p className='text-xl font-semibold '>Cash out</p>
          </button>
        ) : (
          <button
            onClick={cashOutAmt}
            className='disabled:opacity-75 bg-orange-500 py-2 px-5 rounded-full text-lg py-4 font-semibold w-72'
          >
            <p className='text-xl font-semibold'>Cash Out</p>
            <p className='text-xl font-semibold'>{cashoutAt.toFixed(2)}</p>
          </button>
        )
      ) : (
        <button
          className='bg-orange-500 py-2 px-5 rounded-full text-lg py-4 font-semibold w-72'
          onClick={sendMyBet}
        >
          <p>Bet</p>
        </button>
      )}
    </div>
  );
};

export default MinesBet;
