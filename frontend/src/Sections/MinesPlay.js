import React from "react";

const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
];

const MinesPlay = ({ betting }) => {
  return (
    <div className='bg-slate-900 grid grid-cols-5 gap-2 p-5 rounded '>
      {arr.map((no, i) => {
        return (
          <button
            className='bg-slate-600 w-24 h-20 m-auto rounded-md cursor-pointer hover:-translate-y-0.5 hover:bg-slate-500 active:translate-y-0 disabled:opacity-80 disabled:hover:translate-y-0 disabled:hover:bg-slate-600 disabled:cursor-not-allowed'
            disabled={!betting}
          ></button>
        );
      })}
    </div>
  );
};

export default MinesPlay;
