import React, { useEffect, useState } from "react";
import { socket } from "../App";
import CrashGraph from "../Components/CrashGraph";
import CrashBet from "../Sections/CrashBet";
import CrashBetsDisplay from "../Sections/CrashBetsDisplay";

const CrashGame = () => {
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.username;
  const [betsArr, setBetsArr] = useState();
  const [betting, setBetting] = useState(false);
  const [bet, setBet] = useState(1);
  const [crashAt, setCrashAt] = useState();
  const [gameEnd, setGameEnd] = useState(false);
  const [canBet, setCanBet] = useState(true);
  const [gameRunning, setGameRunning] = useState(false);
  const [crashNo, setCrashNo] = useState();
  const [addedToQue, setAddedToQue] = useState(false);
  const [bettingNextRound, setBettingNextRound] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);

  useEffect(() => {
    socket.emit("join_room", { roomName: "crash" });
  }, []);

  useEffect(() => {
    socket.on("crash_data", (data) => {
      setCrashAt(data.curr);
      setGameEnd(data.end);
      setBetsArr(data.crashBets);
      setCanBet(data.canBet);
      setGameRunning(data.gameRunning);
      setCrashNo(data.no);
    });
  }, [socket]);

  const sendMyBet = () => {
    if (!betting && canBet) {
      setBetting(true);
      socket.emit("send_bet", {
        roomName: "crash",
        data: { userEmail, userName, betAmt: bet },
      });
    }
  };

  const cancelMyBet = () => {
    setBetting(false);
    socket.emit("cancel_bet", {
      roomName: "crash",
      data: {
        name: sessionStorage.username,
        bet: bet,
        cancel: true,
        betting: false,
      },
    });
  };

  useEffect(() => {
    if (!gameRunning) {
      setCashedOut(false);
    }
    if (addedToQue && !gameRunning) {
      setBetting(true);
      socket.emit("send_bet", {
        roomName: "crash",
        data: { userEmail, userName, betAmt: bet },
      });
    }
  }, [addedToQue, gameRunning]);

  const cashOut = (amt) => {
    setBetting(false);
    setCashedOut(true);
    socket.emit("send_reward", {
      userEmail: userEmail,
      betAmt: amt,
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
      <div className='bg-slate-600 row-span-3'>
        <CrashGraph
          crashAt={crashAt}
          setCrashAt={setCrashAt}
          gameEnd={gameEnd}
          setGameEnd={setGameEnd}
        />
      </div>
      <div className='bg-slate-600 row-span-5'>
        <CrashBetsDisplay betsArr={betsArr} />
      </div>
      <div className='bg-slate-600 row-span-2'>
        <CrashBet
          sendMyBet={sendMyBet}
          betting={betting}
          setBetting={setBetting}
          bet={bet}
          setBet={setBet}
          canBet={canBet}
          gameRunning={gameRunning}
          crashNo={crashNo}
          cashOut={cashOut}
          sendBetNextRound={sendBetNextRound}
          addedToQue={addedToQue}
          cancelBetNextRound={cancelBetNextRound}
          cancelMyBet={cancelMyBet}
          cashedOut={cashedOut}
        />
      </div>
    </div>
  );
};

export default CrashGame;
