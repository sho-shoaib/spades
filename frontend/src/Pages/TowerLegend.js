import React, { useEffect } from "react";
import { socket } from "../App";
import TowerLegendBet from "../Sections/TowerLegend/TowerLegendBet";
import TowerLegendPlay from "../Sections/TowerLegend/TowerLegendPlay";
import { useSelector, useDispatch } from "react-redux";
import {
  changeBetting,
  changeLoading,
  changeCashoutAt,
  changelooseText,
  changeGameEnd,
  changeGame,
  changeCheckWhat,
} from "../features/towerLegend/towerLegendSlice";
import towerBg from "../assets/towerLegend/tower_bg.png";
import towerMainBg from "../assets/towerLegend/towerMain-bg.png";
import { rooms } from "../App";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const TowerLegend = ({ setBalance }) => {
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.username;

  const dispatch = useDispatch();

  const { betting, betAmt, cashoutAt, game, mode } = useSelector(
    (state) => state.towerLegend
  );

  useEffect(() => {
    rooms.map((item) => {
      socket.emit("leave_room", { roomName: item });
    });
    socket.emit("join_room", { roomName: "tower-legend" });
  }, []);

  const sendMyBet = () => {
    if (!betting) {
      dispatch(changeLoading({ loading: true }));
      dispatch(changeCashoutAt({ cashoutAt: betAmt }));
      dispatch(changelooseText({ looseText: "" }));
      dispatch(changeGameEnd({ gameEnd: false }));
      dispatch(changeGame({ game: game + 1 }));
      dispatch(changeBetting({ betting: true }));
      socket.emit("send_bet", {
        roomName: "tower-legend",
        data: { userEmail, userName, betAmt },
      });
      socket.on("deducted_amt", (data) => {
        setBalance(data.balance);
      });
      socket.emit("get tower data", {
        selectedClientSeed: makeid(15),
        selectedNonce: game,
        selectedMode: mode,
      });
      socket.on("recieve tower data", (data) => {
        dispatch(changeCheckWhat({ checkWhat: data }));
      });
      dispatch(changeLoading({ loading: false }));
    }
  };

  const cashOutAmt = () => {
    dispatch(changeBetting({ betting: false }));
    socket.emit("send_reward", { userEmail, betAmt: cashoutAt });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
    });
  };

  return (
    <div className='flex w-full py-10 px-5 gap-1 h-screen'>
      <div
        className='rounded-l-xl'
        style={{ width: "30%", backgroundColor: "#17181B" }}
      >
        <TowerLegendBet sendMyBet={sendMyBet} cashOutAmt={cashOutAmt} />
      </div>
      <div
        className='rounded-r-xl flex justify-center items-center flex-col bg-cover bg-center relative'
        style={{
          width: "70%",
          backgroundImage: `url(${towerBg})`,
        }}
      >
        <div className='absolute left-0' style={{ width: "83%" }}>
          <img src={towerMainBg} alt='' className='w-full h-full' />
        </div>
        <TowerLegendPlay sendMyBet={sendMyBet} cashOutAmt={cashOutAmt} />
      </div>
    </div>
  );
};

export default TowerLegend;
