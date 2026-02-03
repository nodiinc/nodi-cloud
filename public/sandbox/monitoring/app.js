// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const page = item.dataset.page;

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');

    // Show corresponding page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
  });
});

// Gauge Animation
function setGaugeValue(gaugeId, value, maxValue = 100) {
  const gauge = document.getElementById(gaugeId);
  if (!gauge) return;

  const radius = 50;
  const circumference = Math.PI * radius;
  const percentage = Math.min(value / maxValue, 1);
  const offset = circumference * (1 - percentage);

  gauge.style.strokeDasharray = `${circumference}`;
  gauge.style.strokeDashoffset = `${circumference}`;

  // Animate
  setTimeout(() => {
    gauge.style.transition = 'stroke-dashoffset 1s ease-out';
    gauge.style.strokeDashoffset = `${offset}`;
  }, 100);
}

// Initialize gauge
setGaugeValue('gauge-reserve', 23.5, 50);

// Chart.js default options
const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: '#1c2530',
      titleColor: '#e6edf3',
      bodyColor: '#8b949e',
      borderColor: '#2a3441',
      borderWidth: 1,
      padding: 8,
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(42, 52, 65, 0.5)',
      },
      ticks: {
        color: '#6e7681',
        font: { size: 9 },
        maxTicksLimit: 8
      }
    },
    y: {
      grid: {
        color: 'rgba(42, 52, 65, 0.5)',
      },
      ticks: {
        color: '#6e7681',
        font: { size: 9 }
      }
    }
  }
};

// Power Factor Trend Chart
const pfCtx = document.getElementById('pfTrendChart');
if (pfCtx) {
  const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const pfData = [97.8, 97.5, 97.2, 97.0, 97.3, 97.6, 98.0, 98.5, 98.8, 98.5, 98.2, 98.0, 97.8, 98.0, 98.3, 98.5, 98.8, 99.0, 98.8, 98.5, 98.2, 98.0, 97.8, 97.6];

  new Chart(pfCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '역률',
        data: pfData,
        borderColor: '#3fb950',
        backgroundColor: 'rgba(63, 185, 80, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 3,
        borderWidth: 2
      }]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        tooltip: {
          ...chartDefaults.plugins.tooltip,
          callbacks: {
            label: function(context) {
              return `역률: ${context.parsed.y.toFixed(1)}%`;
            }
          }
        }
      },
      scales: {
        ...chartDefaults.scales,
        y: {
          ...chartDefaults.scales.y,
          min: 95,
          max: 100,
          ticks: {
            ...chartDefaults.scales.y.ticks,
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });
}

// Voltage Unbalance Trend Chart
const unbalanceCtx = document.getElementById('unbalanceTrendChart');
if (unbalanceCtx) {
  const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const unbalanceData = [1.0, 0.9, 0.8, 0.7, 0.8, 0.9, 1.2, 1.5, 1.8, 1.6, 1.4, 1.3, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 1.8, 1.5, 1.3, 1.1, 1.0, 0.9];

  new Chart(unbalanceCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '전압 불평형률',
        data: unbalanceData,
        borderColor: '#d29922',
        backgroundColor: 'rgba(210, 153, 34, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 3,
        borderWidth: 2
      }]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        tooltip: {
          ...chartDefaults.plugins.tooltip,
          callbacks: {
            label: function(context) {
              return `불평형률: ${context.parsed.y.toFixed(1)}%`;
            }
          }
        }
      },
      scales: {
        ...chartDefaults.scales,
        y: {
          ...chartDefaults.scales.y,
          min: 0,
          max: 3,
          ticks: {
            ...chartDefaults.scales.y.ticks,
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });
}

// Time slot click handler (toggle between light/mid/peak)
document.querySelectorAll('.hour').forEach(hour => {
  hour.addEventListener('click', () => {
    const classes = ['light', 'mid', 'peak'];
    const currentClass = classes.find(c => hour.classList.contains(c));
    const currentIndex = classes.indexOf(currentClass);
    const nextIndex = (currentIndex + 1) % classes.length;

    hour.classList.remove(currentClass);
    hour.classList.add(classes[nextIndex]);
  });
});

// Simulate real-time data updates
function simulateDataUpdate() {
  const baseValues = {
    powerReduction: 1234.5,
    carbonReduction: 567.8,
    costSaving: 89.2,
    reserve: 23.5
  };

  const fluctuation = () => (Math.random() - 0.5) * 0.2;

  document.getElementById('power-reduction').textContent =
    (baseValues.powerReduction + fluctuation() * 10).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  document.getElementById('carbon-reduction').textContent =
    (baseValues.carbonReduction + fluctuation() * 5).toFixed(1);

  document.getElementById('cost-saving').textContent =
    (baseValues.costSaving + fluctuation() * 2).toFixed(1);
}

// Update data every 5 seconds
setInterval(simulateDataUpdate, 5000);

// Flow diagram animation
function animateFlowLines() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes flowPulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    .flow-arrow-line::after {
      animation: flowPulse 1.5s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}

animateFlowLines();

console.log('DC Monitoring System initialized');
