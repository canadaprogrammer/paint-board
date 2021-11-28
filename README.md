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

#### Draw Stroke

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

- `CanvasRenderingContext2D.fillRect(x, y, width, height)`

  - This method draws a rectangle that is filled according to the current `fillStyle`.

  - This method draws directly to the canvas without modifying the current path, so any subsequent `fill()` or `stroke()` calls will have no effect on it.

- `CanvasRenderingContext2D.fillStyle`

  - The property specifies the color, gradient, or pattern to use inside shapes. The default style is `#000`.

  - color: A **DOMString** parsed as CSS color value.

  - gradient: A **CanvasGradient** object (a linear, or radial gradient).

    - `ctx.createLinearGradient(x0, y0, x1, y1);`
    - `CanvasGradient.addColorStop(offset, color)`

      - ```js
        // create a linear gradient
        // start point (0, 0), end point(200, 0)
        let gradient = ctx.createLinearGradient(0, 0, 200, 0);

        // Add color stops
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(0.7, 'white');
        gradient.addColorStop(1, 'pink');
        ctx.fillStyle = gradient;
        ctx.fillRect(10, 10, 200, 100);
        ```

  - A **CanvasPattern** object (a repeating image);

    - `ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);`

    - ```js
      // Create a radial gradient
      // The start circle is at (110, 90), with radius=30
      // The end circle is at (100, 100), with radius=70
      let gradient = ctx.createRadialGradient(110, 90, 30, 100, 100, 70);

      // Add color stops
      gradient.addColorStop(0, 'pink');
      gradient.addColorStop(0.9, 'white');
      gradient.addColorStop(1, 'green');

      // Set the fill style and draw a rectangle
      ctx.fillStyle = gradient;
      ctx.fillRect(20, 20, 160, 160);
      ```

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

#### Change Stroke Style

- change the color

  - ```js
    let brashColor = INITIAL_COLOR;

    colors.forEach((color) => {
      color.addEventListener('click', (event) => {
        brushColor = event.target.style.backgroundColor;
        ctx.strokeStyle = brushColor;
      });
    });
    ```

- change the line width

  - ```js
    range.addEventListener('change', (event) => {
      ctx.lineWidth = event.target.value;
    });
    ```

#### Fill the Canvas

- ```js
  ctx.fillStyle = INITIAL_COLOR;

  let fill = false;

  mode.addEventListener('click', (event) => {
    const currentMode = mode.innerText;
    if (currentMode === 'FILL') {
      mode.innerText = 'STROKE';
      fill = true;
    } else {
      mode.innerText = 'FILL';
      fill = false;
    }
  });

  canvas.addEventListener('click', () => {
    if (fill) {
      ctx.fillStyle = brushColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  });
  ```
