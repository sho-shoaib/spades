import React, { useEffect, useState } from "react";
import { socket } from "../App";
import DiceBet from "../Sections/Dice/DiceBet";
import DicePlay from "../Sections/Dice/DicePlay";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBetting,
  changeCashoutAt,
  changeLandsOn,
  changeWin,
  initializeCashoutAt,
  refreshCashoutAt,
} from "../features/dice/diceSlice";

const Dice = ({ setBalance }) => {
  const dispatch = useDispatch();
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.userName;

  const { betAmt, betting, underNo, win, cashoutAt } = useSelector(
    (state) => state.dice
  );

  useEffect(() => {
    socket.emit("join_room", { roomName: "dice" });
  }, []);

  useEffect(() => {
    socket.on("recieve dice data", (data) => {
      dispatch(changeWin({ win: data.win }));
      dispatch(changeLandsOn({ landsOn: data.landsOn }));
      if (data.win === true) {
        dispatch(changeCashoutAt());
      } else if (data.win === false) {
        dispatch(changeBetting({ betting: false }));
        dispatch(refreshCashoutAt());
      }
    });
  }, [socket]);

  const sendMyBet = () => {
    dispatch(changeBetting({ betting: true }));
    dispatch(initializeCashoutAt());
    socket.emit("send_bet", {
      roomName: "dice",
      data: { userEmail, userName, betAmt },
    });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
    });
  };

  const rollTheDice = () => {
    socket.emit("get dice data", { from: 0, to: underNo });
  };

  const executeCashout = () => {
    socket.emit("send_reward", { userEmail, betAmt: parseFloat(cashoutAt) });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
    });
    dispatch(changeBetting({ betting: false }));
    dispatch(refreshCashoutAt());
  };

  return (
    <div className='flex w-full py-10 px-5 gap-1 h-screen'>
      <div className='bg-slate-700 rounded-l-xl' style={{ width: "30%" }}>
        <DiceBet
          sendMyBet={sendMyBet}
          rollTheDice={rollTheDice}
          executeCashout={executeCashout}
        />
      </div>
      <div
        className='bg-slate-600 rounded-r-xl flex justify-center items-center overflow-x-hidden'
        style={{ width: "70%" }}
      >
        <DicePlay />
      </div>
    </div>
  );
};

export default Dice;
