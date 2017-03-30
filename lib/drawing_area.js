import * as MathUtil from './util';

class DrawingArea {

  constructor(canvas) {
    this.canvas = canvas;
    this.h = 0;
    this.color = 'rgb(255,0,0)';
    this.stroke = 10;
    this.axes = 10;
    this.mirroring = true;
    this.rainbow = true;
    this.fullscreen = false;
    this.init = this.init.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.incrementColor = this.incrementColor.bind(this);
    this.getMousePos = this.getMousePos.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleRainbow = this.toggleRainbow.bind(this);
    this.updateWidthDisplay = this.updateWidthDisplay.bind(this);
    this.enterFullscreen = this.enterFullscreen.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.fillCanvas = this.fillCanvas.bind(this);
    this.changeRotations = this.changeRotations.bind(this);
    this.bindEvents();
    document.addEventListener("webkitfullscreenchange", this.toggleFullScreen);
  }

  init() {
    this.stage = new createjs.Stage(this.canvas);
    this.stage.setTransform(this.canvas.width / 2, this.canvas.height / 2);
    this.stage.scaleY = -1;
    this.stage.autoClear = false;
    this.stage.enableDOMEvents(true);
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
    this.color = MathUtil.hslToRGB(this.h);
    document.getElementById('current-color').style.backgroundColor = this.color;
  }

  getMousePos(event) {
    let rect = this.canvas.getBoundingClientRect();
    return {
      x: this.stage.mouseX - this.canvas.width / 2,
      y: (-this.stage.mouseY - 2 + this.canvas.height / 2)
    };
  }

  handleMouseDown(event) {
    let { x: mouseX, y: mouseY } = this.getMousePos(event);
    this.oldPt = new createjs.Point(mouseX, mouseY);
    this.oldMidPt = this.oldPt.clone();

    for (let i = 1; i < this.axes + 1; i++) {
      let { x: x1, y: y1 } = MathUtil.rotate(mouseX, mouseY, i, this.axes);
      this.drawingCanvas.graphics.setStrokeStyle(1)
      .beginStroke(this.color)
      .beginFill(this.color)
      .drawCircle(x1, y1, this.stroke >> 1);
      if (this.mirroring) {
        this.drawingCanvas.graphics.setStrokeStyle(1)
        .beginStroke(this.color)
        .beginFill(this.color)
        .drawCircle(-x1, y1, this.stroke >> 1);
      }
    }
    this.incrementColor();
    this.stage.addEventListener("stagemousemove", this.handleMouseMove);
    this.stage.update();
    // possibly add function call here, extract the drawing into a second function that can be called
    // both here and in the mouse move function so that when the user clicks it starts drawing before they move
  }

  handleMouseMove(event) {
    let createjs = window.createjs;
    // >> 1 is the same as Math.floor(n / 2);
    let { x: mouseX, y: mouseY } = this.getMousePos(event);
    this.midPt = new createjs.Point(this.oldPt.x + mouseX >> 1, this.oldPt.y + mouseY >> 1);
    this.drawingCanvas.graphics.clear();
    for (let i = 1; i < this.axes + 1; i++) {
      let { x: x1, y: y1 } = MathUtil.rotate(this.midPt.x, this.midPt.y, i, this.axes);
      let { x: x2, y: y2 } = MathUtil.rotate(this.oldPt.x, this.oldPt.y, i, this.axes);
      let { x: x3, y: y3 } = MathUtil.rotate(this.oldMidPt.x, this.oldMidPt.y, i, this.axes);
      this.drawingCanvas.graphics.setStrokeStyle(this.stroke, 'round', 'round')
      .beginStroke(this.color)
      .moveTo(x1, y1)
      .curveTo(x2, y2, x3, y3);
      if (this.mirroring) {
        this.drawingCanvas.graphics.setStrokeStyle(this.stroke, 'round', 'round')
        .beginStroke(this.color)
        .moveTo(-x1, y1)
        .curveTo(-x2, y2, -x3, y3);
      }
    }

    this.oldPt.x = mouseX;
    this.oldPt.y = mouseY;

    this.oldMidPt.x = this.midPt.x;
    this.oldMidPt.y = this.midPt.y;

    if (this.rainbow) {
      this.incrementColor();
    }

    this.stage.update();
  }

  handleMouseUp(event) {
    this.stage.removeEventListener("stagemousemove", this.handleMouseMove);
  }

  clearCanvas() {
    this.stage.clear();
    this.stage.removeChildAt(this.stage.children.length - 1);
    this.drawingCanvas = new createjs.Shape();
    this.stage.addChild(this.drawingCanvas);
    this.stage.update();
  }

  update(field) {
    return event => {
      this[field] = event.currentTarget.value;
      if (field === 'stroke') {
        this.updateWidthDisplay();
      }
    };
  }

  updateWidthDisplay() {
    document.getElementById('line-width-value').innerHTML = this.stroke;
  }

  changeRotations(sign) {
    return () => {
      if (sign === "+") {
        this.axes ++;
      }
      else {
        if (this.axes > 0)
        this.axes --;
      }
      document.getElementById('num-axes').value = this.axes;
    };
  }

  toggle(field) {
    return () => {
      this[field] = !this[field];
    };
  }

  toggleRainbow() {
    document.getElementById('rainbow').checked = !this.rainbow;
    this.rainbow = !this.rainbow;
    this.incrementColor();
  }

  toggleColor() {
    return event => {
      this.rainbow = false;
      document.getElementById('rainbow').checked = false;
      this.color = event.target.style.backgroundColor;
      document.getElementById('current-color').style.backgroundColor = this.color;
    };
  }

  enterFullscreen() {
    document.getElementById('main').webkitRequestFullscreen();
  }

  toggleFullScreen() {
    if (this.fullscreen) {
      this.canvas.height = 560;
      this.canvas.width = 560;
      this.init();
    }
    else {
      this.canvas.height = screen.height + 200;
      this.canvas.width = screen.width - 100;
      this.init();
    }
    this.fullscreen = !this.fullscreen;
  }

  fillCanvas() {
    document.getElementById('canvas').style.backgroundColor = this.color;
  }

  bindEvents() {
    document.getElementById('clear-button').onclick = this.clearCanvas;
    document.getElementById('line-width').oninput = this.update("stroke");
    document.getElementById('num-axes').oninput = this.update("axes");
    document.getElementById('mirroring').onclick = this.toggle("mirroring");
    document.getElementById('rainbow').onclick = this.toggleRainbow;
    document.getElementById('color-palette').onclick = this.toggleColor();
    document.getElementById('fullscreen').onclick = this.enterFullscreen;
    document.getElementById('fill-button').onclick = this.fillCanvas;
    document.getElementById('decrease-rotations').onclick = this.changeRotations("-");
    document.getElementById('increase-rotations').onclick = this.changeRotations("+");
  }
}

export default DrawingArea;
