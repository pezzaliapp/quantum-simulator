const canvas = document.getElementById("ruota");
const ctx = canvas.getContext("2d");
const risultato = document.getElementById("risultato");

let angolo = 0;
let spinning = false;

function disegnaRuota() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const centroX = canvas.width / 2;
  const centroY = canvas.height / 2;
  const raggio = 100;

  // Spin Up
  ctx.beginPath();
  ctx.moveTo(centroX, centroY);
  ctx.arc(centroX, centroY, raggio, 0 + angolo, Math.PI + angolo);
  ctx.closePath();
  ctx.fillStyle = "magenta";
  ctx.fill();

  // Spin Down
  ctx.beginPath();
  ctx.moveTo(centroX, centroY);
  ctx.arc(centroX, centroY, raggio, Math.PI + angolo, 2 * Math.PI + angolo);
  ctx.closePath();
  ctx.fillStyle = "lime";
  ctx.fill();
}

function lanciaSpin() {
  if (spinning) return;
  spinning = true;
  let velocità = 0.2 + Math.random() * 0.1;
  let decelerazione = 0.005;

  const intervallo = setInterval(() => {
    angolo += velocità;
    velocità -= decelerazione;
    disegnaRuota();

    if (velocità <= 0) {
      clearInterval(intervallo);
      spinning = false;
      const esito = Math.sin(angolo % (2 * Math.PI)) > 0 ? "Spin Up" : "Spin Down";
      risultato.textContent = "Risultato: " + esito;
    }
  }, 20);
}

disegnaRuota();
