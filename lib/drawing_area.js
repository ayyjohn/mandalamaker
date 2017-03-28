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
    this.axes = 7;
    this.mirroring = false;
    this.clearCanvas = this.clearCanvas.bind(this);
    this.bindEvents();
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
      this.h += 0.004;
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
    this.stage.addEventListener("stagemousemove", this.handleMouseMove);
    // possibly add function call here, extract the drawing into a second function that can be called
    // both here and in the mouse move function so that when the user clicks it starts drawing before they move
  }

  rotate(x, y, n) {
    return {
      x: x * Math.cos(2 * n * Math.PI / this.axes) - y * Math.sin(2 * n * Math.PI / this.axes),
      y: x * Math.sin(2 * n * Math.PI / this.axes) + y * Math.cos(2 * n * Math.PI / this.axes)
    };
  }

  handleMouseMove(event) {
    let createjs = window.createjs;
    // >> 1 is the same as Math.floor(n / 2);
    let { x: mouseX, y: mouseY } = this.getMousePos(event);
    this.midPt = new createjs.Point(this.oldPt.x + mouseX >> 1, this.oldPt.y + mouseY >> 1);
    this.drawingCanvas.graphics.clear();
    for (let i = 1; i < this.axes + 1; i++) {
      let { x: x1, y: y1 } = this.rotate(this.midPt.x, this.midPt.y, i);
      let { x: x2, y: y2 } = this.rotate(this.oldPt.x, this.oldPt.y, i);
      let { x: x3, y: y3 } = this.rotate(this.oldMidPt.x, this.oldMidPt.y, i);
      this.drawingCanvas.graphics.setStrokeStyle(this.stroke, 'round', 'round')
      .beginStroke(this.color)
      .moveTo(x1, y1)
      .curveTo(x2, y2, x3, y3);
      if (this.mirroring) {
        this.drawingCanvas.graphics.setStrokeStyle(this.stroke, 'round', 'round')
        .beginStroke(this.color)
        .moveTo(-x1, -y1)
        .curveTo(-x2, -y2, -x3, -y3);
      }
    }

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

  clearCanvas() {
    console.log(this.stage);
    this.stage.clear();
    this.stage.removeAllChildren();
    console.log(this.stage);
    // this.stage.update();
    this.init();
    this.stage.update();
  }


  update(field) {
    return (event) => {
      this[field] = event.currentTarget.value;
    };
  }

  bindEvents() {
    $('#clear-button').click(this.clearCanvas);
  }
}

export default DrawingArea;
