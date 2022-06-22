import React, { useEffect, useState } from "react";
import { socket } from "../App";
import CrashGraph from "../Components/CrashGraph";
import CrashBet from "../Sections/CrashBet";
import CrashBetsDisplay from "../Sections/CrashBetsDisplay";

const CrashGame = () => {
  const [betsArr, setBetsArr] = useState();
  const [betting, setBetting] = useState(false);
  const [bet, setBet] = useState(1);

  useEffect(() => {
    socket.emit("join_room", { roomname: "crash" });
    socket.on("joined", (data) => {
      setBetsArr(data.crashBets);
    });
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setBetsArr(data);
      console.log(betsArr);
    });
  }, [socket]);

  const sendMyBet = () => {
    if (!betting) {
      setBetting(true);
      socket.emit("send_bet", {
        name: "shoaib",
        bet: bet,
        cancel: false,
        betting: true,
      });
    } else if (betting) {
      setBetting(false);
      socket.emit("cancel_bet", {
        name: "shoaib",
        bet: bet,
        cancel: true,
        betting: false,
      });
    }
  };

  return (
    <div className='grid grid-cols-2 grid-rows-5 py-10 px-5 w-full gap-5 child:rounded-xl child:p-3'>
      <div className='bg-slate-600 row-span-3'>
        <CrashGraph />
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
        />
      </div>
    </div>
  );
};

export default CrashGame;
