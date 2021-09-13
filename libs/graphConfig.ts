import { ChartData, ChartOptions, Point } from 'chart.js';

const colorWhite = '#ffffff30';
const colorTurquoise = '#23C7AA';
const colorGradient = '#83ffcb00';

export const getGraphConfig = (points: Point[]) => {
  const getChartDataConfig = (canvas: any): ChartData => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 10, 120);

    gradient.addColorStop(0, colorTurquoise);
    gradient.addColorStop(1, colorGradient);

    return {
      labels: points.map(({ x }) => x),
      datasets: [
        {
          data: points,
          pointRadius: 0.4,
          borderColor: colorTurquoise,
          borderWidth: 2,
          backgroundColor: gradient,
          fill: true,
        },
      ],
    };
  };

  const chartOptionsConfig: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    layout: {},
    scales: {
      x: {
        display: true,
        grid: {
          color: colorWhite,
          borderColor: colorWhite,
          borderDash: [5, 10],
          drawBorder: true,
        },
        ticks: {
          maxTicksLimit: 9,
        },
      },
      y: {
        display: true,
        grid: {
          display: true,
          color: colorWhite,
          drawTicks: true,
          drawBorder: true,
        },
        ticks: {
          maxTicksLimit: 6,
        },
      },
    },
  };

  return [getChartDataConfig, chartOptionsConfig];
};
