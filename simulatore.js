
function changeSimulation() {
  const sim = document.getElementById("simSelect").value;
  const container = document.getElementById("simContainer");
  container.innerHTML = "";

  if (sim === "doubleSlit") {
    runDoubleSlit(container);
  } else if (sim === "spinWheel") {
    runSpinWheel(container);
  } else if (sim === "probability") {
    runProbability(container);
  }
}

function runDoubleSlit(container) {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 200;
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let t = 0;
  function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x++) {
      const wave1 = Math.sin((x + t) * 0.05);
      const wave2 = Math.sin((x - t) * 0.05);
      const intensity = Math.floor(128 + 127 * (wave1 + wave2) / 2);
      ctx.fillStyle = `rgb(${intensity},${intensity},255)`;
      ctx.fillRect(x, 50, 1, 100);
    }
    t += 2;
    requestAnimationFrame(draw);
  }
  draw();
}

function runSpinWheel(container) {
  const wheel = document.createElement("div");
  wheel.style.width = "150px";
  wheel.style.height = "150px";
  wheel.style.border = "8px solid #4CAF50";
  wheel.style.borderRadius = "50%";
  wheel.style.margin = "50px auto";
  wheel.style.transition = "transform 0.1s linear";
  container.appendChild(wheel);

  let angle = 0;
  let dir = 1;

  setInterval(() => {
    angle += dir * 15;
    if (Math.random() < 0.2) dir *= -1;
    wheel.style.transform = `rotate(${angle}deg)`;
  }, 100);
}

function runProbability(container) {
  const result = document.createElement("p");
  result.style.fontSize = "20px";
  result.style.fontWeight = "bold";
  result.style.color = "#333";

  const button = document.createElement("button");
  button.textContent = "🎲 Lancia particella";
  button.style.fontSize = "18px";
  button.style.padding = "10px 20px";
  button.style.marginTop = "20px";

  const stateBox = document.createElement("div");
  stateBox.style.width = "100px";
  stateBox.style.height = "100px";
  stateBox.style.margin = "20px auto";
  stateBox.style.border = "3px dashed #555";

  button.onclick = () => {
    const r = Math.random();
    if (r < 0.3) {
      result.textContent = "🟢 Stato |0⟩ rilevato (30%)";
      stateBox.style.backgroundColor = "#4CAF50";
    } else if (r < 0.8) {
      result.textContent = "🔵 Stato |1⟩ rilevato (50%)";
      stateBox.style.backgroundColor = "#2196F3";
    } else {
      result.textContent = "⚫ Superposizione persa (20%)";
      stateBox.style.backgroundColor = "#999";
    }
  };

  container.appendChild(button);
  container.appendChild(stateBox);
  container.appendChild(result);
}

window.onload = () => changeSimulation();
