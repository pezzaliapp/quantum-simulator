const canvas = document.getElementById("fendituraCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    for (let i = 0; i < canvas.width; i++) {
        const y = 100 + 50 * Math.cos((i + x) * 0.05) * Math.sin((i + x) * 0.05);
        ctx.beginPath();
        ctx.arc(i, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
    }
    x += 1;
    requestAnimationFrame(draw);
}
draw();
