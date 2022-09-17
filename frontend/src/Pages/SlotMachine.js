import React, { useEffect, useState } from "react";
import { socket } from "../App";
import SlotMachineBet from "../Sections/SlotMachine/SlotMachineBet";
import SlotMachinePlay from "../Sections/SlotMachine/SlotMachinePlay";
import {
  initializeCashoutAt,
  changeBetting,
  refreshCashoutAt,
  changeCashoutAtWin,
  changeCashoutAtJackpot,
  changeFruitsArr,
  changeLost,
  changeJackpot,
  changeEqualTerms,
} from "../features/slotMachine/slotMachineSlice";
import { useSelector, useDispatch } from "react-redux";
import { rooms } from "../App";

const SlotMachine = ({ setBalance }) => {
  const dispatch = useDispatch();
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.userName;

  const { betAmt, cashoutAt, lost, jackpot } = useSelector(
    (state) => state.slotMachine
  );

  useEffect(() => {
    socket.on("recieve slotMachine data", (data) => {
      dispatch(changeFruitsArr({ fruitsArr: data.toSendArr }));
      dispatch(changeLost({ lost: data.lost }));
      dispatch(changeJackpot({ jackpot: data.jackpot }));
      dispatch(changeEqualTerms({ equalTerms: data.equalterms }));
      if (data.lost) {
        dispatch(changeBetting({ betting: false }));
        dispatch(refreshCashoutAt());
      } else if (!data.lost && !data.jackpot) {
        dispatch(changeCashoutAtWin());
      } else if (!data.lost && data.jackpot) {
        dispatch(changeCashoutAtJackpot());
      }
    });
  }, [socket]);

  const sendMyBet = () => {
    dispatch(changeBetting({ betting: true }));
    dispatch(initializeCashoutAt());
    socket.emit("send_bet", {
      roomName: "slotMachine",
      data: { userEmail, userName, betAmt },
    });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
    });
  };

  const spinIt = () => {
    socket.emit("get slotMachine data");
  };

  const executeCashout = () => {
    socket.emit("send_reward", { userEmail, betAmt: parseFloat(cashoutAt) });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
    });
    dispatch(changeBetting({ betting: false }));
    dispatch(refreshCashoutAt());
  };

  useEffect(() => {
    rooms.map((item) => {
      socket.emit("leave_room", { roomName: item });
    });
    socket.emit("join_room", { roomName: "slot-machine" });
  }, []);

  return (
    <div className='flex w-full py-10 px-5 gap-1 h-screen'>
      <div
        className='rounded-l-xl'
        style={{ width: "30%", backgroundColor: "#17181B" }}
      >
        <SlotMachineBet
          sendMyBet={sendMyBet}
          executeCashout={executeCashout}
          spinIt={spinIt}
        />
      </div>
      <div
        className='rounded-r-xl flex flex-col gap-10 justify-center items-center'
        style={{ width: "70%", backgroundColor: "#17181B" }}
      >
        <SlotMachinePlay />
      </div>
    </div>
  );
};

export default SlotMachine;
