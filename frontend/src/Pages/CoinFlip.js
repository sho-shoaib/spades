import React, { useEffect, useState } from "react";
import { socket } from "../App";
import CoinFlipBet from "../Sections/CoinFlipBet";
import CoinFlipPlay from "../Sections/CoinFlipPlay";
import bg from "../assets/coinFlip/coinFlip-bg.png";
import { useSelector, useDispatch } from "react-redux";
import {
  changeBetting,
  initializeCashoutAt,
  changeCashoutAt,
  setDisplayData,
  changeSeries,
  changeMultiplier,
} from "../features/coinFlip/coinFlipSlice";
import { rooms } from "../App";

const CoinFlip = ({ refreshWallet, setBalance }) => {
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.username;
  const [loading, setLoading] = useState(false);
  const { betAmt, cashoutAt, multiplier } = useSelector(
    (state) => state.coinFlip
  );
  const dispatch = useDispatch();

  // join room
  useEffect(() => {
    rooms.map((item) => {
      socket.emit("leave_room", { roomName: item });
    });
    socket.emit("join_room", { roomName: "coinFlip" });
  }, []);

  useEffect(() => {
    socket.on("get coinFlip result", (data) => {
      dispatch(setDisplayData({ displayData: data }));
      setTimeout(() => {
        setLoading(false);
        dispatch(changeBetting({ betting: data.betting }));
        if (data.status === "WON") {
          dispatch(changeCashoutAt({ cashoutAt: data.userBetAmt }));
          dispatch(changeMultiplier({ multiplier: data.multiplier }));
        } else if (data.status === "LOST") {
          refreshWallet();
          dispatch(changeCashoutAt({ cashoutAt: data.userBetAmt }));
          dispatch(changeMultiplier({ multiplier: data.multiplier }));
        }
      }, 1000);
    });
  }, [socket]);

  const executeBet = () => {
    dispatch(setDisplayData({ displayData: { empty: true } }));
    dispatch(changeBetting({ betting: true }));
    dispatch(initializeCashoutAt());
    dispatch(changeSeries({ series: "re" }));
    dispatch(changeMultiplier({ multiplier: 0.0 }));
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
      dispatch(changeSeries({ series: "add" }));
      setLoading(true);
      socket.emit("post coinFlip result", {
        userChoice: choice,
        userBetAmt: cashoutAt,
        multiplier: multiplier,
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
      <div
        className='rounded-l-xl'
        style={{ width: "30%", backgroundColor: "#17181B" }}
      >
        <CoinFlipBet
          loading={loading}
          setLoading={setLoading}
          sendMyChoice={sendMyChoice}
          executeBet={executeBet}
          executeCashout={executeCashout}
        />
      </div>
      <div
        className='rounded-r-xl flex justify-center items-center bg-cover'
        style={{
          width: "70%",
          backgroundImage: `url(${bg})`,
        }}
      >
        <CoinFlipPlay loading={loading} />
      </div>
    </div>
  );
};

export default CoinFlip;
