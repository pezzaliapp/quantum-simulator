
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
let resultText = document.getElementById('resultText');

function drawWheel(angle) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.arc(100, 100, 100, 0, Math.PI, false);
  ctx.fillStyle = '#ff00ff';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.arc(100, 100, 100, Math.PI, 2 * Math.PI, false);
  ctx.fillStyle = '#00ff00';
  ctx.fill();

  ctx.strokeStyle = '#000000';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.lineTo(100, 200);
  ctx.strokeStyle = '#000';
  ctx.stroke();
}

let angle = 0;
drawWheel(angle);

function spinWheel() {
  let spinTime = 2000 + Math.random() * 1000;
  let start = null;
  let currentAngle = 0;

  function animate(timestamp) {
    if (!start) start = timestamp;
    let elapsed = timestamp - start;
    let progress = Math.min(elapsed / spinTime, 1);
    currentAngle = progress * 6 * Math.PI;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(100, 100);
    ctx.rotate(currentAngle);
    ctx.translate(-100, -100);
    drawWheel(currentAngle);
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const angleDeg = (currentAngle * 180 / Math.PI) % 360;
      const result = angleDeg < 180 ? 'Spin Up' : 'Spin Down';
      resultText.textContent = `Risultato: ${result}`;
    }
  }

  requestAnimationFrame(animate);
}
