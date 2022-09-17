import React, { useEffect, useState } from "react";
import { socket } from "../App";
import DiceBet from "../Sections/Dice/DiceBet";
import DicePlay from "../Sections/Dice/DicePlay";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBetting,
  changeCashoutAt,
  changeGame,
  changeLandsOn,
  changeWin,
  changeWinAmt,
  refreshCashoutAt,
} from "../features/dice/diceSlice";
import { rooms } from "../App";

const Dice = ({ setBalance }) => {
  const dispatch = useDispatch();
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.userName;

  const [rolling, setRolling] = useState(false);

  const { betAmt, underNo, cashoutAt, winAmt, game, win } = useSelector(
    (state) => state.dice
  );

  useEffect(() => {
    rooms.map((item) => {
      socket.emit("leave_room", { roomName: item });
    });
    socket.emit("join_room", { roomName: "dice" });
  }, []);

  useEffect(() => {
    if (win === true) {
      dispatch(changeCashoutAt());
      socket.emit("send_reward", {
        userEmail: userEmail,
        betAmt: winAmt - betAmt,
      });
      socket.on("deducted_amt", (data) => {
        setBalance(data.balance);
      });
    } else if (win === false) {
      socket.emit("send_bet", {
        roomName: "dice",
        data: { userEmail, userName, betAmt },
      });
      socket.on("deducted_amt", (data) => {
        setBalance(data.balance);
      });
    }
    setTimeout(() => {
      setRolling(false);
    }, 300);
  }, [game]);

  const rollTheDice = () => {
    setRolling(true);
    socket.emit("get dice data", { from: 0, to: underNo, game: game });
    socket.on("recieve dice data", (data) => {
      dispatch(changeWin({ win: data.win }));
      dispatch(changeLandsOn({ landsOn: data.landsOn }));
      dispatch(changeGame({ game: data.game }));
    });
  };

  return (
    <div className='flex w-full py-10 px-5 gap-1 h-screen'>
      <div
        className='rounded-l-xl'
        style={{ width: "30%", backgroundColor: "#17181B" }}
      >
        <DiceBet rollTheDice={rollTheDice} rolling={rolling} />
      </div>
      <div
        className='rounded-r-xl flex justify-center items-center overflow-x-hidden'
        style={{ width: "70%", backgroundColor: "#17181B" }}
      >
        <DicePlay />
      </div>
    </div>
  );
};

export default Dice;
