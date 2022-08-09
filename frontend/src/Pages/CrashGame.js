import React, { useEffect, useState } from "react";
import { socket } from "../App";
import CrashGraph from "../Components/CrashGraph";
import CrashBet from "../Sections/CrashBet";
import CrashBetsDisplay from "../Sections/CrashBetsDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBetting,
  changeCanBet,
  changeCrashAtText,
  changeCrashed,
  changeGameRunning,
  updateBetsArr,
  changeCrashAtNo,
  changeCashedOut,
  changeGameEnd,
} from "../features/crash/crashSlice";
import { rooms } from "../App";

const CrashGame = ({ setBalance }) => {
  const { betAmt, canBet, betting, gameEnd } = useSelector(
    (state) => state.crash
  );
  const dispatch = useDispatch();
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.username;
  const [addedToQue, setAddedToQue] = useState(false);
  const [bettingNextRound, setBettingNextRound] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);

  useEffect(() => {
    rooms.map((item) => {
      socket.emit("leave_room", { roomName: item });
    });
    socket.emit("join_room", { roomName: "crash" });
  }, []);

  useEffect(() => {
    if (canBet === true && bettingNextRound === true) {
      sendMyBet();
    }
  }, [canBet]);

  useEffect(() => {
    socket.on("crash_data", (data) => {
      dispatch(changeCrashAtText({ crashAtText: data.curr }));
      dispatch(changeGameEnd({ gameEnd: data.end }));
      dispatch(changeCanBet({ canBet: data.canBet }));
      dispatch(changeGameRunning({ gameRunning: data.gameRunning }));
      dispatch(changeCrashAtNo({ crashAtNo: data.no }));
      dispatch(updateBetsArr({ betsArr: data.crashBets }));
      dispatch(changeCrashed({ crashed: data.crashed }));
    });
  }, [socket]);

  useEffect(() => {
    if (gameEnd) {
      dispatch(changeBetting({ betting: false }));
      dispatch(changeCashedOut({ cashedOut: false }));
    }
  }, [gameEnd]);

  const sendMyBet = () => {
    dispatch(changeBetting({ betting: true }));
    socket.emit("send_bet", {
      roomName: "crash",
      data: {
        userName,
        userEmail,
        betAmt,
        betting,
        crashOutAt: null,
        profit: null,
      },
    });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
    });
    cancelBetNextRound();
  };

  const cashOut = (amt, on) => {
    dispatch(changeBetting({ betting: false }));
    dispatch(changeCashedOut({ cashedOut: true }));
    socket.emit("change_crash_bet", {
      userEmail,
      cashedOutAt: on,
      profit: amt,
    });
    socket.emit("send_reward", {
      userEmail: userEmail,
      betAmt: amt,
    });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
    });
  };

  const sendBetNextRound = () => {
    setAddedToQue(true);
    setBettingNextRound(true);
  };

  const cancelBetNextRound = () => {
    setAddedToQue(false);
    setBettingNextRound(false);
  };

  return (
    <div className='grid grid-cols-2 grid-rows-5 py-10 px-5 w-full gap-5 child:rounded-xl child:p-3 h-screen'>
      <div
        className='bg-slate-600 row-span-3 overflow-hidden'
        style={{ padding: "0px" }}
      >
        <CrashGraph />
      </div>
      <div
        className='row-span-5'
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <CrashBetsDisplay />
      </div>
      <div
        className='row-span-2'
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <CrashBet
          sendMyBet={sendMyBet}
          canBet={canBet}
          cashOut={cashOut}
          sendBetNextRound={sendBetNextRound}
          addedToQue={addedToQue}
          cancelBetNextRound={cancelBetNextRound}
          cashedOut={cashedOut}
          bettingNextRound={bettingNextRound}
        />
      </div>
    </div>
  );
};

export default CrashGame;
