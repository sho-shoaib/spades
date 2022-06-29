import React, { useEffect, useState } from "react";
import { socket } from "../App";
import TowerLegendBet from "../Sections/TowerLegend/TowerLegendBet";
import TowerLegendPlay from "../Sections/TowerLegend/TowerLegendPlay";

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

const TowerLegend = () => {
  const [betting, setBetting] = useState(false);
  const [bet, setBet] = useState(100);
  const [game, setGame] = useState(0);
  const [checkWhat, setCheckWhat] = useState();
  const [loading, setLoading] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [looseText, setLooseText] = useState("");

  useEffect(() => {
    socket.emit("join_room", { roomName: "tower-legend" });
  }, []);

  const sendMyBet = () => {
    if (!betting) {
      setLoading(true);
      setLooseText("");
      setGameEnd(false);
      setGame((prev) => prev + 1);
      setBetting(true);
      socket.emit("get tower data", {
        bet,
        selectedClientSeed: makeid(15),
        selectedNonce: game,
        selectedMode: 0,
      });
      socket.on("recieve tower data", (data) => {
        setCheckWhat(data);
      });
      setLoading(false);
    } else if (betting) {
      setBetting(false);
    }
  };

  return (
    <div className='flex w-full py-10 px-5 gap-1 h-screen'>
      <div className='bg-slate-700 rounded-l-xl' style={{ width: "30%" }}>
        <TowerLegendBet
          betting={betting}
          setBetting={setBetting}
          bet={bet}
          setBet={setBet}
          sendMyBet={sendMyBet}
        />
      </div>
      <div
        className='bg-slate-600 rounded-r-xl flex justify-center items-center'
        style={{ width: "70%" }}
      >
        <TowerLegendPlay
          betting={betting}
          setBetting={setBetting}
          sendMyBet={sendMyBet}
          checkWhat={checkWhat}
          loading={loading}
          game={game}
          setGameEnd={setGameEnd}
          gameEnd={gameEnd}
          setLooseText={setLooseText}
          looseText={looseText}
        />
      </div>
    </div>
  );
};

export default TowerLegend;
