import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics, settings } from "@pixi/graphics-smooth";

export class MainScene {
  constructor(segments) {
    this.container = new PIXI.Container();
    this.container.zIndex = -1;
    this.segments = segments;
    this.initiateGraphic();
  }

  initiateGraphic() {
    settings.PIXEL_LINE = 1;
    this.graphic = new Graphics();
    this.graphic.x = 250;
    this.graphic.y = 250;
    this.graphic.zIndex = -1;
    this.makeGraphics();
  }

  makeGraphics() {
    const makeAngle = (segments) => {
      let angleInDeg = 360 / segments;
      let angleInRad = (angleInDeg * Math.PI) / 180;
      return angleInRad;
    };

    const rad = makeAngle(this.segments);
    let startAngle;
    let endAngle;
    let fillColor;
    let arcColor;
    let arcEffectColor;
    let multiplier;
    this.anglesArr = [];

    const makeAnglesArr = (rad) => {
      for (let index = 1; index < this.segments + 1; index++) {
        if (index === 1) {
          startAngle = 0;
          endAngle = rad;
        } else if (index !== 1) {
          startAngle = endAngle;
          endAngle = endAngle + rad;
        }
        if (index % 2 === 0) {
          fillColor = 0x1e1f24;
        } else {
          fillColor = 0x24262b;
        }
        if ((index + 1) % 10 === 0) {
          arcColor = 0x579b0d;
          arcEffectColor = 0x467c0a;
          multiplier = 1.5;
        } else if (index % 5 === 0) {
          arcColor = 0xf6fbff;
          arcEffectColor = 0xc5c9cc;
          multiplier = 0.0;
        } else {
          arcColor = 0x6dbfff;
          arcEffectColor = 0x5799cc;
          multiplier = 1.2;
        }
        this.anglesArr.push({
          multiplier,
          startAngle,
          endAngle,
          fillColor,
          arcColor,
          arcEffectColor,
        });
      }
    };

    makeAnglesArr(rad);
    console.log(this.anglesArr);

    this.anglesArr.forEach((item) => {
      const { startAngle, endAngle, fillColor } = item;

      this.graphic.lineStyle(0, 0xffffff, 1);
      this.graphic.beginFill(fillColor);
      this.graphic.moveTo(0, 0);
      this.graphic.arc(0, 0, 120, startAngle, endAngle);
      this.graphic.lineTo(0, 0);
      this.graphic.endFill();
    });
    this.graphic.moveTo(115.5, 0);
    this.anglesArr.forEach((item) => {
      const { startAngle, endAngle, arcColor } = item;
      this.graphic.lineStyle(6, arcColor);
      this.graphic.arc(0, 0, 115.5, startAngle, endAngle);
    });
    this.graphic.moveTo(120, 0);
    this.anglesArr.forEach((item) => {
      const { startAngle, endAngle, arcEffectColor } = item;
      this.graphic.lineStyle(5, arcEffectColor);
      this.graphic.arc(0, 0, 120, startAngle, endAngle);
    });

    this.container.addChild(this.graphic);
  }
}
