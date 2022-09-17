import React from "react";
import { useSelector } from "react-redux";
import heads from "../assets/coinFlip/head_coinFlip.png";
import tails from "../assets/coinFlip/tail_coinFlip.png";

const CoinFlipPlay = ({ loading }) => {
  // display data
  //   {
  //     "userChoice": "TAIL",
  //     "status": "LOST",
  //     "serverChoice": "HEAD",
  //     "betting": false
  // }

  const { displayData, startAnimation, series, multiplier } = useSelector(
    (state) => state.coinFlip
  );
  return (
    <div className='w-full h-full flex items-center'>
      <div className='flex justify-around w-full'>
        <div
          id='series'
          className='flex flex-col items-center gap-5 justify-center px-14 rounded-2xl border-4 '
          style={{
            backgroundColor: "#2A2D33",
            borderColor: "#48494F",
            color: "#99A4B0",
          }}
        >
          <p className='font-bold text-6xl'>{series}</p>
          <p className='text-xl font-semibold'>SERIES</p>
        </div>
        <div
          id='coin'
          className='relative w-52 h-52'
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateY(-1deg)",
            animation: `${loading && "flip 0.8s linear"}`,
          }}
        >
          <figure
            style={{
              backgroundImage: `url(${heads})`,
            }}
            className={`w-full h-full bg-cover bg-top absolute left-0 top-0 ${
              displayData === { empty: true }
                ? "result"
                : displayData.serverChoice === "HEAD"
                ? "result"
                : "no-result"
            }`}
          ></figure>
          <figure
            style={{
              backgroundImage: `url(${tails})`,
            }}
            className={`w-full h-full bg-cover bg-top absolute left-0 top-0 ${
              displayData === { empty: true }
                ? "no-result"
                : displayData.serverChoice === "TAIL"
                ? "result"
                : "no-result"
            }`}
          ></figure>
        </div>
        <div
          id='multiplier'
          className='flex flex-col items-center gap-5 justify-center px-7 py-8 rounded-2xl border-4 '
          style={{
            backgroundColor: "#2A2D33",
            borderColor: "#48494F",
            color: "#99A4B0",
          }}
        >
          <p className='font-bold text-5xl'>x{multiplier.toFixed(2)}</p>
          <p className='text-xl font-semibold'>MULTIPLIER</p>
        </div>
      </div>
    </div>
  );
};

export default CoinFlipPlay;
