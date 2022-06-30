import React, { useEffect, useState } from "react";
import MinesBet from "../Sections/MinesBet";
import MinesPlay from "../Sections/MinesPlay";
import { socket } from "../App";

const Mines = ({ setBalance }) => {
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.username;
  const [betting, setBetting] = useState(false);
  const [bet, setBet] = useState(100);
  const [checkWhat, setCheckWhat] = useState();
  const [game, setGame] = useState(0);
  const [cashoutAt, setCashoutAt] = useState();

  useEffect(() => {
    socket.emit("join_room", { roomName: "mines" });
  }, []);

  const sendMyBet = () => {
    if (!betting) {
      setCashoutAt(bet);
      setGame((prev) => prev + 1);
      setBetting(true);
      socket.emit("send_bet", {
        roomName: "mines",
        data: { userEmail, userName, betAmt: bet },
      });
      socket.on("deducted_amt", (data) => {
        setBalance(data.balance);
      });
      socket.emit("get mines data");
      socket.on("receive data mines", (data) => {
        setCheckWhat(data.checkWhat);
      });
    }
  };

  const cashOutAmt = () => {
    setBetting(false);
    socket.emit("send_reward", { userEmail, betAmt: cashoutAt });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
    });
  };

  return (
    <div className='flex w-full py-10 px-5 gap-1 h-screen'>
      <div className='bg-slate-700 rounded-l-xl' style={{ width: "30%" }}>
        <MinesBet
          betting={betting}
          setBetting={setBetting}
          bet={bet}
          setBet={setBet}
          sendMyBet={sendMyBet}
          cashoutAt={cashoutAt}
          cashOutAmt={cashOutAmt}
        />
      </div>
      <div
        className='bg-slate-600 rounded-r-xl flex justify-center items-center'
        style={{ width: "70%" }}
      >
        <MinesPlay
          betting={betting}
          setBetting={setBetting}
          checkWhat={checkWhat}
          game={game}
          setCashoutAt={setCashoutAt}
        />
      </div>
    </div>
  );
};

export default Mines;
