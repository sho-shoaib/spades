import React, { useEffect, useState } from "react";
import { socket } from "../App";
import CrashGraph from "../Components/CrashGraph";
import CrashBet from "../Sections/CrashBet";
import CrashBetsDisplay from "../Sections/CrashBetsDisplay";

const CrashGame = () => {
  const [betsArr, setBetsArr] = useState();
  const [betting, setBetting] = useState(false);
  const [bet, setBet] = useState(1);
  const [crashAt, setCrashAt] = useState();
  const [gameEnd, setGameEnd] = useState(false);
  const [canBet, setCanBet] = useState();
  const [gameRunning, setGameRunning] = useState();

  useEffect(() => {
    socket.emit("join_room", { roomName: "crash" });
  }, []);

  useEffect(() => {
    socket.on("crash_data", (data) => {
      setCrashAt(data.curr);
      setGameEnd(data.end);
      setGameStarting(data.starting);
      setBetsArr(data.crashBets);
      setCanBet(data.canBet);
      setGameRunning(data.gameRunning);
    });
  }, [socket]);

  const sendMyBet = () => {
    if (!betting && canBet) {
      setBetting(true);
      socket.emit("send_bet", {
        roomName: "crash",
        data: {
          name: sessionStorage.username,
          bet: bet,
          cancel: false,
          betting: true,
        },
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
        />
      </div>
    </div>
  );
};

export default CrashGame;
