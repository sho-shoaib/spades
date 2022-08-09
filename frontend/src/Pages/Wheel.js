import React, { useEffect, useState } from "react";
import WheelBet from "../Sections/Wheel/WheelBet";
import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { MainScene } from "../PixiStuff/wheel/MainScene";
import pinImg from "../assets/wheel/wheel-pin.png";
import { rooms, socket } from "../App";
import { changeBetting, changeRotate } from "../features/wheel/wheelSlice";
import { useSelector, useDispatch } from "react-redux";

const Wheel = ({ setBalance }) => {
  const userEmail = sessionStorage.useremail;
  const userName = sessionStorage.username;
  const dispatch = useDispatch();
  const [pinLandsOn, setPinLandsOn] = useState(0);
  const [wins, setWins] = useState([]);
  const [segments, setSegments] = useState(10);

  const { betAmt } = useSelector((state) => state.wheel);

  useEffect(() => {
    rooms.map((item) => {
      socket.emit("leave_room", { roomName: item });
    });
    socket.emit("join_room", { roomName: "wheel" });
  }, []);

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const sendMyBet = () => {
    socket.emit("send_bet", {
      roomName: "wheel",
      data: { userEmail, userName, betAmt },
    });
    socket.on("deducted_amt", (data) => {
      setBalance(data.balance);
      dispatch(changeRotate({ rotate: true }));
    });
    setPinLandsOn();
    let randNum = randomIntFromInterval(0, 360) * (Math.PI / 180);
    while (
      randNum == 0 ||
      randNum == 0.6283185307179586 ||
      randNum == 1.2566370614359172 ||
      randNum == 1.8849555921538759 ||
      randNum == 2.5132741228718345 ||
      randNum == 3.141592653589793 ||
      randNum == 3.7699111843077517 ||
      randNum == 4.39822971502571 ||
      randNum == 5.026548245743669 ||
      randNum == 5.654866776461628 ||
      randNum == 6.283185307179586
    ) {
      randNum = randomIntFromInterval(0, 360) * (Math.PI / 180);
    }
    setPinLandsOn(randNum);
  };

  let myMultiplier;
  useEffect(() => {
    const app = new PIXI.Application({
      width: 500,
      height: 500,
      transparent: true,
      antialias: false,
    });

    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.height = "100%";
    app.renderer.view.style.width = "100%";
    app.renderer.view.style.objectFit = "cover";
    app.renderer.view.style.maxWidth = "800px";

    let pin = new PIXI.Sprite(pinImg.texture);
    pin.x = 125;
    pin.y = 50;
    pin.anchor.set(0.5);

    // window.onload = (event) => {
    //   document.getElementById("wheel-container").appendChild(app.view);
    // };
    let pinTexture = PIXI.Texture.from(pinImg);
    let pinSprite = new PIXI.Sprite(pinTexture);
    app.stage.addChild(pinSprite);

    let scene = new MainScene(segments);

    pinSprite.height = 45;
    pinSprite.width = 30;
    pinSprite.x = 250;
    pinSprite.y = 110;
    pinSprite.zIndex = 200;
    pinSprite.anchor.set(0.5);

    app.stage.addChild(pin);
    app.stage.addChild(scene.container);

    app.ticker.add(() => {
      TWEEN.update();
    });

    const tweenA = new TWEEN.Tween(scene.graphic);
    tweenA.to(
      {
        rotation: -(Math.PI / 2 + pinLandsOn) - 6 * Math.PI,
      },
      2000
    );
    tweenA.easing(TWEEN.Easing.Quadratic.Out);
    document.getElementById("wheel-container").replaceChildren(app.view);
    if (pinLandsOn != 0) {
      console.log(pinLandsOn);
      tweenA.start();
      scene.anglesArr.forEach((item) => {
        const { startAngle, endAngle, multiplier } = item;
        if (pinLandsOn > startAngle && pinLandsOn < endAngle) {
          myMultiplier = multiplier;
        }
      });
      dispatch(changeBetting({ betting: true }));
      setTimeout(() => {
        socket.emit("send_reward", {
          userEmail: userEmail,
          betAmt: betAmt * myMultiplier,
        });
        socket.on("deducted_amt", (data) => {
          setBalance(data.balance);
        });
        dispatch(changeBetting({ betting: false }));
        if (wins.length > 4) {
          setWins((prev) => {
            prev.shift();
            return [...prev, betAmt * myMultiplier];
          });
        } else {
          setWins([...wins, betAmt * myMultiplier]);
        }
      }, 2000);
    }
  }, [pinLandsOn, segments]);

  return (
    <div className='flex w-full py-10 px-5 gap-0.5 h-screen'>
      <div
        className='rounded-l-xl py-10'
        style={{ width: "30%", backgroundColor: "#17181B" }}
      >
        <WheelBet
          sendMyBet={sendMyBet}
          setSegments={setSegments}
          segments={segments}
          setPinLandsOn={setPinLandsOn}
        />
      </div>
      <div
        className='bg-slate-600 rounded-r-xl flex justify-center items-center overflow-hidden  flex flex-col w-full'
        style={{ maxWidth: "70%", backgroundColor: "#17181B" }}
      >
        <div
          id='win-container'
          className='flex items-center w-full p-4 justify-end overflow-hidden gap-3 w-96 transiton-all'
        >
          {wins.map((item) => {
            return (
              <div
                style={{ width: "75px" }}
                className='text-center p-1 rounded-full border-4 font-semibold text-lg transiton-all'
              >
                {item}
              </div>
            );
          })}
        </div>
        <div
          id='wheel-container'
          style={{ height: "100%", width: "100%" }}
          className='relative'
        ></div>
      </div>
    </div>
  );
};

export default Wheel;
