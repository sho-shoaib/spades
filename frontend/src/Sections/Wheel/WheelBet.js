import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBetAmt } from "../../features/wheel/wheelSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const segmentOpt = [10, 20, 30, 40, 50];

const WheelBet = ({ sendMyBet, setSegments, segments, setPinLandsOn }) => {
  const dispatch = useDispatch();
  const { betAmt, betting } = useSelector((state) => state.wheel);
  const [slider, setSlider] = useState(false);

  return (
    <div className='flex flex-col justify-center items-center gap-10 px-10'>
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
              if (e.target.value === "" || e.target.value < 100)
                dispatch(changeBetAmt({ betAmt: 100 }));
              if (e.target.value > 120) dispatch(changeBetAmt({ betAmt: 120 }));
            }}
          />
          <div className='flex gap-0.5 child:bg-slate-600 absolute right-0 top-0 bottom-0 child:px-4 py-0.5 pr-0.5 child:font-semibold'>
            <button
              disabled={betting}
              className='rounded-l-full'
              id='start-bet'
              onClick={() => {
                betAmt === 120 || betAmt * 2 > 120
                  ? dispatch(changeBetAmt({ betAmt: 120 }))
                  : dispatch(changeBetAmt({ betAmt: betAmt * 2 }));
              }}
            >
              x2
            </button>
            <button
              disabled={betting}
              onClick={() => {
                betAmt === 100 || betAmt / 2 < 100
                  ? dispatch(changeBetAmt({ betAmt: 100 }))
                  : dispatch(changeBetAmt({ betAmt: betAmt / 2 }));
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
        <span className='text-white opacity-80 ml-4'>Bet range: 100 - 120</span>
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
            max={120}
            value={betAmt}
            onChange={(e) => dispatch(changeBetAmt({ betAmt: e.target.value }))}
          />
          <span>Max</span>
        </div>
      </div>
      {/* <div
        style={{ backgroundColor: "#222328" }}
        className='py-3 px-4 rounded-full w-full'
      >
        <div
          className='w-full flex justify-between relative cursor-pointer'
          onClick={() => setSelect((prev) => !prev)}
        >
          <p for='segments'>Segments:</p>
          <div className='flex items-center gap-1 transition-all'>
            <p>10</p>
            <div
              className={`${
                select ? "-rotate-180" : "rotate-0"
              } transition-all`}
            >
              <KeyboardArrowDownIcon />
            </div>
          </div>
          {select && (
            <Select
              id='segments'
              style={{
                backgroundColor: "#17181B",
                animationName: `${select ? "dropdown" : "dropup"}`,
                animationDuration: "400ms",
              }}
              className={`absolute top-0 w-full translate-y-10 rounded-lg flex flex-col gap-1 p-1 child:w-full child:rounded-full child:cursor-pointer `}
            >
              {segments.map((item) => {
                return (
                  <MenuItem
                    key={item}
                    value={item}
                    className='hover:bg-neutral-800 px-2.5 py-1'
                    onClick={() => {
                      setSelect(false);
                    }}
                  >
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        </div>
      </div> */}
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id='demo-dialog-select-label' style={{ color: "white" }}>
          Segments
        </InputLabel>
        <Select
          id='segments'
          className='w-full border-white'
          label='Segments'
          sx={{ color: "white" }}
          value={segments}
          style={{ borderColor: "white" }}
          icon='white'
          onChange={(e) => {
            setSegments(e.target.value);
            setPinLandsOn(0);
          }}
        >
          {segmentOpt.map((item) => {
            return (
              <MenuItem
                key={item}
                value={item}
                className='hover:bg-neutral-800 px-2.5 py-1'
              >
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <button
        className='bg-orange-500 py-2 px-5 rounded-full child:text-base child:font-semibold w-72 disabled:opacity-70 disabled:cursor-not-allowed'
        onClick={sendMyBet}
        disabled={betting}
      >
        <p className='text-xl py-2.5'>{betting ? "Rolling..." : "Bet"}</p>
      </button>
    </div>
  );
};

export default WheelBet;
