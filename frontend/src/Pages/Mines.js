import React from "react";
import MinesBet from "../Sections/MinesBet";
import MinesPlay from "../Sections/MinesPlay";

const Mines = () => {
  return (
    <div className='flex w-full py-10 px-5 gap-1'>
      <div className='bg-slate-700 rounded-l-xl' style={{ width: "30%" }}>
        <MinesBet />
      </div>
      <div className='bg-slate-600  rounded-r-xl' style={{ width: "70%" }}>
        <MinesPlay />
      </div>
    </div>
  );
};

export default Mines;
