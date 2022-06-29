import React, { useEffect, useState } from "react";

const CrashBetsDisplay = ({ betsArr, setBetsArr }) => {
  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setBetsArr(data);
  //     console.log(data);
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   fetch("http://localhost:3001/crash")
  //     .then((response) => response.json())
  //     .then((data) => setBetsArr(data.bets));
  // }, [socket]);

  return (
    <div className=''>
      {betsArr !== undefined &&
        betsArr.map(({ userName, betAmt }, i) => {
          return (
            <p key={i}>
              {userName} is betting {betAmt}
            </p>
          );
        })}
    </div>
  );
};

export default CrashBetsDisplay;
