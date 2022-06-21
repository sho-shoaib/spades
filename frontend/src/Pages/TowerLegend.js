import React, { useState } from "react";
import TowerLegendBet from "../Sections/TowerLegend/TowerLegendBet";
import TowerLegendPlay from "../Sections/TowerLegend/TowerLegendPlay";

const TowerLegend = () => {
  const [betting, setBetting] = useState(false);

  return (
    <div className='flex w-full py-10 px-5 gap-1'>
      <div className='bg-slate-700 rounded-l-xl' style={{ width: "30%" }}>
        <TowerLegendBet betting={betting} setBetting={setBetting} />
      </div>
      <div
        className='bg-slate-600 rounded-r-xl flex justify-center items-center'
        style={{ width: "70%" }}
      >
        <TowerLegendPlay betting={betting} setBetting={setBetting} />
      </div>
    </div>
  );
};

export default TowerLegend;
