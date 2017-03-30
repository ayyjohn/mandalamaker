import DrawingArea from './drawing_area';
import GuidelineCanvas from './guideline_canvas';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");

  new DrawingArea(canvas).init();
  // new GuidelineCanvas(canvas).init();
});
