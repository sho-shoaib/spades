import React, { useEffect, useState } from "react";
import { socket } from "../App";
import CoinFlipBet from "../Sections/CoinFlipBet";
import CoinFlipPlay from "../Sections/CoinFlipPlay";
import { useSelector, useDispatch } from "react-redux";
import {
  changeBetting,
  initializeCashoutAt,
  changeCashoutAt,
} from "../features/coinFlip/coinFlipSlice";

const CoinFlip = ({ refreshWallet, setBalance }) => {
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.username;
  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState();
  const { betAmt, betting, cashoutAt } = useSelector((state) => state.coinFlip);
  const dispatch = useDispatch();

  // join room
  useEffect(() => {
    socket.emit("join_room", { roomName: "coinFlip" });
  }, []);

  useEffect(() => {
    socket.on("get coinFlip result", (data) => {
      setDisplayData(data);
      setTimeout(() => {
        setLoading(false);
        dispatch(changeBetting({ betting: data.betting }));
        if (data.status === "WON") {
          dispatch(changeCashoutAt());
        } else if (data.status === "LOST") {
          refreshWallet();
        }
      }, 1000);
    });
  }, [socket]);

  const executeBet = () => {
    dispatch(changeBetting({ betting: true }));
    dispatch(initializeCashoutAt());
    socket.emit("send_bet", {
      roomName: "coinFlip",
      data: { userEmail, userName, betAmt },
    });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
    });
  };

  const sendMyChoice = (choice) => {
    if (choice !== "") {
      setLoading(true);
      socket.emit("post coinFlip result", {
        userChoice: choice,
        userBetAmt: betAmt,
        userEmail: userEmail,
      });
    }
  };

  const executeCashout = () => {
    socket.emit("send_reward", { userEmail, betAmt: cashoutAt });
    dispatch(changeBetting({ betting: false }));
    refreshWallet();
    dispatch(changeCashoutAt({ cashoutAt: null }));
  };

  return (
    <div className='flex w-full py-10 px-5 gap-1 h-screen'>
      <div className='bg-slate-700 rounded-l-xl' style={{ width: "30%" }}>
        <CoinFlipBet
          loading={loading}
          setLoading={setLoading}
          sendMyChoice={sendMyChoice}
          betting={betting}
          executeBet={executeBet}
          cashoutAt={cashoutAt}
          executeCashout={executeCashout}
        />
      </div>
      <div className='bg-slate-600  rounded-r-xl' style={{ width: "70%" }}>
        <CoinFlipPlay loading={loading} displayData={displayData} />
      </div>
    </div>
  );
};

export default CoinFlip;
