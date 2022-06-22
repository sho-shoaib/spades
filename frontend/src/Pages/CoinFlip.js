import React, { useEffect, useState } from "react";
import { socket } from "../App";
import CoinFlipBet from "../Sections/CoinFlipBet";
import CoinFlipPlay from "../Sections/CoinFlipPlay";
import axios from "axios";

const CoinFlip = () => {
  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState();
  const [betting, setBetting] = useState(false);
  const [bet, setBet] = useState(100);

  // join room
  useEffect(() => {
    socket.emit("join coinFlip");
  }, []);

  useEffect(() => {
    console.log("hey");
    socket.on("get coinFlip result", (data) => {
      setDisplayData(data);
      setTimeout(() => {
        setLoading(false);
        setBetting(data.betting);
      }, 1000);
    });
  }, [socket]);

  const executeBet = () => {
    setBetting(!betting);
  };

  const sendMyChoice = (choice) => {
    if (choice !== "") {
      setLoading(true);
      socket.emit("post coinFlip result", {
        userChoice: choice,
        userBetAmt: bet,
      });
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
          bet={bet}
          setBet={setBet}
        />
      </div>
      <div className='bg-slate-600  rounded-r-xl' style={{ width: "70%" }}>
        <CoinFlipPlay loading={loading} displayData={displayData} />
      </div>
    </div>
  );
};

export default CoinFlip;
