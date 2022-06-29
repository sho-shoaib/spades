import React from "react";

const DicePlay = ({ underNo, setUnderNo }) => {
  return (
    <div className='slider-wrapper w-9/12'>
      <div className='slider-handles bg-slate-700 p-3 rounded-lg pt-4 relative'>
        <div
          className={`slider-tip bg-slate-900 absolute -top-10 p-2 px-4 rounded-xl -translate-x-6`}
          style={{ left: `${underNo}%` }}
        >
          {underNo}
          <div className='arrow-down absolute translate-y-1.5'></div>
        </div>
        <input
          type='range'
          min='2'
          max='98'
          step='1'
          value={underNo}
          onChange={(e) => setUnderNo(e.target.value)}
          className='w-full'
        />
        <div className='slider-line flex w-full z-10'>
          <div
            className='slider-win h-2 bg-green-400'
            style={{ width: `${underNo}%` }}
          ></div>
          <div
            className='slider-lose h-2 bg-orange-400'
            style={{ width: `${100 - underNo}%` }}
          ></div>
        </div>
      </div>
      <div className='slider-mark flex justify-between w-full translate-x-2.5 mt-3'>
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default DicePlay;
