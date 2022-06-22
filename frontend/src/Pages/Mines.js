import React, { useEffect, useState } from "react";
import MinesBet from "../Sections/MinesBet";
import MinesPlay from "../Sections/MinesPlay";
import { socket } from "../App";

const Mines = () => {
  const [betting, setBetting] = useState(false);
  const [bet, setBet] = useState(100);

  useEffect(() => {
    socket.emit("join mines");
  });

  return (
    <div className='flex w-full py-10 px-5 gap-1'>
      <div className='bg-slate-700 rounded-l-xl' style={{ width: "30%" }}>
        <MinesBet
          betting={betting}
          setBetting={setBetting}
          bet={bet}
          setBet={setBet}
        />
      </div>
      <div
        className='bg-slate-600 rounded-r-xl flex justify-center items-center'
        style={{ width: "70%" }}
      >
        <MinesPlay betting={betting} setBetting={setBetting} />
      </div>
    </div>
  );
};

export default Mines;
