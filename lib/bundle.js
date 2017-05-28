/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var hslToRGB = exports.hslToRGB = function hslToRGB(h) {
  var s = 1;
  var l = .50;
  var hueToRGB = function hueToRGB(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  };

  var q = l + s - l * s;
  var p = 2 * l - q;
  var r = hueToRGB(p, q, h + 1 / 3);
  var g = hueToRGB(p, q, h);
  var b = hueToRGB(p, q, h - 1 / 3);
  return "rgb(" + Math.round(r * 255) + ", " + Math.round(g * 255) + ", " + Math.round(b * 255) + ")";
};

var rotate = exports.rotate = function rotate(x, y, n, axes) {
  return {
    x: x * Math.cos(2 * n * Math.PI / axes) - y * Math.sin(2 * n * Math.PI / axes),
    y: x * Math.sin(2 * n * Math.PI / axes) + y * Math.cos(2 * n * Math.PI / axes)
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var MathUtil = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DrawingArea = function () {
  function DrawingArea(canvas) {
    _classCallCheck(this, DrawingArea);

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
    this.saveImage = this.saveImage.bind(this);
    this.bindEvents();
    document.onwebkitfullscreenchange = this.toggleFullScreen;
  }

  _createClass(DrawingArea, [{
    key: 'init',
    value: function init() {
      this.stage = new createjs.Stage(this.canvas);
      createjs.Touch.enable(this.stage);
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
  }, {
    key: 'incrementColor',
    value: function incrementColor() {
      if (this.h < 1) {
        this.h += 0.005;
      } else {
        this.h = 0;
      }
      this.color = MathUtil.hslToRGB(this.h);
      document.getElementById('current-color').style.backgroundColor = this.color;
    }
  }, {
    key: 'getMousePos',
    value: function getMousePos(event) {
      var rect = this.canvas.getBoundingClientRect();
      return {
        x: this.stage.mouseX - this.canvas.width / 2,
        y: -this.stage.mouseY - 2 + this.canvas.height / 2
      };
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      var _getMousePos = this.getMousePos(event),
          mouseX = _getMousePos.x,
          mouseY = _getMousePos.y;

      this.oldPt = new createjs.Point(mouseX, mouseY);
      this.oldMidPt = this.oldPt.clone();

      for (var i = 1; i < this.axes + 1; i++) {
        var _MathUtil$rotate = MathUtil.rotate(mouseX, mouseY, i, this.axes),
            x1 = _MathUtil$rotate.x,
            y1 = _MathUtil$rotate.y;

        this.drawingCanvas.graphics.setStrokeStyle(1).beginStroke(this.color).beginFill(this.color).drawCircle(x1, y1, this.stroke >> 1);
        if (this.mirroring) {
          this.drawingCanvas.graphics.setStrokeStyle(1).beginStroke(this.color).beginFill(this.color).drawCircle(-x1, y1, this.stroke >> 1);
        }
      }
      if (this.rainbow) {
        this.incrementColor();
      }
      this.stage.addEventListener("stagemousemove", this.handleMouseMove);
      this.stage.update();
      // possibly add function call here, extract the drawing into a second function that can be called
      // both here and in the mouse move function so that when the user clicks it starts drawing before they move
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      var createjs = window.createjs;
      // >> 1 is the same as Math.floor(n / 2);

      var _getMousePos2 = this.getMousePos(event),
          mouseX = _getMousePos2.x,
          mouseY = _getMousePos2.y;

      this.midPt = new createjs.Point(this.oldPt.x + mouseX >> 1, this.oldPt.y + mouseY >> 1);
      this.drawingCanvas.graphics.clear();
      for (var i = 1; i < this.axes + 1; i++) {
        var _MathUtil$rotate2 = MathUtil.rotate(this.midPt.x, this.midPt.y, i, this.axes),
            x1 = _MathUtil$rotate2.x,
            y1 = _MathUtil$rotate2.y;

        var _MathUtil$rotate3 = MathUtil.rotate(this.oldPt.x, this.oldPt.y, i, this.axes),
            x2 = _MathUtil$rotate3.x,
            y2 = _MathUtil$rotate3.y;

        var _MathUtil$rotate4 = MathUtil.rotate(this.oldMidPt.x, this.oldMidPt.y, i, this.axes),
            x3 = _MathUtil$rotate4.x,
            y3 = _MathUtil$rotate4.y;

        this.drawingCanvas.graphics.setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(x1, y1).curveTo(x2, y2, x3, y3);
        if (this.mirroring) {
          this.drawingCanvas.graphics.setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(-x1, y1).curveTo(-x2, y2, -x3, y3);
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
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(event) {
      this.stage.removeEventListener("stagemousemove", this.handleMouseMove);
    }
  }, {
    key: 'clearCanvas',
    value: function clearCanvas() {
      this.stage.clear();
      this.stage.removeChildAt(this.stage.children.length - 1);
      this.drawingCanvas = new createjs.Shape();
      this.stage.addChild(this.drawingCanvas);
      this.stage.update();
    }
  }, {
    key: 'update',
    value: function update(field) {
      var _this = this;

      return function (event) {
        _this[field] = event.currentTarget.value;
        if (field === 'stroke') {
          _this.updateWidthDisplay();
        }
        if (field === 'axes') {
          if (event.currentTarget.value >= 100) {
            _this.axes = 100;
            console.log(document.getElementById('num-axes').value);
            document.getElementById('num-axes').value = _this.axes;
          }
        }
      };
    }
  }, {
    key: 'updateWidthDisplay',
    value: function updateWidthDisplay() {
      document.getElementById('line-width-value').innerHTML = this.stroke;
    }
  }, {
    key: 'changeRotations',
    value: function changeRotations(sign) {
      var _this2 = this;

      return function () {
        if (sign === "+") {
          if (_this2.axes < 100) {
            _this2.axes++;
          }
        } else {
          if (_this2.axes > 0) _this2.axes--;
        }
        document.getElementById('num-axes').value = _this2.axes;
      };
    }
  }, {
    key: 'toggle',
    value: function toggle(field) {
      var _this3 = this;

      return function () {
        _this3[field] = !_this3[field];
      };
    }
  }, {
    key: 'toggleRainbow',
    value: function toggleRainbow() {
      document.getElementById('rainbow').checked = !this.rainbow;
      this.rainbow = !this.rainbow;
      this.incrementColor();
    }
  }, {
    key: 'toggleColor',
    value: function toggleColor() {
      var _this4 = this;

      return function (event) {
        _this4.rainbow = false;
        document.getElementById('rainbow').checked = false;
        _this4.color = event.target.style.backgroundColor;
        document.getElementById('current-color').style.backgroundColor = _this4.color;
      };
    }
  }, {
    key: 'enterFullscreen',
    value: function enterFullscreen() {
      document.getElementById('main').webkitRequestFullscreen();
    }
  }, {
    key: 'toggleFullScreen',
    value: function toggleFullScreen() {
      if (this.fullscreen) {
        this.canvas.height = 560;
        this.canvas.width = 560;
        this.init();
        document.getElementById('download-button').style.display = "block";
      } else {
        this.canvas.height = screen.height - 50;
        this.canvas.width = screen.height - 50;
        document.getElementById('download-button').style.display = "none";
        this.init();
      }

      this.fullscreen = !this.fullscreen;
    }
  }, {
    key: 'fillCanvas',
    value: function fillCanvas() {
      document.getElementById('canvas').style.backgroundColor = this.color;
    }
  }, {
    key: 'saveImage',
    value: function saveImage(event) {
      var img = this.canvas.toDataURL('image/jpeg');
      event.currentTarget.href = img;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
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
      document.getElementById('download-button').onclick = this.saveImage;
    }
  }]);

  return DrawingArea;
}();

exports.default = DrawingArea;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GuidelineCanvas = function () {
  function GuidelineCanvas(canvas) {
    _classCallCheck(this, GuidelineCanvas);

    this.canvas = canvas;
    this.color = '#d3d3d3';
    this.axes = 3;
    this.mirroring = false;
    this.guideLinesOn = true;
    this.toggleMirroring = this.toggleMirroring.bind(this);
    this.updateGuideLines = this.updateGuideLines.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.bindEvents();
  }

  _createClass(GuidelineCanvas, [{
    key: 'init',
    value: function init() {
      this.stage = new createjs.Stage(this.canvas);
      this.stage.setTransform(this.canvas.width / 2, this.canvas.height / 2);
      this.stage.scaleY = -1;
      this.stage.autoClear = false;
      this.stage.enableDOMEvents(true);
      this.drawingCanvas = new createjs.Shape();
      console.log(this.stage.children);
      this.stage.addChild(this.drawingCanvas);
      console.log(this.stage.children);
      this.updateGuideLines();
      this.stage.update();
    }
  }, {
    key: 'clearCanvas',
    value: function clearCanvas() {
      // this.stage.clear();
      // this.stage.removeAllChildren();
      this.drawingCanvas = new createjs.Shape();
      this.stage.addChild(this.drawingCanvas);
      this.updateGuideLines();
      this.stage.update();
      console.log(this.stage.children);
    }
  }, {
    key: 'updateGuideLines',
    value: function updateGuideLines() {
      this.stage.removeAllChildren();
      if (this.guideLinesOn) {
        for (var i = 1; i < this.axes + 1; i++) {
          var _rotate = (0, _util.rotate)(0, 0, i, this.axes),
              x1 = _rotate.x,
              y1 = _rotate.y;

          var _rotate2 = (0, _util.rotate)(0, 500, i, this.axes),
              x2 = _rotate2.x,
              y2 = _rotate2.y;

          this.drawingCanvas.graphics.setStrokeStyle(2, 'round').beginStroke('#d3d3d3').moveTo(x1, y1).lineTo(x2, y2);
          if (this.mirroring) {
            this.drawingCanvas.graphics.setStrokeStyle(2, 'round').beginStroke('#d3d3d3').moveTo(x1, y1).lineTo(x2, -y2);
          }
        }
        this.stage.update();
      }
    }
  }, {
    key: 'update',
    value: function update(field) {
      var _this = this;

      return function (event) {
        _this[field] = event.currentTarget.value;
        _this.clearCanvas();
        _this.updateGuideLines();
      };
    }
  }, {
    key: 'toggleMirroring',
    value: function toggleMirroring() {
      this.mirroring = !this.mirroring;
      this.clearCanvas();
      this.updateGuideLines();
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      document.getElementById('clear-button').onclick = this.clearCanvas;
      document.getElementById('mirroring').onchange = this.toggleMirroring;
      document.getElementById('num-axes').oninput = this.update("axes");
    }
  }]);

  return GuidelineCanvas;
}();

exports.default = GuidelineCanvas;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _drawing_area = __webpack_require__(1);

var _drawing_area2 = _interopRequireDefault(_drawing_area);

var _guideline_canvas = __webpack_require__(2);

var _guideline_canvas2 = _interopRequireDefault(_guideline_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");

  new _drawing_area2.default(canvas).init();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map