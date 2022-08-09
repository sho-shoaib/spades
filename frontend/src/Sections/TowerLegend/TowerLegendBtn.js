import React, { useEffect, useState } from "react";
import { MdNavigation } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBetting,
  changeGameEnd,
  changelooseText,
  changeCashoutAt,
} from "../../features/towerLegend/towerLegendSlice";
var CryptoJS = require("crypto-js");

const TowerLegendBtn = ({
  rowNo,
  btnNo,
  setCurrRow,
  currRow,
  cashOutAmt,
  mode,
}) => {
  const [res, setRes] = useState("slate");
  const dispatch = useDispatch();

  const {
    cashoutAt,
    betting,
    loading,
    checkWhat,
    game,
    betAmt,
    easyMultipliers,
    mediumMultipliers,
    hardMultipliers,
    extremeMultipliers,
    nightmareMultipliers,
  } = useSelector((state) => state.towerLegend);

  const checkIf = (clickedOn, row) => {
    let checked = 0;
    if (checkWhat[row - 1].includes(clickedOn)) {
      setCurrRow(currRow - 1);
      setRes("green");
      if (mode === 0) {
        dispatch(changeCashoutAt({ cashoutAt: betAmt * easyMultipliers[row] }));
      } else if (mode === row) {
        dispatch(
          changeCashoutAt({ cashoutAt: betAmt * mediumMultipliers[row] })
        );
      } else if (mode === 2) {
        dispatch(changeCashoutAt({ cashoutAt: betAmt * hardMultipliers[row] }));
      } else if (mode === 3) {
        dispatch(
          changeCashoutAt({ cashoutAt: betAmt * extremeMultipliers[row] })
        );
      } else if (mode === 4) {
        dispatch(
          changeCashoutAt({
            cashoutAt: betAmt * nightmareMultipliers[row],
          })
        );
      }

      if (currRow === 1) {
        if (mode === 0) {
          dispatch(changeCashoutAt({ cashoutAt: betAmt * easyMultipliers[1] }));
        } else if (mode === 1) {
          dispatch(
            changeCashoutAt({ cashoutAt: betAmt * mediumMultipliers[1] })
          );
        } else if (mode === 2) {
          dispatch(changeCashoutAt({ cashoutAt: betAmt * hardMultipliers[1] }));
        } else if (mode === 3) {
          dispatch(
            changeCashoutAt({ cashoutAt: betAmt * extremeMultipliers[1] })
          );
        } else if (mode === 4) {
          dispatch(
            changeCashoutAt({
              cashoutAt: betAmt * nightmareMultipliers[1],
            })
          );
        }
        cashOutAmt();
        dispatch(changeGameEnd({ gameEnd: true }));
        // dispatch(
        //   changelooseText({
        //     looseText: `Congratulations! You Won ${(
        //       betAmt * multipliers[1]
        //     ).toFixed(2)}`,
        //   })
        // );
      }
    } else {
      dispatch(changeBetting({ betting: false }));
      setRes("red");
    }
    console.log(cashoutAt, clickedOn, checkWhat[row - 1], checkWhat);
  };

  useEffect(() => {
    setRes("slate");
    setCurrRow(9);
  }, [game]);

  return (
    <button
      className={`hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed
      ${res === "slate" && "hover:bg-slate-500"} ${
        res === "slate" && "disabled:hover:bg-slate-600"
      } ${res === "red" && "bg-red-400"} ${res === "green" && "bg-green-400"} ${
        res === "slate" && "bg-slate-600"
      } border-t-2 z-10 border-slate-500`}
      disabled={!betting || loading || rowNo !== currRow}
      onClick={() => checkIf(btnNo, rowNo)}
    >
      <MdNavigation size='25px' color='#ffffff99' />
    </button>
  );
};

export default TowerLegendBtn;
