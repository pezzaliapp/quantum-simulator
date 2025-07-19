const canvas = document.getElementById("probCanvas");
const ctx = canvas.getContext("2d");
let y = canvas.height;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const prob = Math.exp(-(canvas.height - y) * 0.05);  // simulazione funzione d'onda
    ctx.fillStyle = `rgba(0, 255, 255, ${prob})`;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, y, 10, 0, 2 * Math.PI);
    ctx.fill();

    y -= 1;
    if (y <= 0) y = canvas.height;

    requestAnimationFrame(animate);
}
animate();
