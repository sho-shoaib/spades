import React, { useEffect, useState } from "react";
import { MdNavigation } from "react-icons/md";
import { socket } from "../../App";
var CryptoJS = require("crypto-js");

const TowerLegendBtn = ({
  betting,
  loading,
  rowNo,
  btnNo,
  checkWhat,
  setBetting,
  setCurrRow,
  currRow,
  game,
  setGameEnd,
  setLooseText,
  bet,
  setCashoutAt,
}) => {
  const [res, setRes] = useState("slate");

  const checkIf = (clickedOn, row) => {
    let checked = 0;
    if (
      clickedOn ===
      parseInt(
        CryptoJS.AES.decrypt(checkWhat, "shoaib")
          .toString(CryptoJS.enc.Utf8)
          .split(",")[row]
      )
    ) {
      setBetting(false);
      setRes("red");
    } else {
      setCurrRow(currRow - 1);
      setRes("green");
      setCashoutAt((prev) => prev * 1.02);
    }
    if (currRow === 1) {
      setBetting(false);
      setGameEnd(true);
      setLooseText("Congratulations! You Won");
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
      }`}
      disabled={!betting || loading || rowNo !== currRow}
      onClick={() => checkIf(btnNo, rowNo)}
    >
      <MdNavigation size='25px' color='#ffffff99' />
    </button>
  );
};

export default TowerLegendBtn;
