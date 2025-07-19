let conteggi = [0, 0];
let probDestra = 0.5;

const ctx = document.getElementById('graficoProb').getContext('2d');
const grafico = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Spin Destra', 'Spin Sinistra'],
    datasets: [{
      label: 'Frequenza',
      data: conteggi,
      backgroundColor: ['#00FFBF', '#FF007F']
    }]
  },
  options: {
    animation: {
      duration: 800
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

document.getElementById("sliderDestra").addEventListener("input", function() {
  document.getElementById("valDestra").innerText = this.value;
  document.getElementById("valSinistra").innerText = (1 - parseFloat(this.value)).toFixed(2);
  document.getElementById("sliderSinistra").value = (1 - parseFloat(this.value));
});

document.getElementById("sliderSinistra").addEventListener("input", function() {
  document.getElementById("valSinistra").innerText = this.value;
  document.getElementById("valDestra").innerText = (1 - parseFloat(this.value)).toFixed(2);
  document.getElementById("sliderDestra").value = (1 - parseFloat(this.value));
});

function aggiornaProbabilita() {
  probDestra = parseFloat(document.getElementById("sliderDestra").value);
}

function lancia() {
  const particella = document.getElementById("particle");
  particella.style.display = "block";
  particella.style.top = "60%";
  particella.style.left = "50%";

  let y = 60;
  const interval = setInterval(() => {
    y -= 1;
    particella.style.top = y + "%";
    if (y <= 30) {
      clearInterval(interval);
      particella.style.display = "none";

      const r = Math.random();
      const esito = r < probDestra ? 0 : 1;
      conteggi[esito]++;
      grafico.data.datasets[0].data = conteggi;
      grafico.update();

      document.getElementById("esito").innerText = esito === 0 ? "Esito: Spin Destra" : "Esito: Spin Sinistra";
    }
  }, 20);
}