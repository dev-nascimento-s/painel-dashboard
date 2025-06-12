window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('chart').getContext('2d');
  let lineChart;
  let externalData = null;

  function createLineChart(labels, data) {
    if (lineChart) lineChart.destroy();

    lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Visitas',
          data,
          backgroundColor: 'rgba(35, 116, 225, 0.2)',
          borderColor: '#2374e1',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#2374e1',
          pointBorderColor: '#18191a',
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#e4e6eb' },
            grid: { color: 'rgba(255,255,255,0.1)' }
          },
          x: {
            ticks: { color: '#e4e6eb' },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { labels: { color: '#e4e6eb' } },
          tooltip: {
            backgroundColor: '#3a3b3c',
            titleColor: '#e4e6eb',
            bodyColor: '#e4e6eb'
          }
        }
      }
    });
  }

  function updateCards({ users, sales, visits }) {
    document.getElementById('card-users').textContent = users;
    document.getElementById('card-sales').textContent = `R$ ${sales.toLocaleString()}`;
    document.getElementById('card-visits').textContent = visits;
  }

  function applyData(period) {
    const fallbackData = {
      7: {
        labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        data: [120, 190, 300, 250, 320, 400, 380],
        cards: { users: 1280, sales: 8230, visits: 4523 }
      }
    };

    const source = externalData?.[period] || fallbackData[period] || fallbackData[7];

    createLineChart(source.labels, source.data);
    updateCards(source.cards);
  }

  // Botões de filtro
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const period = button.dataset.period;
      applyData(period);
    });
  });

  // Tenta carregar o JSON externo
  fetch('dados.json')
    .then(res => res.json())
    .then(json => {
      externalData = json;
      applyData('7'); // inicializa com os últimos 7 dias
    })
    .catch(() => {
      console.warn('Falha ao carregar dados.json. Usando dados mock.');
      applyData('7');
    });
});
// Configuração do gráfico de linha
// Configuração do gráfico de pizza


const pieCtx = document.getElementById('chartPie').getContext('2d');

new Chart(pieCtx, {
  type: 'doughnut',
  data: {
    labels: ['Visitantes', 'Membros', 'Administradores'],
    datasets: [{
      label: 'Usuários',
      data: [65, 25, 10],
      backgroundColor: [
        '#2374e1', // azul Facebook
        '#3a3b3c', // cinza escuro
        '#b0b3b8'  // texto secundário
      ],
      borderColor: '#18191a',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e4e6eb',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: '#3a3b3c',
        titleColor: '#e4e6eb',
        bodyColor: '#e4e6eb',
        padding: 10
      }
    }
  }
});
// Adicionando interatividade ao gráfico de linha
