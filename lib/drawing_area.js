class DrawingArea {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.h = 0;
    this.color = 'rgb(255,0,0)';
    this.stroke = 20;
    this.init = this.init.bind(this);
    this.resetting = false;
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.incrementColor = this.incrementColor.bind(this);
  }

  init() {
    let createjs = window.createjs;
    this.stage = new createjs.Stage(this.canvas);
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
    this.color = this.hslToRGB(this.h);
  }

  hslToRGB(h) {
    let s = 1;
    let l = .50;
    let hueToRGB = (p, q, t) => {
      if (t < 0) { t += 1; }
      if (t > 1) { t -= 1; }
      if (t < 1/6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1/2) {
        return q;
      }
      if (t < 2/3) {
        return p + (q - p) * (2/3 - t) * 6;
      }
      return p;
    };

    let q = l + s - l * s;
    let p = 2 * l - q;
    let r = hueToRGB(p, q, h + 1/3);
    let g = hueToRGB(p, q, h);
    let b = hueToRGB(p, q, h - 1/3);
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  }

  handleMouseDown(event) {
    let createjs = window.createjs;
    this.oldPt = new createjs.Point(this.stage.mouseX, this.stage.mouseY);
    this.oldMidPt = this.oldPt.clone();
    this.stage.addEventListener("stagemousemove", this.handleMouseMove);
  }

  handleMouseMove(event) {
    let createjs = window.createjs;
    // >> 1 is the same as Math.floor(n / 2);
    this.midPt = new createjs.Point(this.oldPt.x + this.stage.mouseX >> 1, this.oldPt.y + this.stage.mouseY >> 1);
    this.drawingCanvas.graphics.clear().setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(this.midPt.x, this.midPt.y).curveTo(this.oldPt.x, this.oldPt.y, this.oldMidPt.x, this.oldMidPt.y);
    this.oldPt.x = this.stage.mouseX;
    this.oldPt.y = this.stage.mouseY;

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
