import React, { useEffect, useState } from "react";
import { socket } from "../App";
import SlotMachineBet from "../Sections/SlotMachine/SlotMachineBet";
import SlotMachinePlay from "../Sections/SlotMachine/SlotMachinePlay";

const SlotMachine = () => {
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.username;
  const [betting, setBetting] = useState(false);
  const [bet, setBet] = useState(100);
  const [fruits, setFruits] = useState(["Apple", "Banana", "Cherry"]);
  const [lost, setLost] = useState(false);
  const [jackpot, setJackpot] = useState(false);
  const [equalTerms, setEqualTerms] = useState(0);

  const sendMyBet = (toBet, toCashOut) => {
    if (toBet) {
      setBetting(true);
      socket.emit("send_bet", {
        roomName: "slot-machine",
        data: { userEmail, userName, betAmt: bet },
      });
      socket.emit("get slotMachine data");
      socket.on("recieve tower data", (data) => {
        setFruits(data.toSendArr);
        setLost(data.lost);
        setJackpot(data.jackpot);
        setEqualTerms(data.equalterms);
      });
    } else if (toCashOut) {
      setBetting(false);
    }
  };

  useEffect(() => {
    socket.emit("join_room", { roomName: "slot-machine" });
  }, []);

  return (
    <div className='flex w-full py-10 px-5 gap-1 h-screen'>
      <div className='bg-slate-700 rounded-l-xl' style={{ width: "30%" }}>
        <SlotMachineBet
          betting={betting}
          setBetting={setBetting}
          bet={bet}
          setBet={setBet}
          sendMyBet={sendMyBet}
          lost={lost}
        />
      </div>
      <div
        className='bg-slate-600 rounded-r-xl flex flex-col gap-10 justify-center items-center'
        style={{ width: "70%" }}
      >
        <SlotMachinePlay
          betting={betting}
          setBetting={setBetting}
          fruits={fruits}
          lost={lost}
          jackpot={jackpot}
          equalTerms={equalTerms}
        />
      </div>
    </div>
  );
};

export default SlotMachine;
