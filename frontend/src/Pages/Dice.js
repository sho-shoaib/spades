import React, { useEffect, useState } from "react";
import { socket } from "../App";
import DiceBet from "../Sections/Dice/DiceBet";
import DicePlay from "../Sections/Dice/DicePlay";

const Dice = () => {
  const [betting, setBetting] = useState(false);
  const [bet, setBet] = useState(100);
  const [checkWhat, setCheckWhat] = useState();
  const [game, setGame] = useState(0);
  const [underNo, setUnderNo] = useState(50);

  useEffect(() => {
    socket.emit("join_room", { roomName: "dice" });
  }, []);

  const sendMyBet = () => {
    if (!betting) {
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
        <DiceBet
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
        <DicePlay underNo={underNo} setUnderNo={setUnderNo} />
      </div>
    </div>
  );
};

export default Dice;
