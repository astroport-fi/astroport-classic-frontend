import React, { useMemo } from "react";
import { Box, BoxProps, Button, Flex, HStack } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { Point } from "chart.js";
import { IButton } from "types/common";

import { getGraphConfig } from "libs/graphConfig";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  layout: {},
  scales: {
    x: {
      grid: {
        color: "rgba(255,255,255,0.3)",
        borderDash: [4, 2],
        drawTicks: false,
        drawBorder: false,
      },
      ticks: {
        padding: 10,
        color: "#fff",
        maxTicksLimit: 10,
      },
    },
    y: {
      grid: {
        tickLength: 30,
        display: true,
        color: "rgba(255,255,255,0.3)",
        drawTicks: true,
        drawBorder: false,
      },
      ticks: {
        padding: 10,
        color: "#fff",
        maxTicksLimit: 6,
      },
    },
  },
};

type Props = {
  points: Point[];
  leftButtons?: IButton[];
  rightButtons?: IButton[];
} & BoxProps;

const Graph: React.FC<Props> = ({
  points,
  leftButtons = [],
  rightButtons = [],
}) => {
  const [chartData] = useMemo(() => getGraphConfig(points), [points]);

  return (
    <Flex direction="column" w="100%">
      <Flex justify="space-between" mb="3" mt="1">
        <HStack>
          {leftButtons.map((button) => (
            <Button
              key={button.type}
              variant="filter"
              onClick={button.onClick}
              isActive={button.isActive}
            >
              {button.title}
            </Button>
          ))}
        </HStack>

        <HStack>
          {rightButtons.map((button) => (
            <Button
              key={button.type}
              variant="filter"
              onClick={button.onClick}
              isActive={button.isActive}
            >
              {button.title}
            </Button>
          ))}
        </HStack>
      </Flex>

      <Box h="375">
        {/* <Line data={chartData} options={chartOptions} /> */}
      </Box>
    </Flex>
  );
};

export default Graph;
