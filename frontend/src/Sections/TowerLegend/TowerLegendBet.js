import React, { useState } from "react";
import { CgClose, CgCheck } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBetAmt,
  changeMode,
  changeCols,
} from "../../features/towerLegend/towerLegendSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MdOutlineDesignServices } from "react-icons/md";

const TowerLegendBet = ({ sendMyBet, cashOutAmt }) => {
  const [slider, setSlider] = useState(false);
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);

  const { betting, betAmt, cashoutAt, mode } = useSelector(
    (state) => state.towerLegend
  );

  const handleMode = (type) => {
    setDropdown(false);
    if (type === "easy") {
      dispatch(changeMode({ mode: 0 }));
      dispatch(changeCols({ cols: 4 }));
    } else if (type === "medium") {
      dispatch(changeMode({ mode: 1 }));
      dispatch(changeCols({ cols: 3 }));
    } else if (type === "hard") {
      dispatch(changeMode({ mode: 2 }));
      dispatch(changeCols({ cols: 2 }));
    } else if (type === "extreme") {
      dispatch(changeMode({ mode: 3 }));
      dispatch(changeCols({ cols: 3 }));
    } else if (type === "nightmare") {
      dispatch(changeMode({ mode: 4 }));
      dispatch(changeCols({ cols: 4 }));
    }
  };

  return (
    <div className='flex flex-col justify-top items-center h-full gap-8 py-10'>
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
              if (e.target.value === "" || e.target.value < 1)
                dispatch(changeBetAmt({ betAmt: parseFloat(1) }));
              if (e.target.value > 200)
                dispatch(changeBetAmt({ betAmt: parseFloat(200) }));
            }}
          />
          <div className='flex gap-0.5 child:bg-slate-600 absolute right-0 top-0 bottom-0 child:px-4 py-0.5 pr-0.5 child:font-semibold'>
            <button
              disabled={betting}
              className='rounded-l-full'
              onClick={() => {
                betAmt === 200 || betAmt * 2 > 200
                  ? dispatch(changeBetAmt({ betAmt: parseFloat(200) }))
                  : dispatch(changeBetAmt({ betAmt: parseFloat(betAmt * 2) }));
              }}
            >
              x2
            </button>
            <button
              disabled={betting}
              onClick={() => {
                betAmt === 100 || betAmt / 2 < 100
                  ? dispatch(changeBetAmt({ betAmt: parseFloat(100) }))
                  : dispatch(changeBetAmt({ betAmt: parseFloat(betAmt / 2) }));
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
          }`}
        >
          <span>Min</span>
          <input
            disabled={betting}
            type='range'
            style={{ transform: "translateY(1px)" }}
            min={100}
            max={200}
            value={betAmt}
            onChange={(e) =>
              dispatch(changeBetAmt({ betAmt: parseFloat(e.target.value) }))
            }
          />
          <span>Max</span>
        </div>
      </div>
      <div className='flex gap-2'>
        <span className='font-semibold opacity-80 text-lg'>Type:</span>
        <div>
          <div
            id='selected-type'
            className='flex overflow-hidden rounded-lg p-2 pb-1 -translate-y-1.5 items-start transition-all duration-300 bg-stone-800 gap-x-2'
          >
            {mode === 0 ? (
              // Easy
              <div
                className='flex gap-2 hover:bg-stone-700 active:opacity-80 cursor-pointer rounded-lg transition-all'
                onClick={() => setDropdown(!dropdown)}
              >
                <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                  <CgClose color='red' size='14px' />
                </div>
                <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                  <CgCheck color='#4ade80' size='20px' />
                </div>
                <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                  <CgCheck color='#4ade80' size='20px' />
                </div>
                <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                  <CgCheck color='#4ade80' size='20px' />
                </div>
              </div>
            ) : mode === 1 ? (
              <div
                className='flex justify-between hover:bg-stone-700 active:opacity-80 rounded-sm items-center gap-x-2 cursor-pointer'
                onClick={() => setDropdown(!dropdown)}
              >
                <div className='flex gap-2 rounded-lg transition-all'>
                  <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                    <CgClose color='red' size='14px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                    <CgCheck color='#4ade80' size='20px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                    <CgCheck color='#4ade80' size='20px' />
                  </div>
                </div>
              </div>
            ) : mode === 2 ? (
              <div
                className='flex justify-between hover:bg-stone-700 active:opacity-80 rounded-sm items-center gap-x-2 cursor-pointer'
                onClick={() => setDropdown(!dropdown)}
              >
                <div className='flex gap-2 rounded-lg transition-all'>
                  <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                    <CgClose color='red' size='14px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                    <CgCheck color='#4ade80' size='20px' />
                  </div>
                </div>
              </div>
            ) : mode === 3 ? (
              <div
                className='flex justify-between hover:bg-stone-700 active:opacity-80 rounded-sm items-center gap-x-2 cursor-pointer'
                onClick={() => setDropdown(!dropdown)}
              >
                <div className='flex gap-2 rounded-lg transition-all'>
                  <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                    <CgClose color='red' size='14px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                    <CgClose color='red' size='14px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                    <CgCheck color='#4ade80' size='20px' />
                  </div>
                </div>
              </div>
            ) : (
              mode === 4 && (
                <div
                  className='flex justify-between hover:bg-stone-700 active:opacity-80 rounded-sm items-center gap-x-2 cursor-pointer'
                  onClick={() => setDropdown(!dropdown)}
                >
                  <div className='flex gap-2 rounded-lg transition-all'>
                    <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                      <CgClose color='red' size='14px' />
                    </div>
                    <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                      <CgClose color='red' size='14px' />
                    </div>
                    <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                      <CgClose color='red' size='14px' />
                    </div>
                    <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                      <CgCheck color='#4ade80' size='20px' />
                    </div>
                  </div>
                </div>
              )
            )}

            <span
              className='p-1 cursor-pointer hover:bg-stone-700 active:opacity-80 cursor-pointer rounded-lg transition-all'
              onClick={() => setDropdown(!dropdown)}
            >
              <KeyboardArrowDownIcon />
            </span>
          </div>
          <div
            className='flex flex-col overflow-hidden rounded-lg -translate-y-1.5 items-start transition-all duration-300 bg-stone-800 absolute mt-1'
            style={{
              height: `${dropdown ? "236px" : "0px"}`,
              padding: `${dropdown ? "0.25rem" : "0px"}`,
            }}
          >
            <div className='mb-0.5 p-1'>
              <span>Select Type:</span>
            </div>
            <div className='flex flex-col child:p-1'>
              {/* 1 */}
              <div
                className='flex justify-between hover:bg-stone-700 active:opacity-80 rounded-sm items-center gap-x-2 cursor-pointer'
                onClick={() => handleMode("easy")}
              >
                <div className='flex gap-2 rounded-lg transition-all'>
                  <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                    <CgClose color='red' size='14px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                    <CgCheck color='#4ade80' size='20px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                    <CgCheck color='#4ade80' size='20px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                    <CgCheck color='#4ade80' size='20px' />
                  </div>
                </div>
                <div className='w-full ml-0.5 flex justify-end'>
                  <span className=''>EASY</span>
                </div>
              </div>

              {/* 2 */}
              <div
                className='flex justify-between hover:bg-stone-700 active:opacity-80 rounded-sm items-center gap-x-2 cursor-pointer'
                onClick={() => handleMode("medium")}
              >
                <div className='flex gap-2 rounded-lg transition-all'>
                  <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                    <CgClose color='red' size='14px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                    <CgCheck color='#4ade80' size='20px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                    <CgCheck color='#4ade80' size='20px' />
                  </div>
                </div>
                <div className='w-full ml-0.5 flex justify-end'>
                  <span className=''>MEDIUM</span>
                </div>
              </div>

              {/* 3 */}
              <div
                className='flex justify-between hover:bg-stone-700 active:opacity-80 rounded-sm items-center gap-x-2 cursor-pointer'
                onClick={() => handleMode("hard")}
              >
                <div className='flex gap-2 rounded-lg transition-all'>
                  <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                    <CgClose color='red' size='14px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                    <CgCheck color='#4ade80' size='20px' />
                  </div>
                </div>
                <div className='w-full ml-0.5 flex justify-end'>
                  <span className=''>HARD</span>
                </div>
              </div>

              {/* 4 */}
              <div
                className='flex justify-between hover:bg-stone-700 active:opacity-80 rounded-sm items-center gap-x-2 cursor-pointer'
                onClick={() => handleMode("extreme")}
              >
                <div className='flex gap-2 rounded-lg transition-all'>
                  <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                    <CgClose color='red' size='14px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                    <CgClose color='red' size='14px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                    <CgCheck color='#4ade80' size='20px' />
                  </div>
                </div>
                <div className='w-full ml-0.5 flex justify-end'>
                  <span className=''>EXTREME</span>
                </div>
              </div>

              {/* 5 */}
              <div
                className='flex justify-between hover:bg-stone-700 active:opacity-80 rounded-sm items-center gap-x-2 cursor-pointer'
                onClick={() => handleMode("nightmare")}
              >
                <div className='flex gap-2 rounded-lg transition-all'>
                  <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                    <CgClose color='red' size='14px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                    <CgClose color='red' size='14px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
                    <CgClose color='red' size='14px' />
                  </div>
                  <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
                    <CgCheck color='#4ade80' size='20px' />
                  </div>
                </div>
                <div className='w-full ml-0.5 flex justify-end'>
                  <span className=''>NIGHTMARE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {betting ? (
        cashoutAt === betAmt ? (
          <button
            disabled={true}
            className=' disabled:opacity-70 cursor-not-allowed bg-orange-500 py-2 px-5 rounded-full text-lg py-4 font-semibold w-72'
          >
            <p className='text-xl font-semibold '>Cash out</p>
          </button>
        ) : (
          <button
            onClick={cashOutAmt}
            className='disabled:opacity-75 bg-orange-500 py-2 px-5 rounded-full text-lg py-4 font-semibold w-72'
          >
            <p className='text-xl font-semibold'>Cash Out</p>
            <p className='text-xl font-semibold'>{cashoutAt.toFixed(2)}</p>
          </button>
        )
      ) : (
        <button
          className='bg-orange-500 py-2 px-5 rounded-full text-lg py-4 font-semibold w-72'
          onClick={sendMyBet}
        >
          <p>Bet</p>
        </button>
      )}
    </div>
  );
};

export default TowerLegendBet;
