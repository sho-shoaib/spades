import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeMultiplier,
  changeUnderNo,
  changeWinAmt,
} from "../../features/dice/diceSlice";
import Slider from "react-input-slider";
import tip from "../../assets/dice/dice_tip.png";
import dice from "../../assets/dice/dice_dice.png";
import winImg from "../../assets/dice/dice_win.png";
import { diceMultipliers } from "../../Components/diceMultipliers";

const DicePlay = () => {
  const dispatch = useDispatch();
  const { win, landsOn, betAmt } = useSelector((state) => state.dice);
  const [state, setState] = useState({ x: 50 });
  const [display, setDisplay] = useState(false);

  return (
    <div className='w-full flex flex-col items-center gap-10'>
      <div className='slider-wrapper w-9/12'>
        <div className='slider-handles bg-zinc-800 p-7 pb-2 rounded-lg pt-7 relative w-full'>
          <div className='dice-display w-full relative -top-56 -ml-11'>
            <div
              style={{
                left: `${landsOn}%`,
                transition: "left 0.4s ease 0s",
              }}
              className='absolute flex flex-col items-center gap-4'
            >
              <div
                className={`border-4 py-3 px-6 rounded-lg bg-slate-900 border-slate-400 text-2xl font-bold ${
                  win ? "text-green-400" : "text-orange-400"
                } -translate-x-5`}
              >
                {landsOn}
              </div>
              <div className='w-32 relative'>
                {win && (
                  <img
                    src={winImg}
                    alt='win'
                    className='absolute -top-5 -left-5'
                    style={{ animation: "spin-win .3s linear infinite" }}
                  />
                )}
                <img
                  src={dice}
                  alt='dice'
                  className='w-16 absolute top-2 translate-x-2'
                />
              </div>
            </div>
          </div>
          <div className='w-full relative'>
            <div
              style={{ backgroundImage: `url(${tip})`, left: `${state.x}%` }}
              className={`absolute w-12 h-12 bg-contain -top-14 bg-no-repeat flex justify-center items-center -ml-6 ${
                display ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className='-mt-2.5'>{state.x}</p>
            </div>
            <div
              className='w-full relative'
              onMouseOver={() => setDisplay(true)}
              onMouseOut={() => setDisplay(false)}
            >
              <Slider
                style={{ width: "100%", zIndex: "100" }}
                axis='x'
                styles={{
                  track: {
                    backgroundColor: "#ED6300",
                    width: "50%",
                  },
                  active: {
                    backgroundColor: "#43B309",
                    width: "50%",
                  },
                  thumb: {
                    width: 27,
                    height: 38,
                    borderRadius: "50px",
                  },
                }}
                xmax={100}
                xmin={0}
                x={state.x}
                onChange={({ x }) => {
                  if (x >= 2 && x <= 98) {
                    setState({ x });
                    dispatch(changeUnderNo({ underNo: x }));
                    dispatch(
                      changeMultiplier({ multiplier: diceMultipliers[x - 2] })
                    );
                    dispatch(
                      changeWinAmt({ winAmt: diceMultipliers[x - 2] * betAmt })
                    );
                  }
                }}
                xstep={1}
              />
              <div
                className='slider-sign w-full absolute'
                style={{
                  top: "9.1px",
                  height: "8.85px",
                }}
              >
                <div
                  className='slider-sign-main h-full w-1.5 bg-white z-10 absolute'
                  style={{
                    left: `${landsOn}%`,
                    zIndex: "200",
                    transition: "left 0.4s ease 0s",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className='slider-mark w-full flex justify-between mt-3 child:font-semibold child:text-neutral-300'>
            <span>0</span>
            <span className='translate-x-1'>25</span>
            <span className='translate-x-2'>50</span>
            <span className='translate-x-3'>75</span>
            <span className='translate-x-3'>100</span>
          </div>
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
