import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeUnderNo } from "../../features/dice/diceSlice";

const DicePlay = ({ setUnderNo }) => {
  const dispatch = useDispatch();
  const { underNo, win, landsOn } = useSelector((state) => state.dice);

  return (
    <div className='w-full flex flex-col items-center gap-10'>
      <div className='slider-wrapper w-9/12'>
        <div className='slider-handles bg-slate-700 p-3 rounded-lg pt-4 relative'>
          <div
            className={`slider-tip bg-slate-900 absolute -top-24 p-2 px-4 rounded-xl -translate-x-6`}
            style={{ left: `${landsOn}%` }}
          >
            {landsOn}
            <div className='arrow-down absolute translate-y-1.5'></div>
            {win === null && (
              <p className='absolute w-24 top-1/4 translate-x-12 -translate-y-1.5'>
                Dice lands on
              </p>
            )}
          </div>
          <div
            className={`slider-tip bg-slate-900 absolute -top-10 p-2 px-4 rounded-xl -translate-x-6`}
            style={{ left: `${underNo}%` }}
          >
            {underNo}
            <div className='arrow-down absolute translate-y-1.5'></div>
            {win === null && (
              <p className='absolute w-24 top-1/4 translate-x-12 -translate-y-1.5'>
                Your Choice
              </p>
            )}
          </div>
          <input
            type='range'
            min='2'
            max='98'
            step='1'
            value={underNo}
            onChange={(e) =>
              dispatch(changeUnderNo({ underNo: e.target.value }))
            }
            className='w-full cursor-grab active:cursor-grabbing'
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
            <div
              className='slider-sign w-full h-2 absolute'
              style={{
                left: `${landsOn < 2 ? "2" : landsOn > 98 ? "98" : landsOn}%`,
              }}
            >
              <div className='sign w-1 h-full bg-white'></div>
            </div>
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
      <div>
        <p className='text-4xl font-semibold'>
          {win === null ? "Roll Dice" : win ? "WON" : "LOST"}
        </p>
      </div>
    </div>
  );
};

export default DicePlay;
