# Mandala Maker
[Live Version](https://ayyjohn.github.io/mandalamaker/)

Mandala Maker is a simple and yet very satisfying drawing app. It uses rotational symmetry and mirroring to allow the user to draw multiple identical lines concurrently. For those who can't put pen to paper and create a masterpiece, Mandala Maker allows us to use the fact that humans love symmetry to make things that will catch everyone's eye. Mandala Maker was built using JavaScript and the EaselJS library from CreateJS to manipulate the HTML5 Canvas element.

## Features

* Rainbow cycling brush
* Control over amount of rotations and mirroring
* Control over brush size
* Fullscreen mode with extra large canvas
* Ability to choose a static color
* Ability to choose the canvas color

## Technologies Used

* JavaScript for control of the DOM and all dynamic drawing logic
* [EaselJS](http://www.createjs.com/easeljs) to create a smooth drawing interface
* HTML5 Canvas to create a basic area to draw on

## Feature Implementation Highlights

### Rainbow Cycling

<img src=https://s3-us-west-1.amazonaws.com/listentothis-dev/photos/general_demo.gif width="500" height="500" />

One of the main goals of this project is to make creating interesting drawings as easy as possible. Many users don't have good artistic sense for color combinations, and single color mandalas are boring and one dimensional. By making the brush cycle as the user draws even scribbles come out looking beautiful. One of the difficulties with this is that RGB does not work cyclically. The standard RGB input for color looks like rgb(r, g, b) where r, g, and b are variables that can be set between 0 and 255 where rgb(0, 0, 0) is black, rgb(255, 255, 255) is white, and most other colors are some combination in between. The problem with this is that there is no linear path through this to iterate through as the user moves the mouse. Instead, I used the HSL color scheme which stands for Hue, Saturation and Lighting. With constant S and L values, iterating over H from 0 to 1 will move through ROYGBIV. However, Easel's stroke function, which is how the brush strokes get drawn to the canvas, doesn't take HSL values, so I had to write a conversion from HSL to RGB using known equations. Once this was complete, cycling through rainbow values was as simple as incrementing and resetting the hue value.

```Javascript
export const hslToRGB = (h) => {
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
  return `rgb(
    ${Math.round(r * 255)},
    ${Math.round(g * 255)},
    ${Math.round(b * 255)}
  )`;
};
```

### Coordinate Conversion and Rotation

One of the most unintuitive parts of working with HTML5 Canvas is that its coordinate system follows similar patterns to two dimensional arrays in computer science. That is, the point (0, 0) is at the top left, and y increases downwards. This posed problems because the planned method for implementing the rotations was to, well, rotate, and rotation around an arbitrary point is much uglier and easier to mess up than rotating around the origin if the origin is centered. So, rather than make every conversion nasty and error prone, I translated and inverted the canvas.

```JavaScript
this.stage.setTransform(this.canvas.width / 2, this.canvas.height / 2);
this.stage.scaleY = -1;
```

This allowed the rotation to be as simple as possible

```JavaScript
export const rotate = (x, y, n, axes) => {
  return {
    x: x * Math.cos(2 * n * Math.PI / axes) - y * Math.sin(2 * n * Math.PI / axes),
    y: x * Math.sin(2 * n * Math.PI / axes) + y * Math.cos(2 * n * Math.PI / axes)
  };
};
```

however it posed a new problem in that the mouse clicks were then offset by the translation, and in addition drawing upwards made the lines move downwards, and vice versa. This was solved by implementing a second translation function that adjusted the click values, both by translation and y-inversion.

```Javascript
getMousePos(event) {
  let rect = this.canvas.getBoundingClientRect();
  return {
    x: this.stage.mouseX - this.canvas.width / 2,
    y: (-this.stage.mouseY - 2 + this.canvas.height / 2)
  };
}
```

## Personal Highlights

### Mr. Star
<img src=https://s3-us-west-1.amazonaws.com/listentothis-dev/photos/not_symmetry.png width="500" height="500"/>

### One Love One World
<img src=https://s3-us-west-1.amazonaws.com/listentothis-dev/photos/Screen+Shot+2017-03-30+at+8.58.49+PM.png width="500" height="500"/>

### The White Lotus Tile
<img src=https://s3-us-west-1.amazonaws.com/listentothis-dev/photos/Screen+Shot+2017-03-30+at+9.09.41+PM.png width="500" height="500"/>


## Future Plans

### Save/Share feature
It's nice to be able to share your creations. Eventually Mandala Maker will include a module at the bottom allowing you to save the drawing as a png/jpg file, or post it to social media sites like facebook and twitter.

### Improved Color Swatch
With more static options the user would be able to make much less clashing images by using smoother, more complementary colors rather than the default ROYGBIV. A larger swatch dropdown could be an option, or even sliders to adjust the H, S, and L values interactively.

### Toggleable Guide Lines
To increase the ease of visualizing exactly where the other lines will show up when you draw a second canvas could be overlaid on top of the first, and its job would be purely to draw lines spanning from the edges of the canvas to the origin. This would make it easier to do more complex designs where moving with more precise emphasis on pixels is important.
