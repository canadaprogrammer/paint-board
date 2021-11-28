const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

let painting = false;

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
