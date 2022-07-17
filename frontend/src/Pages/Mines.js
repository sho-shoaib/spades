import React, { useEffect } from "react";
import MinesBet from "../Sections/MinesBet";
import MinesPlay from "../Sections/MinesPlay";
import { socket } from "../App";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBetting,
  changeCashoutAt,
  changeCheckWhat,
  changeGame,
  changeNextProfit,
  changeTiles,
  changeTotalProfit,
} from "../features/mines/minesSlice";
import minesBg from "../assets/mines/bg_mines.jpg";
import { rooms } from "../App";

const Mines = ({ setBalance }) => {
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.username;
  const dispatch = useDispatch();
  const { betting, betAmt, cashoutAt, game } = useSelector(
    (state) => state.mines
  );

  useEffect(() => {
    rooms.map((item) => {
      socket.emit("leave_room", { roomName: item });
    });
    socket.emit("join_room", { roomName: "mines" });
  }, []);

  const sendMyBet = () => {
    if (!betting) {
      dispatch(changeBetting({ betting: false }));
      dispatch(changeTiles({ tiles: 1 }));
      dispatch(
        changeTotalProfit({
          totalProfit: [betAmt, 1.0],
        })
      );
      dispatch(
        changeNextProfit({
          nextProfit: [betAmt * 1.02, 1.02],
        })
      );
      dispatch(changeCashoutAt({ cashoutAt: betAmt }));
      dispatch(changeGame({ game: game + 1 }));
      dispatch(changeBetting({ betting: true }));
      socket.emit("send_bet", {
        roomName: "mines",
        data: { userEmail, userName, betAmt: betAmt },
      });
      socket.on("deducted_amt", (data) => {
        setBalance(data.balance);
      });
      socket.emit("get mines data");
      socket.on("receive data mines", (data) => {
        dispatch(changeCheckWhat({ checkWhat: data.checkWhat }));
      });
    }
  };

  const cashOutAmt = () => {
    dispatch(changeBetting({ betting: false }));
    dispatch(changeTiles({ tiles: 1 }));
    dispatch(
      changeTotalProfit({
        totalProfit: [betAmt, 1.0],
      })
    );
    dispatch(
      changeNextProfit({
        nextProfit: [betAmt * 1.02, 1.02],
      })
    );
    socket.emit("send_reward", { userEmail, betAmt: cashoutAt });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
    });
  };

  return (
    <div className='flex w-full py-10 px-5 gap-1 h-screen'>
      <div className='bg-slate-700 rounded-l-xl' style={{ width: "30%" }}>
        <MinesBet sendMyBet={sendMyBet} cashOutAmt={cashOutAmt} />
      </div>
      <div
        className='bg-slate-600 rounded-r-xl flex justify-center items-center bg-cover'
        style={{ width: "70%", backgroundImage: `url(${minesBg})` }}
      >
        <MinesPlay />
      </div>
    </div>
  );
};

export default Mines;
