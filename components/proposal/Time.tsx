import React, { FC } from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import { ProposalStatus } from "types/common";

import {
  convertTimestampToDate,
  convertTimestapToHHMMSS,
} from "modules/governance/helpers";

type Props = {
  endDate: number;
  status: ProposalStatus;
  height?: number;
};

const Time: FC<Props> = ({ endDate, status, height = "100px" }) => {
  const end = new Date(endDate * 1000);

  return (
    <Box
      backgroundImage="linear-gradient(180deg, rgb(173, 163, 255) 0%, rgb(86, 67, 242) 100%)"
      padding="0.5"
      borderRadius="xl"
      mb="3"
    >
      <Box bg="brand.deepBlue" borderRadius="xl">
        <Center
          flexDirection="column"
          h={height}
          width="100%"
          bg="white.50"
          borderRadius="xl"
        >
          <Text fontSize="lg">{`${convertTimestapToHHMMSS(
            undefined,
            true
          )} UTC`}</Text>
          <Text fontSize="sm" mt="1" color="proposalColours.purpleAlt">
            (
            {`${
              status === ProposalStatus.Active ? `Ends` : `Ended`
            } ${convertTimestampToDate(
              endDate,
              true
            )} ${end.getUTCHours()}:${end.getUTCMinutes()} UTC`}
            )
          </Text>
        </Center>
      </Box>
    </Box>
  );
};

export default Time;
