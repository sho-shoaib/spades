import React, { useEffect } from "react";
import WheelBet from "../Sections/Wheel/WheelBet";
import WheelPlay from "../Sections/Wheel/WheelPlay";
import { rooms, socket } from "../App";

const Wheel = () => {
  useEffect(() => {
    rooms.map((item) => {
      socket.emit("leave_room", { roomName: item });
    });
    socket.emit("join_room", { roomName: "wheel" });
  }, []);

  return (
    <div className='flex w-full py-10 px-5 gap-1 h-screen'>
      <div className='bg-slate-700 rounded-l-xl py-10' style={{ width: "30%" }}>
        <WheelBet />
      </div>
      <div
        className='bg-slate-600 rounded-r-xl flex justify-center items-center'
        style={{ width: "70%" }}
      >
        <WheelPlay />
      </div>
    </div>
  );
};

export default Wheel;
