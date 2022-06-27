import React, { useEffect, useState } from "react";
import MinesBet from "../Sections/MinesBet";
import MinesPlay from "../Sections/MinesPlay";
import { socket } from "../App";

const Mines = () => {
  const [betting, setBetting] = useState(false);
  const [bet, setBet] = useState(100);
  const [checkWhat, setCheckWhat] = useState();
  const [game, setGame] = useState(0);

  useEffect(() => {
    socket.emit("join_room", { roomName: "mines" });
  }, []);

  const sendMyBet = () => {
    if (!betting) {
      setGame((prev) => prev + 1);
      setBetting(true);
      socket.emit("get mines data", { bet: bet });
      socket.on("receive data mines", (data) => {
        setCheckWhat(data.checkWhat);
      });
    } else if (betting) {
      setBetting(false);
    }
  };

  return (
    <div className='flex w-full py-10 px-5 gap-1'>
      <div className='bg-slate-700 rounded-l-xl' style={{ width: "30%" }}>
        <MinesBet
          betting={betting}
          setBetting={setBetting}
          bet={bet}
          setBet={setBet}
          sendMyBet={sendMyBet}
        />
      </div>
      <div
        className='bg-slate-600 rounded-r-xl flex justify-center items-center'
        style={{ width: "70%" }}
      >
        <MinesPlay
          betting={betting}
          setBetting={setBetting}
          checkWhat={checkWhat}
          game={game}
        />
      </div>
    </div>
  );
};

export default Mines;
