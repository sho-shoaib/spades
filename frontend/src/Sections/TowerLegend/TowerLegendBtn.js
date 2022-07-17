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

const TowerLegendBtn = ({ rowNo, btnNo, setCurrRow, currRow, cashOutAmt }) => {
  const [res, setRes] = useState("slate");
  const dispatch = useDispatch();

  const { cashoutAt, betting, loading, checkWhat, game, betAmt, multipliers } =
    useSelector((state) => state.towerLegend);

  const checkIf = (clickedOn, row) => {
    let checked = 0;
    if (
      clickedOn ===
      parseInt(
        CryptoJS.AES.decrypt(checkWhat, "shoaib")
          .toString(CryptoJS.enc.Utf8)
          .split(",")[row - 1]
      )
    ) {
      dispatch(changeBetting({ betting: false }));
      setRes("red");
    } else {
      setCurrRow(currRow - 1);
      setRes("green");
      dispatch(changeCashoutAt({ cashoutAt: betAmt * multipliers[row] }));
      if (currRow === 1) {
        dispatch(changeCashoutAt({ cashoutAt: betAmt * multipliers[1] }));
        cashOutAmt();
        dispatch(changeGameEnd({ gameEnd: true }));
        dispatch(
          changelooseText({
            looseText: `Congratulations! You Won ${(
              betAmt * multipliers[1]
            ).toFixed(2)}`,
          })
        );
      }
    }
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
