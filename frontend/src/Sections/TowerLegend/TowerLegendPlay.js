import React from "react";
import { MdNavigation } from "react-icons/md";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const TowerLegendPlay = ({ betting, setBetting }) => {
  return (
    <div className='flex flex-col bg-slate-900 p-5 gap-2 rounded'>
      {arr.map((no, i) => {
        return (
          <div className='child:bg-slate-600 child:w-36 child:h-12 child:m-auto child:rounded-md child:cursor-pointer child:active:translate-y-0 child:disabled:opacity-80 child:disabled:hover:translate-y-0 child:disabled:hover:bg-slate-600 child:disabled:cursor-not-allowed flex gap-2 child:flex child:items-center child:justify-center'>
            <button
              className='hover:-translate-y-0.5 hover:bg-slate-500 disabled:opacity-80 disabled:hover:translate-y-0 disabled:hover:bg-slate-600 disabled:cursor-not-allowed'
              disabled={!betting}
            >
              <MdNavigation size='25px' color='#ffffff99' />
            </button>
            <button
              className='hover:-translate-y-0.5 hover:bg-slate-500 disabled:opacity-80 disabled:hover:translate-y-0 disabled:hover:bg-slate-600 disabled:cursor-not-allowed'
              disabled={!betting}
            >
              <MdNavigation size='25px' color='#ffffff99' />
            </button>
            <button
              className='hover:-translate-y-0.5 hover:bg-slate-500 disabled:opacity-80 disabled:hover:translate-y-0 disabled:hover:bg-slate-600 disabled:cursor-not-allowed'
              disabled={!betting}
            >
              <MdNavigation size='25px' color='#ffffff99' />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TowerLegendPlay;
