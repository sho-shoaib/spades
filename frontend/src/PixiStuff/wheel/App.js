import * as PIXI from "pixi.js";
import { MainScene } from "./MainScene";
import TWEEN from "@tweenjs/tween.js";

let segments = 30;

export class App {
  run() {
    // this.app.view has the canvas created by PIXI.Application()
    window.onload = () => {
      this.app = new PIXI.Application({ resizeTo: window });
      document
        .getElementById("wheel-canvas-container")
        .appendChild(this.app.view);
      this.start();
    };
  }

  start() {
    this.scene = new MainScene();
    this.app.stage.addChild(this.scene.container);
    this.app.ticker.add(() => {
      TWEEN.update();
    });
  }
}
