import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBetting,
  changeCashoutAt,
  changeTiles,
  changeTotalProfit,
  changeNextProfit,
} from "../../features/mines/minesSlice";
import diamond from "../../assets/mines/mines_diamond.png";
import bomb from "../../assets/mines/bomb.png";
var CryptoJS = require("crypto-js");

const multipliers = [
  0.0, 1.0, 1.02, 1.08, 1.13, 1.18, 1.24, 1.3, 1.38, 1.46, 1.55, 1.65, 1.77,
  1.9, 2.06, 2.25, 2.48, 2.75, 3.09, 3.54, 4.09, 4.54, 5.09, 5.54, 6.09, 6.54,
  7.09,
];

const MinesBtn = ({ i }) => {
  const [btnSelected, setBtnSelected] = useState(false);
  const [res, setRes] = useState("slate");

  const dispatch = useDispatch();
  const { betting, checkWhat, game, tiles, betAmt } = useSelector(
    (state) => state.mines
  );

  const checkIf = (i) => {
    if (
      i ===
      parseInt(
        CryptoJS.AES.decrypt(checkWhat, "shoaib").toString(CryptoJS.enc.Utf8)
      )
    ) {
      setRes("red");
      dispatch(changeBetting({ betting: false }));
    } else {
      dispatch(changeTiles({ tiles: tiles + 1 }));
      dispatch(
        changeTotalProfit({
          totalProfit: [
            betAmt * multipliers[tiles + 1],
            multipliers[tiles + 1],
          ],
        })
      );
      dispatch(
        changeNextProfit({
          nextProfit: [betAmt * multipliers[tiles + 2], multipliers[tiles + 2]],
        })
      );
      setRes("green");
      dispatch(changeCashoutAt({ cashoutAt: betAmt * multipliers[tiles + 1] }));
    }
    setBtnSelected(true);
  };

  useEffect(() => {
    setRes("slate");
    setBtnSelected(false);
  }, [game]);

  return (
    <button
      className={` w-24 h-20 m-auto rounded-md cursor-pointer hover:-translate-y-0.5   ${
        res === "slate" && "hover:bg-zinc-700"
      } active:translate-y-0 disabled:hover:translate-y-0  ${
        res === "slate" && "disabled:hover:bg-zinc-700"
      } disabled:cursor-default
           ${
             res === "slate" && "bg-zinc-800"
           } bg-contain bg-center bg-no-repeat`}
      style={{
        backgroundImage:
          (res === "red" && `url(${bomb})`) ||
          (res === "green" && `url(${diamond})`),
      }}
      disabled={!betting || btnSelected}
      onClick={() => checkIf(i)}
    ></button>
  );
};

export default MinesBtn;
