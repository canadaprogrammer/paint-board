# Build Paint Board with Vanilla JS

## Canvas

### HTML Canvas Element

- Drawing graphics and animations

- Attributes

  - height: The height of the coordinate space in CSS pixels. Defaults to 150.

  - width: The width of the coordinate space in CSS pixels. Defaults to 300.

- ```html
  <canvas id="jsCanvas" class="canvas" width="500" height="700"></canvas>
  ```

### Canvas Scripting API

- The Canvas API provides a means for drawing graphics via Javascript and the HTML `<canvas>` element. Among other things, it can be used for animation, game graphics, data visualization, photo manipulation.

- `HTMLCanvasElement.getContext()`

  - This method gets that element's context - the think onto which the drawing will be rendered.

- The actual drawing is done using the CanvasRenderingContext2D interface.

- `CanvasRenderingContext2D.beginPath()`

  - Starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.

- `CanvasRenderingContext2D.closePath()`

  - Causes the point of the pen to move back to the start of the current sub-path. If the shape has already been closed or has only one point, this function does nothing.

- `CanvasRenderingContext2D.moveTo(x, y)`

  - Moves the starting point of a new sub-path to the (x, y) coordinates.

- `CanvasRenderingContext2D.lineTo(x, y)`

  - Connects the last point in the current sub-path to the specified (x, y) coordinates with a straight line.

- `CanvasRenderingContext2D.stroke()`

  - Strokes the current sub-paths with the current stroke style.

- ```js
  const canvas = document.querySelector('#jsCanvas');
  const ctx = canvas.getContext('2d');

  // initial styles
  ctx.strokeStyle = '#2c2c2c';
  ctx.lineWidth = 2.5;

  let painting = false;

  const stopPainting = () => (painting = false);
  const startPainting = () => (painting = true);

  if (canvas) {
    canvas.addEventListener('mousemove', (event) => {
      // get the mouse location
      const x = event.offsetX;
      const y = event.offsetY;

      if (!painting) {
        // start point, but not drawing
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        // start drawing
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    });
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
  }
  ```
