import * as UTIL from './util';

class DrawingArea {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.h = 0;
    this.color = 'rgb(255,0,0)';
    this.stroke = 20;
    this.init = this.init.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.incrementColor = this.incrementColor.bind(this);
    this.getMousePos = this.getMousePos.bind(this);
  }

  init() {
    let createjs = window.createjs;
    this.stage = new createjs.Stage(this.canvas);
    this.stage.setTransform(this.canvas.width / 2, this.canvas.height / 2);
    this.stage.scaleY = -1;
    this.stage.autoClear = false;
    this.stage.enableDOMEvents(true);
    createjs.Touch.enable(this.stage);
    createjs.Ticker.setFPS(24);
    this.drawingCanvas = new createjs.Shape();
    this.stage.addEventListener("stagemousedown", this.handleMouseDown);
    this.stage.addEventListener("stagemouseup", this.handleMouseUp);

    this.stage.addChild(this.drawingCanvas);
    this.stage.update();
  }

  incrementColor() {
    if (this.h < 1) {
      this.h += 0.005;
    }
    else {
      this.h = 0;
    }
    this.color = UTIL.hslToRGB(this.h);
  }

  getMousePos(event) {
    let rect = this.canvas.getBoundingClientRect();
    return {
      x: this.stage.mouseX - this.canvas.width / 2,
      y: (-this.stage.mouseY + this.canvas.height / 2)
    };
  }

  handleMouseDown(event) {
    let createjs = window.createjs;
    let { x, y } = this.getMousePos(event);
    this.oldPt = new createjs.Point(x, y);
    this.oldMidPt = this.oldPt.clone();
    console.log(this.oldPt);
    this.stage.addEventListener("stagemousemove", this.handleMouseMove);
  }

  handleMouseMove(event) {
    let createjs = window.createjs;
    // >> 1 is the same as Math.floor(n / 2);
    let { x: mouseX, y: mouseY } = this.getMousePos(event);
    this.midPt = new createjs.Point(this.oldPt.x + mouseX >> 1, this.oldPt.y + mouseY >> 1);
    console.log(this.oldPt);
    console.log(this.midPt);

    this.drawingCanvas.graphics.clear()
      .setStrokeStyle(this.stroke, 'round', 'round')
      .beginStroke(this.color).moveTo(this.midPt.x, this.midPt.y)
      .curveTo(this.oldPt.x, this.oldPt.y, this.oldMidPt.x, this.oldMidPt.y);

    this.oldPt.x = mouseX;
    this.oldPt.y = mouseY;

    this.oldMidPt.x = this.midPt.x;
    this.oldMidPt.y = this.midPt.y;

    this.incrementColor();
    this.stage.update();
  }

  handleMouseUp(event) {
    this.stage.removeEventListener("stagemousemove", this.handleMouseMove);
  }
}

export default DrawingArea;
