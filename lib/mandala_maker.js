import DrawingArea from './drawing_area';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");

  new DrawingArea(canvas).init();
});
