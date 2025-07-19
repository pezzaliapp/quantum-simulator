
function loadExperiment(type) {
  const area = document.getElementById("experimentArea");
  area.innerHTML = "";

  if (type === "doubleSlit") {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 200;
    area.appendChild(canvas);
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

  if (type === "spinWheel") {
    const wrapper = document.createElement("div");
    wrapper.style.width = "200px";
    wrapper.style.height = "200px";
    wrapper.style.margin = "40px auto";
    wrapper.style.position = "relative";

    const wheel = document.createElement("div");
    wheel.style.width = "100%";
    wheel.style.height = "100%";
    wheel.style.border = "10px solid #4CAF50";
    wheel.style.borderRadius = "50%";
    wheel.style.transition = "transform 0.05s linear";
    wheel.style.position = "absolute";

    const arrow = document.createElement("div");
    arrow.style.width = "0";
    arrow.style.height = "0";
    arrow.style.borderLeft = "10px solid transparent";
    arrow.style.borderRight = "10px solid transparent";
    arrow.style.borderBottom = "20px solid #000";
    arrow.style.position = "absolute";
    arrow.style.top = "-30px";
    arrow.style.left = "calc(50% - 10px)";

    const directionLabel = document.createElement("p");
    directionLabel.style.textAlign = "center";
    directionLabel.style.fontSize = "18px";
    directionLabel.style.fontWeight = "bold";
    directionLabel.style.marginTop = "220px";

    wrapper.appendChild(wheel);
    wrapper.appendChild(arrow);
    area.appendChild(wrapper);
    area.appendChild(directionLabel);

    let angle = 0;
    let dir = 1;

    function updateLabel() {
      directionLabel.textContent = dir === 1 ? "↻ Direzione: Destra" : "↺ Direzione: Sinistra";
    }

    updateLabel();

    setInterval(() => {
      angle += dir * 10;
      if (Math.random() < 0.2) {
        dir *= -1;
        updateLabel();
      }
      wheel.style.transform = `rotate(${angle}deg)`;
    }, 100);
  }

  if (type === "probability") {
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

    area.appendChild(button);
    area.appendChild(stateBox);
    area.appendChild(result);
  }
}
