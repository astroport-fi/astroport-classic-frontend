import { Point } from "chart.js";

const colorTurquoise = "#23C7AA";
const colorGradient = "#83ffcb00";

export const getGraphConfig = (points: Point[]) => {
  const getChartDataConfig = (canvas: any) => {
    const ctx = canvas.getContext("2d");
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

  return [getChartDataConfig];
};
