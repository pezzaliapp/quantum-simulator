
const ctx = document.getElementById('graficoProbabilità').getContext('2d');
const labels = ['Spin Destra', 'Spin Sinistra'];
const data = {
  labels: labels,
  datasets: [{
    label: 'Frequenza',
    data: [0, 0],
    backgroundColor: ['#00ffaa', '#ff0066'],
    borderWidth: 1
  }]
};
const config = {
  type: 'bar',
  data: data,
  options: {
    animation: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};
const grafico = new Chart(ctx, config);

let conteggi = [0, 0];

document.getElementById('btnLancio').addEventListener('click', () => {
  const risultato = Math.random() < 0.5 ? 0 : 1;
  conteggi[risultato]++;
  document.getElementById('esito').textContent = 'Esito: ' + labels[risultato];
  grafico.data.datasets[0].data = conteggi;
  grafico.update();
});
