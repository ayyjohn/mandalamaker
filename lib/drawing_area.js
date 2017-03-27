class DrawingArea {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.color = "#00AAFF";
    this.stroke = 20;
    this.init = this.init.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  init() {
    let createjs = window.createjs;
    debugger;
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

  handleMouseDown(event) {
    let createjs = window.createjs;
    this.oldPt = new createjs.Point(this.stage.mouseX, this.stage.mouseY);
    this.oldMidPt = this.oldPt.clone();
    this.stage.addEventListener("stagemousemove", this.handleMouseMove);
  }

  handleMouseMove(event) {
    let createjs = window.createjs;
    this.midPt = new createjs.Point(this.oldPt.x + this.stage.mouseX >> 1, this.oldPt.y + this.stage.mouseY >> 1);
    this.drawingCanvas.graphics.clear().setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(this.midPt.x, this.midPt.y).curveTo(this.oldPt.x, this.oldPt.y, this.oldMidPt.x, this.oldMidPt.y);
    this.oldPt.x = this.stage.mouseX;
    this.oldPt.y = this.stage.mouseY;

    this.oldMidPt.x = this.midPt.x;
    this.oldMidPt.y = this.midPt.y;

    this.stage.update();
  }

  handleMouseUp(event) {
    this.stage.removeEventListener("stagemousemove", this.handleMouseMove);
  }
}

export default DrawingArea;