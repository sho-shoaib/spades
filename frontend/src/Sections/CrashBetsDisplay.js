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
    <div>
      {betsArr !== undefined &&
        betsArr.map(({ name, bet }, i) => {
          return (
            <p key={i}>
              {name} is betting {bet}
            </p>
          );
        })}
    </div>
  );
};

export default CrashBetsDisplay;
