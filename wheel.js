
let canvas = document.getElementById("quantumWheel");
let ctx = canvas.getContext("2d");
let angle = 0;
let spinning = false;

function drawWheel(currentAngle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, 0, Math.PI, false);
    ctx.fillStyle = "magenta";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, Math.PI, Math.PI * 2, false);
    ctx.fillStyle = "lime";
    ctx.fill();

    // draw pointer
    ctx.beginPath();
    ctx.moveTo(150, 0);
    ctx.lineTo(145, 20);
    ctx.lineTo(155, 20);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(currentAngle);
    ctx.restore();
}

function spinWheel() {
    if (spinning) return;
    spinning = true;
    let start = Date.now();
    let duration = 2000;
    let resultText = document.getElementById("risultato");

    function animate() {
        let now = Date.now();
        let elapsed = now - start;
        angle += 0.2;
        drawWheel(angle);
        if (elapsed < duration) {
            requestAnimationFrame(animate);
        } else {
            let outcome = Math.random() < 0.5 ? "Spin Up" : "Spin Down";
            resultText.textContent = "Risultato: " + outcome;
            spinning = false;
        }
    }

    animate();
}

drawWheel(angle);
