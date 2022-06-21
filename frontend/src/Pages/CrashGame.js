import React, { useEffect } from "react";
import CrashGraph from "../Components/CrashGraph";
import CrashBet from "../Sections/CrashBet";
import CrashBetsDisplay from "../Sections/CrashBetsDisplay";

const CrashGame = () => {
  return (
    <div className='grid grid-cols-2 grid-rows-5 py-10 px-5 w-full gap-5 child:rounded-xl child:p-3'>
      <div className='bg-slate-600 row-span-3'>
        <CrashGraph />
      </div>
      <div className='bg-slate-600 row-span-5'>
        <CrashBetsDisplay />
      </div>
      <div className='bg-slate-600 row-span-2'>
        <CrashBet />
      </div>
    </div>
  );
};

export default CrashGame;
