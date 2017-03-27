# Mandala Maker

## Background
Mandalas are geometrically satisfying art originating in Buddhism and Hinduism. They often incorporate symmetry and patterns in great circular pieces that take monks weeks to complete. However, with Mandala Maker you too can be an artist and create wonderful patterns using rotational symmetry. Personally, I struggle with art in that I can't make consistent lines so everything I draw comes out lopsided. With Mandala Maker you choose the amount of rotational symmetry you want, and then your lines are reflected over a number of axes creating beautiful symmetric art in seconds. Complex patterns like roses and atomic nuclei can be made in seconds. With a small amount of effort you too can create a digital masterpiece.

## Functionality and MVP

In this app users will have access to a medium sized window and can draw with their mouse. Users will also be able to

- [ ] change the color that they are drawing with. The default will cycle through rainbow colors as the mouse moves,
- [ ] change the width of cursor that they are drawing with
- [ ] change the number of rotational duplication axes
- [ ] clear the canvas

In addition this project will include
- [ ] an about section describing general purpose use
- [ ] a production README.md

## Architecture and Technologies

This project will be implemented using the following:
- Vanilla Javascript (ES2015) to handle logic and interactivity with the buttons
- easel.js (from create.js) and html5's ```<canvas>``` to handle the rendering of the actual drawing area
- webpack and webpack-dev-server to control bundling of scripts and allow for local testing

## Wireframe

![wireframe](https://s3-us-west-1.amazonaws.com/listentothis-dev/mandala_maker_wireframe.png)

Mandala Maker will consist of a single screen with a large canvas element and interactive controls. The user will be able to enter a line width and the number of rotations. Check boxes can toggle whether or not to mirror or have rainbow effects on the drawing, and the current color can be selected from a pallet if the rainbow is not enabled. A button will be available to clear the canvas. The whitespace will likely be taken up by an instruction/about box.

## Implementation Timeline

### Day 1
Discuss methods for implementation with the TAs. Would it be easier to set multiple draw lines based on the symmetry axes, or have one canvas that is re-created in a rotated orientation instead?
Set up all node modules including webpack and easelJS. Create a webpack config, package.json, and .gitignore. Create an entry file that makes a canvas on the main page, and have the ability to draw on it with a fixed color and width.

### Day 2
Spend the day cementing the basics of easel.js. Attempt to be able to draw multiple lines at once simply by adding more to the drawing. This will in the future be done dynamically based on the number of symmetry axes. Attempt to get symmetry axes to render based on a hard-coded in number. Add button to clear canvas instead of refreshing.

### Day 3
Work on the logic of drawing multiple lines at the same time possibly using polar coordinates based on the number of axes input by the user. Handle the logic of the graph needing to be centered at the middle rather than the default top left corner. Handle the ability to change line width, and drawing color.
Hopefully by the end of the day have the ability to draw with symmetricality.

### Day 4
Add user interactivity buttons and inputs for clearing, changing line width, and color/rainbow toggle. Add an instructional set based on questions from family/friends attempting to use it, address any questions raised by users. Style the page with general good css practices, make it look professional.
