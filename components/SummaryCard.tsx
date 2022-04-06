import React, { FC } from "react";
import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";

import Card from "components/Card";
import InfoIcon from "components/icons/InfoIcon";

type Props = {
  data: {
    label: string;
    value: string;
    tooltip?: string;
  }[];
};

const SummaryCard: FC<Props> = ({ data }) => {
  return (
    <Card>
      <Flex justify="space-between">
        {data.map((item) => {
          return (
            <Box
              key={item.label}
              _first={{ textAlign: "left" }}
              textAlign="center"
              _last={{ textAlign: "right" }}
            >
              <Text textStyle="h3">{item.value}</Text>
              {item.tooltip && (
                <Tooltip label={item.tooltip} placement="bottom">
                  <Flex align="center" justify="center" cursor="pointer">
                    <Text mr="2px" textStyle="small" variant="dimmed">
                      {item.label}
                    </Text>
                    <InfoIcon width="1rem" height="1rem" color="#6e748d" />
                  </Flex>
                </Tooltip>
              )}
              {!item.tooltip && (
                <Text textStyle="small" variant="dimmed">
                  {item.label}
                </Text>
              )}
            </Box>
          );
        })}
      </Flex>
    </Card>
  );
};

export default SummaryCard;
