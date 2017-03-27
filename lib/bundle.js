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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DrawingArea = function () {
  function DrawingArea(canvas, ctx) {
    _classCallCheck(this, DrawingArea);

    this.canvas = canvas;
    this.ctx = ctx;
    this.color = "#00AAFF";
    this.stroke = 20;
    this.init = this.init.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  _createClass(DrawingArea, [{
    key: "init",
    value: function init() {
      var createjs = window.createjs;
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
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      var createjs = window.createjs;
      this.oldPt = new createjs.Point(this.stage.mouseX, this.stage.mouseY);
      this.oldMidPt = this.oldPt.clone();
      this.stage.addEventListener("stagemousemove", this.handleMouseMove);
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      var createjs = window.createjs;
      this.midPt = new createjs.Point(this.oldPt.x + this.stage.mouseX >> 1, this.oldPt.y + this.stage.mouseY >> 1);
      this.drawingCanvas.graphics.clear().setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(this.midPt.x, this.midPt.y).curveTo(this.oldPt.x, this.oldPt.y, this.oldMidPt.x, this.oldMidPt.y);
      this.oldPt.x = this.stage.mouseX;
      this.oldPt.y = this.stage.mouseY;

      this.oldMidPt.x = this.midPt.x;
      this.oldMidPt.y = this.midPt.y;

      this.stage.update();
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(event) {
      this.stage.removeEventListener("stagemousemove", this.handleMouseMove);
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map