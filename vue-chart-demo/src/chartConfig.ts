export const data = {
  labels: ['113年1季', '113年2季', '113年3季', '113年4季'],
  datasets: [
    {
      type: 'bar',
      label: '營業額',
      data: [100, 200, 300, 400],
      backgroundColor: '#ecea00',
      hoverBackgroundColor: '#dcda00',
      borderColor: '#ecea00',
      order: 2,
      barPercentage: 0.5,
      yAxisID: 'y',
    },
    {
      type: 'line',
      label: '年增率',
      // data: [{x: '2016-12-25', y: 20}, {x: '2016-12-26', y: 10}],
      data: [4, 15, 57, 88],
      backgroundColor: '#f87979',
      borderColor: '#f87979',
      fill: false,
      order: 1,
      // pointStyle: 'triangle',
      radius: 8,
      hoverRadius: 12,
      yAxisID: 'y1',
    },
  ],
}

export const options = {
  responsive: true,
  // maintainAspectRatio: false,
  animation: {
    duration: 500,
  },
  transitions: {
    show: {
      animations: {
        x: {
          // from: 0,
        },
        y: {
          // from: 0,
        },
      },
    },
    hide: {
      animations: {
        x: {
          // to: 0,
        },
        y: {
          // to: 0,
        },
      },
    },
  },
  scales: {
    // grid: {}, //調整網格樣式
    y: {
      title: {
        display: true,
        text: '億元',
        align: 'end',
        // font: {
        //   size: 16,
        // },
      },
      position: 'left',
    },
    y1: {
      title: {
        display: true,
        text: '%',
        align: 'end',
        // font: {
        //   size: 16,
        // },
      },
      position: 'right',
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
  interaction: {
    mode: 'index',
  },
  plugins: {
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: '#f87979',
      borderWidth: 1,
      xAlign: 'center',
      cornerRadius: 3,
      bodyFont: {
        size: 16,
      },
      titleFont: {
        size: 16,
      },
      bodyColor: '#000',
      titleColor: '#000',
      usePointStyle: true,
      boxWidth: 8,
      boxHeight: 8,
      boxPadding: 5,
      callbacks: {
        label: (context) => {
          console.log(context);
          return `${context?.dataset.label} : ${context?.raw}${
            context?.dataset.type === 'line' ? '%' : '元'
          }`;
        },
      },
      // displayColors: false,
    },
    title: {
      display: true,
      text: '固定資產(不含土地)增購金額',
      color: '#000',
      font: {
        size: 24,
      },
    },
    legend: {
      onHover: (evt, item, legend) => {
        legend.chart.data.datasets.forEach((e) => {
          if (e.backgroundColor.includes(item.fillStyle)) {
            e.backgroundColor += '4D';
            e.borderColor += '4D';
          }
        });
        legend.chart.update();
      },
      onLeave: (evt, item, legend) => {
        legend.chart.data.datasets.forEach((e) => {
          if (e.backgroundColor.includes('4D')) {
            if (e.backgroundColor.includes(item.fillStyle)) {
              e.backgroundColor = e.backgroundColor.slice(0, -2);
              e.borderColor = e.borderColor.slice(0, -2);
            }
          }
        });
        legend.chart.update();
      },
      align: 'end',
      labels: {
        // color: 'rgb(255, 99, 132)',
        usePointStyle: true,
        font: {
          weight: 'bolder',
          size: 16,
        },
      },
      // title: {
      //   display: true,
      //   text: '工廠家數',
      //   font: {
      //     weight: 'bolder',
      //     size: 18,
      //   },
      // },
    },
  },
}
