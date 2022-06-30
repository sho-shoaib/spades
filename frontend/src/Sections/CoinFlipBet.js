import React, { useState } from "react";

const CoinFlipBet = ({
  loading,
  sendMyChoice,
  betting,
  executeBet,
  bet,
  setBet,
  cashoutAt,
  executeCashout,
}) => {
  const [slider, setSlider] = useState(false);

  return (
    <div className='flex flex-col justify-top items-center h-full gap-6 py-10'>
      <div>
        <span className='text-white opacity-80 ml-4'>Amount:</span>
        <div className='relative w-72 mt-0.5 mb-0.5'>
          <input
            disabled={betting}
            type='number'
            className={`bg-slate-800 p-2 rounded-full w-full pl-4 font-semibold disabled:opacity-75`}
            value={bet}
            onChange={(e) => setBet(e.target.value)}
            onBlur={(e) => {
              if (e.target.value === "" || e.target.value < 100) setBet(100);
              if (e.target.value > 200) setBet(200);
            }}
          />
          <div className='flex gap-0.5 child:bg-slate-600 absolute right-0 top-0 bottom-0 child:px-4 py-0.5 pr-0.5 child:font-semibold'>
            <button
              disabled={betting}
              className='rounded-l-full'
              onClick={() => {
                setBet((prevValue) =>
                  prevValue === 200 || prevValue * 2 > 200 ? 200 : prevValue * 2
                );
              }}
            >
              x2
            </button>
            <button
              disabled={betting}
              onClick={() => {
                setBet((prevValue) =>
                  prevValue === 100 || prevValue / 2 < 100 ? 100 : prevValue / 2
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
        <span className='text-white opacity-80 ml-4'>Bet range: 100 - 200</span>
        <div
          className={`flex items-center gap-1.5 ml-4 ${
            slider ? "visible" : "hidden"
          } mt-2`}
        >
          <span>Min</span>
          <input
            disabled={betting}
            type='range'
            style={{ transform: "translateY(1px)" }}
            min={100}
            max={200}
            value={bet}
            onChange={(e) => setBet(e.target.value)}
          />
          <span>Max</span>
        </div>
      </div>
      <div className='flex child:rounded-full child:py-3 child:flex-1 child:bg-orange-500 child:text-lg child:font-semibold w-full px-10 gap-4'>
        <button
          onClick={() => {
            sendMyChoice("HEAD");
          }}
          disabled={!betting || loading}
          className='disabled:opacity-75'
        >
          Heads
        </button>
        <button
          onClick={() => {
            sendMyChoice("TAIL");
          }}
          disabled={!betting || loading}
          className='disabled:opacity-75'
        >
          Tails
        </button>
      </div>
      <div className='flex child:rounded-full child:py-4 child:flex-1 child:bg-orange-500 child:text-lg child:font-semibold w-full px-10 gap-4'>
        {betting ? (
          <button
            onClick={executeCashout}
            disabled={loading}
            className='disabled:opacity-75'
          >
            <p className='text-xl font-semibold'>Cash Out</p>
            <p className='text-xl font-semibold'>{cashoutAt}</p>
          </button>
        ) : (
          <button
            onClick={executeBet}
            disabled={loading}
            className='disabled:opacity-75'
          >
            <p className='text-xl font-semibold'>Bet</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default CoinFlipBet;
