import React, { useState } from "react";
import SlotMachineBet from "../Sections/SlotMachine/SlotMachineBet";
import SlotMachinePlay from "../Sections/SlotMachine/SlotMachinePlay";

const SlotMachine = () => {
  const [betting, setBetting] = useState(false);

  return (
    <div className='flex w-full py-10 px-5 gap-1'>
      <div className='bg-slate-700 rounded-l-xl' style={{ width: "30%" }}>
        <SlotMachineBet betting={betting} setBetting={setBetting} />
      </div>
      <div
        className='bg-slate-600 rounded-r-xl flex justify-center items-center'
        style={{ width: "70%" }}
      >
        <SlotMachinePlay betting={betting} setBetting={setBetting} />
      </div>
    </div>
  );
};

export default SlotMachine;
