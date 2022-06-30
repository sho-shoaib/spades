import React, { useEffect, useState } from "react";
import { socket } from "../App";
import SlotMachineBet from "../Sections/SlotMachine/SlotMachineBet";
import SlotMachinePlay from "../Sections/SlotMachine/SlotMachinePlay";

const SlotMachine = ({ setBalance }) => {
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.username;
  const [betting, setBetting] = useState(false);
  const [bet, setBet] = useState(100);
  const [fruits, setFruits] = useState(["Apple", "Banana", "Cherry"]);
  const [lost, setLost] = useState(false);
  const [jackpot, setJackpot] = useState(false);
  const [equalTerms, setEqualTerms] = useState(0);
  const [cashoutAt, setCashoutAt] = useState(bet);

  const sendMyBet = () => {
    setBetting(true);
    setCashoutAt(bet);
    socket.emit("send_bet", {
      roomName: "slot-machine",
      data: { userEmail, userName, betAmt: bet },
    });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
    });
    socket.emit("get slotMachine data");
    socket.on("recieve slotMachine data", (data) => {
      setFruits(data.toSendArr);
      setLost(data.lost);
      setJackpot(data.jackpot);
      setEqualTerms(data.equalterms);
    });
    if (lost) {
      setBetting(false);
      setCashoutAt(0);
    } else if (!lost && !jackpot) {
      setCashoutAt((prev) => prev * 1.02);
    } else if (jackpot) {
      setCashoutAt((prev) => prev * 1.5);
    }
  };

  // useEffect(() => {
  //   if (lost) {
  //     setBetting(false);
  //     setCashoutAt(0);
  //   } else if (!lost && !jackpot) {
  //     setCashoutAt((prev) => prev * 1.02);
  //   } else if (jackpot) {
  //     setCashoutAt((prev) => prev * 1.5);
  //   }
  // }, [lost, jackpot]);

  const cashOutAmt = () => {
    setBetting(false);
    socket.emit("send_reward", { userEmail, betAmt: cashoutAt });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
    });
    setCashoutAt(0);
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
          cashOutAmt={cashOutAmt}
          cashoutAt={cashoutAt}
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
          setCashoutAt={setCashoutAt}
        />
      </div>
    </div>
  );
};

export default SlotMachine;
