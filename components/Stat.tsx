import React, { FC, ReactNode } from "react";
import { Flex, Box, Text, HStack, Tooltip } from "@chakra-ui/react";

import InfoIcon from "components/icons/InfoIcon";

type Props = {
  label: string;
  value: string;
  icon?: ReactNode;
  asset?: ReactNode;
  size?: string;
  reverse?: boolean;
  tooltip?: string;
};

const Stat: FC<Props> = ({
  size = "md",
  icon,
  label,
  value,
  reverse = false,
  tooltip,
  asset,
}) => {
  let tooltipContent;
  const labelContent = <Text variant="light">{label}</Text>;
  const valueContent = (
    <Text color="#fff" fontWeight="700" fontSize={size}>
      {value}
    </Text>
  );
  let content = (
    <>
      <Box mb="2">{valueContent}</Box>
      <HStack>
        {labelContent}
        {tooltipContent}
      </HStack>
    </>
  );

  if (tooltip && tooltip.length > 0) {
    tooltipContent = (
      <Box>
        <Tooltip
          label={tooltip}
          placement="top"
          hasArrow
          aria-label="Staking tooltip"
        >
          <Box cursor="pointer" color="white.600">
            <InfoIcon width="1rem" height="1rem" />
          </Box>
        </Tooltip>
      </Box>
    );
  }

  if (reverse) {
    content = (
      <Flex direction="row">
        {icon}
        <Box>
          <HStack mb="2" spacing="1">
            {labelContent}
            {tooltipContent}
          </HStack>
          <HStack spacing="1">
            {asset}
            <Box>{valueContent}</Box>
          </HStack>
        </Box>
      </Flex>
    );
  }

  return <Box lineHeight="1">{content}</Box>;
};

export default Stat;
