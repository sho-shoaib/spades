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
    } else if (betting) {
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
    }
  };

  const cashOut = (amt) => {
    setBetting(false);
    socket.emit("send_reward", {
      userEmail: userEmail,
      betAmt: amt
    });
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
        />
      </div>
    </div>
  );
};

export default CrashGame;
