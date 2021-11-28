const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.controls__color');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');

const INITIAL_COLOR = '#2c2c2c';
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let fill = false;
let brushColor = INITIAL_COLOR;

const stopPainting = () => (painting = false);
const startPainting = () => (painting = true);

if (canvas) {
  canvas.addEventListener('mousemove', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  });
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}

colors.forEach((color) => {
  color.addEventListener('click', (event) => {
    brushColor = event.target.style.backgroundColor;
    ctx.strokeStyle = brushColor;
  });
});

range.addEventListener('change', (event) => {
  ctx.lineWidth = event.target.value;
});

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
