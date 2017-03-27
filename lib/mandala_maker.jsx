import DrawingArea from './drawing_area';
import createjs from 'createjs-easeljs';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("main-canvas");
  const ctx = canvas.getContext("2d");

  new DrawingArea(canvas, ctx).init();
});
