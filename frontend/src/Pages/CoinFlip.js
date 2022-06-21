import React, { useEffect, useState } from "react";
import { socket } from "../App";
import CoinFlipBet from "../Sections/CoinFlipBet";
import CoinFlipPlay from "../Sections/CoinFlipPlay";
import axios from "axios";

const CoinFlip = () => {
  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState();
  const [betting, setBetting] = useState(false);

  const executeBet = () => {
    setBetting(!betting);
  };

  const sendMyChoice = (choice) => {
    if (choice !== "") {
      setLoading(true);
      axios
        .post("http://localhost:3001/coin-flip", {
          choice,
        })
        .then((res) => {
          setDisplayData(res.data);
          if (res.data.status === "LOST") {
            setTimeout(() => {
              executeBet();
            }, 1000);
          }
        });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className='flex w-full py-10 px-5 gap-1'>
      <div className='bg-slate-700 rounded-l-xl' style={{ width: "30%" }}>
        <CoinFlipBet
          loading={loading}
          setLoading={setLoading}
          sendMyChoice={sendMyChoice}
          betting={betting}
          setBetting={setBetting}
          executeBet={executeBet}
        />
      </div>
      <div className='bg-slate-600  rounded-r-xl' style={{ width: "70%" }}>
        <CoinFlipPlay loading={loading} displayData={displayData} />
      </div>
    </div>
  );
};

export default CoinFlip;
