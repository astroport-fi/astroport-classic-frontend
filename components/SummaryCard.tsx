import React, { FC } from "react";
import { useMediaQuery, Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import Glider from "react-glider";
import { MOBILE_MAX_WIDTH } from "constants/constants";

import Card from "components/Card";
import BoxGradient from "components/BoxGradient";
import InfoIcon from "components/icons/InfoIcon";

import "glider-js/glider.min.css";

type Props = {
  data: {
    label: string;
    value: string;
    tooltip?: string;
  }[];
};

const MobileComponent: FC<{ item: any }> = ({ item }) => {
  return (
    <Box px="1">
      <BoxGradient>
        <Flex
          flexDirection="column"
          align="center"
          justifyContent="center"
          height="120px"
        >
          <Text textStyle="h3">{item.value}</Text>
          <Text textStyle="small" mt="3" color="brand.purpleAlt">
            {item.label}
          </Text>
        </Flex>
      </BoxGradient>
    </Box>
  );
};

const Component: FC<{ item: any }> = ({ item }) => {
  return (
    <Box
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
};

const SummaryCard: FC<Props> = ({ data }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);

  return isMobile ? (
    <Glider
      draggable
      hasDots
      slidesToShow={1}
      slidesToScroll={1}
      scrollLock={true}
    >
      {data.map((item, index) => {
        return <MobileComponent key={index} item={item} />;
      })}
    </Glider>
  ) : (
    <Card>
      <Flex justify="space-between">
        {data.map((item, index) => {
          return <Component key={index} item={item} />;
        })}
      </Flex>
    </Card>
  );
};

export default SummaryCard;
