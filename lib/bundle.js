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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(2);

var UTIL = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DrawingArea = function () {
  function DrawingArea(canvas, ctx) {
    _classCallCheck(this, DrawingArea);

    this.canvas = canvas;
    this.ctx = ctx;
    this.h = 0;
    this.color = 'rgb(255,0,0)';
    this.stroke = 20;
    this.axes = 3;
    this.mirroring = false;
    this.init = this.init.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.incrementColor = this.incrementColor.bind(this);
    this.getMousePos = this.getMousePos.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.toggleMirroring = this.toggleMirroring.bind(this);
    this.bindEvents();
  }

  _createClass(DrawingArea, [{
    key: 'init',
    value: function init() {
      this.stage = new createjs.Stage(this.canvas);
      this.stage.setTransform(this.canvas.width / 2, this.canvas.height / 2);
      this.stage.scaleY = -1;
      this.stage.autoClear = false;
      this.stage.enableDOMEvents(true);
      createjs.Touch.enable(this.stage);
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
      this.color = UTIL.hslToRGB(this.h);
    }
  }, {
    key: 'getMousePos',
    value: function getMousePos(event) {
      var rect = this.canvas.getBoundingClientRect();
      return {
        x: this.stage.mouseX - this.canvas.width / 2,
        y: -this.stage.mouseY + this.canvas.height / 2
      };
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      var _getMousePos = this.getMousePos(event),
          x = _getMousePos.x,
          y = _getMousePos.y;

      this.oldPt = new createjs.Point(x, y);
      this.oldMidPt = this.oldPt.clone();
      this.stage.addEventListener("stagemousemove", this.handleMouseMove);
      // possibly add function call here, extract the drawing into a second function that can be called
      // both here and in the mouse move function so that when the user clicks it starts drawing before they move
    }
  }, {
    key: 'rotate',
    value: function rotate(x, y, n) {
      return {
        x: x * Math.cos(2 * n * Math.PI / this.axes) - y * Math.sin(2 * n * Math.PI / this.axes),
        y: x * Math.sin(2 * n * Math.PI / this.axes) + y * Math.cos(2 * n * Math.PI / this.axes)
      };
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
        var _rotate = this.rotate(this.midPt.x, this.midPt.y, i),
            x1 = _rotate.x,
            y1 = _rotate.y;

        var _rotate2 = this.rotate(this.oldPt.x, this.oldPt.y, i),
            x2 = _rotate2.x,
            y2 = _rotate2.y;

        var _rotate3 = this.rotate(this.oldMidPt.x, this.oldMidPt.y, i),
            x3 = _rotate3.x,
            y3 = _rotate3.y;

        this.drawingCanvas.graphics.setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(x1, y1).curveTo(x2, y2, x3, y3);
        if (this.mirroring) {
          this.drawingCanvas.graphics.setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(-x1, -y1).curveTo(-x2, -y2, -x3, -y3);
        }
      }

      this.oldPt.x = mouseX;
      this.oldPt.y = mouseY;

      this.oldMidPt.x = this.midPt.x;
      this.oldMidPt.y = this.midPt.y;

      this.incrementColor();
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
      this.stage.removeAllChildren();
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
      };
    }
  }, {
    key: 'toggleMirroring',
    value: function toggleMirroring() {
      this.mirroring = !this.mirroring;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      document.getElementById('clear-button').onclick = this.clearCanvas;
      document.getElementById('line-width').oninput = this.update("stroke");
      document.getElementById('num-axes').oninput = this.update("axes");
      document.getElementById('mirroring').onchange = this.toggleMirroring;
    }
  }]);

  return DrawingArea;
}();

exports.default = DrawingArea;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _drawing_area = __webpack_require__(0);

var _drawing_area2 = _interopRequireDefault(_drawing_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createjs = window.createjs;

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("main-canvas");
  var ctx = canvas.getContext("2d");

  new _drawing_area2.default(canvas, ctx).init();
});

/***/ }),
/* 2 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map