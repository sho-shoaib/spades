import React, { useEffect, useState } from "react";
var CryptoJS = require("crypto-js");

const MinesBtn = ({
  betting,
  i,
  checkWhat,
  setBetting,
  game,
  setCashoutAt,
}) => {
  const [btnSelected, setBtnSelected] = useState(false);
  const [res, setRes] = useState("slate");

  const checkIf = (i) => {
    if (
      i ===
      parseInt(
        CryptoJS.AES.decrypt(checkWhat, "shoaib").toString(CryptoJS.enc.Utf8)
      )
    ) {
      setRes("red");
      setBetting(false);
    } else {
      setRes("green");
      setCashoutAt((prev) => prev * 1.02);
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
        res === "slate" && "hover:bg-slate-500"
      } active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0  ${
        res === "slate" && "disabled:hover:bg-slate-600"
      } disabled:cursor-not-allowed
            ${res === "red" && "bg-red-400"} ${
        res === "green" && "bg-green-400"
      } ${res === "slate" && "bg-slate-600"}`}
      disabled={!betting || btnSelected}
      onClick={() => checkIf(i)}
    ></button>
  );
};

export default MinesBtn;
