import React from "react";

const SlotMachinePlay = ({ betting }) => {
  return (
    <div className='bg-slate-900 p-5 gap-5 rounded-xl flex child:bg-slate-600 child:rounded-xl  child:w-52 child:h-52 child:cursor-auto'>
      <button disabled={!betting} className='disabled:opacity-80'></button>
      <button disabled={!betting} className='disabled:opacity-80'></button>
      <button disabled={!betting} className='disabled:opacity-80'></button>
    </div>
  );
};

export default SlotMachinePlay;
