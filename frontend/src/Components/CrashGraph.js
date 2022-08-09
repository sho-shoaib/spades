import React from "react";
import { useSelector } from "react-redux";
import TWEEN from "@tweenjs/tween.js";
import * as PIXI from "pixi.js";
import { useEffect } from "react";
import rocketImg from "../assets/crash/crash_rocket.png";
import "./crashSky.css";

const CrashGraph = () => {
  const { crashAtText, gameEnd, crashed, canBet, gameRunning } = useSelector(
    (state) => state.crash
  );

  useEffect(() => {
    let app = new PIXI.Application({
      width: 400,
      height: 300,
      transparent: true,
      antialias: true,
    });

    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.height = "100%";
    app.renderer.view.style.width = "100%";
    app.renderer.view.style.objectFit = "cover";
    app.renderer.view.style.maxWidth = "608px";

    // Container
    let container = new PIXI.Container();
    app.stage.addChild(container);

    // Graphic
    let graphic = new PIXI.Graphics();
    container.addChild(graphic);

    graphic.x = 0;
    graphic.y = 272;
    graphic.lineStyle(5, 0xffa500);
    // graphic.moveTo(400, 0);
    // graphic.rotation = Math.PI / 2;

    var lineX = 0;
    var lineY = 0;

    let rocketTexture = PIXI.Texture.from(rocketImg);
    let rocketSprite = new PIXI.Sprite(rocketTexture);
    app.stage.addChild(rocketSprite);

    rocketSprite.scale.x = 0.15;
    rocketSprite.scale.y = 0.15;
    rocketSprite.position.set(30, 252);
    rocketSprite.anchor.set(0.5);
    rocketSprite.rotation = Math.PI / 2.9;

    const loop = (delta) => {
      if (lineY <= 210) {
        if (crashed) {
          graphic.lineStyle(5, 0xff0000);
          graphic.lineTo(180, -105);
          graphic.lineTo(270, -10);
          rocketSprite.rotation = Math.PI / 1.3;
          rocketSprite.position.set(250, 242 + lineY * -1);
          app.ticker.stop();
        } else {
          lineX += 1;
          lineY += 0.6;
          graphic.lineTo(lineX, -lineY);
          rocketSprite.position.set(lineX + 10, 268 + lineY * -1);
        }
      } else {
        app.ticker.stop();
      }
    };

    if (!canBet) {
      app.ticker.add((delta) => loop(delta));
    }

    document.getElementById("crash-container").replaceChildren(app.view);
  }, [canBet, crashed]);

  return (
    <div
      id='graph'
      className='relative w-full h-full flex justify-center items-center'
    >
      <div className='absolute top-0 bottom-0 left-0 right-0'>
        <div class='stars'></div>
        <div class='twinkling'></div>
        <div
          className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center '
          style={{ zIndex: "10", opacity: 1 }}
        >
          <p className={`text-4xl ${gameEnd && "text-red-500"}`}>
            {crashAtText}
          </p>
        </div>
      </div>
      <div
        id='crash-container'
        className='w-full h-full'
        style={{ zIndex: "1" }}
      ></div>
    </div>
  );
};

export default CrashGraph;
