import React from "react";
import { useSelector } from "react-redux";

const SlotMachinePlay = () => {
  const { fruitsArr, lost, betting, jackpot, equalTerms } = useSelector(
    (state) => state.slotMachine
  );

  return (
    <>
      <div className='bg-slate-900 p-5 gap-5 rounded-xl flex child:bg-slate-600 child:rounded-xl  child:w-52 child:h-52 child:cursor-auto'>
        <button
          disabled={!betting || lost}
          className='disabled:opacity-60 text-4xl font-semibold'
        >
          {fruitsArr[0]}
        </button>
        <button
          disabled={!betting || lost}
          className='disabled:opacity-60 text-4xl font-semibold'
        >
          {fruitsArr[1]}
        </button>
        <button
          disabled={!betting || lost}
          className='disabled:opacity-60 text-4xl font-semibold'
        >
          {fruitsArr[2]}
        </button>
      </div>
      {jackpot && <p className='text-4xl font-semibold'>JACKPOT!</p>}
      {lost ? (
        <p className='text-2xl font-semibold'>
          You lost, {equalTerms} equal slots
        </p>
      ) : (
        <p className='text-2xl font-semibold'>
          You Won, {equalTerms} equal slots
        </p>
      )}
    </>
  );
};

export default SlotMachinePlay;
