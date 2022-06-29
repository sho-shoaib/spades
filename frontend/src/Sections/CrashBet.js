import React, { useState } from "react";

const CrashBet = ({ sendMyBet, betting, bet, setBet, gameStarting }) => {
  const [slider, setSlider] = useState(false);

  return (
    <div className='flex flex-col justify-center items-center h-full gap-10 '>
      <button
        className='bg-orange-500 py-2 px-5 rounded-full child:text-base child:font-semibold w-72'
        onClick={sendMyBet}
      >
        {/* {betting ? (
          <>
            <p className='-mb-0.5'>Loading...</p>
            <p>(cancel)</p>
          </>
        ) : (
          <>
            <p className='-mb-0.5'>Bet</p>
            <p>Next Round</p>
          </>
        )} */}

        {gameStarting ? (
          <>
            <p className='py-3 text-md'>Bet</p>
          </>
        ) : (
          <>
            <p className='-mb-0.5'>Bet</p>
            <p>Next Round</p>
          </>
        )}
      </button>
      <div>
        <span className='text-white opacity-80 ml-4'>Bet range: 1 - 2000</span>
        <div className='relative w-72 mt-0.5 mb-0.5'>
          <input
            disabled={betting}
            type='number'
            className={`bg-slate-800 p-2 rounded-full w-full pl-4 font-semibold disabled:opacity-75`}
            value={bet}
            onChange={(e) => setBet(e.target.value)}
            onMouseOut={(e) => {
              if (e.target.value === "" || e.target.value < 1) setBet(1);
              if (e.target.value > 2000) setBet(2000);
            }}
          />
          <div className='flex gap-0.5 child:bg-slate-600 absolute right-0 top-0 bottom-0 child:px-4 py-0.5 pr-0.5 child:font-semibold'>
            <button
              disabled={betting}
              className='rounded-l-full'
              onClick={() => {
                setBet((prevValue) =>
                  prevValue === 2000 || prevValue * 2 > 2000
                    ? 2000
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
                  prevValue === 1 || prevValue / 2 < 1 ? 1 : prevValue / 2
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
            value={bet}
            onChange={(e) => setBet(e.target.value)}
          />
          <span>Max</span>
        </div>
      </div>
    </div>
  );
};

export default CrashBet;
