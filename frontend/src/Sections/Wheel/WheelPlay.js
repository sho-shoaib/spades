import React, { useEffect } from "react";
import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { MainScene } from "../../PixiStuff/wheel/MainScene";
import pinImg from "../../assets/wheel/wheel-pin.png";

const WheelPlay = ({}) => {
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

  let pin = new PIXI.Sprite(pinImg.texture);
  pin.x = 125;
  pin.y = 50;
  pin.anchor.set(0.5);

  let pinTexture = PIXI.Texture.from(pinImg);
  let pinSprite = new PIXI.Sprite(pinTexture);
  app.stage.addChild(pinSprite);
  let scene = new MainScene();

  pinSprite.height = 45;
  pinSprite.width = 30;
  pinSprite.x = 250;
  pinSprite.y = 110;
  pinSprite.zIndex = 200;
  pinSprite.anchor.set(0.5);
  console.log(pinSprite);

  app.stage.addChild(pin);
  app.stage.addChild(scene.container);

  // tween.to(
  //   {
  //     rotation: Math.PI / 0.07,
  //   },
  //   3200
  // );
  // tween.easing(TWEEN.Easing.Quadratic.Out);
  app.ticker.add(() => {
    TWEEN.update();
  });

  const startAnimation = () => {
    const tween = new TWEEN.Tween(scene.graphic);
    tween.to(
      {
        rotation: Math.PI / 0.07,
      },
      3200
    );
    tween.easing(TWEEN.Easing.Quadratic.Out);
    tween.start();
  };

  useEffect(() => {
    document.getElementById("wheel-container").appendChild(app.view);
  }, []);

  return (
    <>
      <button onClick={startAnimation}>spin</button>
      <div
        id='wheel-container'
        style={{ height: "100%", width: "100%" }}
        className='relative'
      ></div>
    </>
  );
};

export default WheelPlay;
