import React, { FC } from "react";
import { Center, Text } from "@chakra-ui/react";

import {
  convertTimestampToDate,
  convertTimestapToHHMMSS,
} from "modules/governance/helpers";

type Props = {
  endDate: number;
  height?: number;
};

const Time: FC<Props> = ({ endDate, height = "100px" }) => {
  const end = new Date(endDate * 1000);

  return (
    <Center
      flexDirection="column"
      h={height}
      width="100%"
      bg="white.50"
      mb="3"
      borderRadius="xl"
      borderWidth="2px"
      borderColor="proposalColours.purple"
    >
      <Text fontSize="lg">{`${convertTimestapToHHMMSS(
        undefined,
        true
      )} UTC`}</Text>
      <Text fontSize="sm" mt="1" color="proposalColours.purpleAlt">
        (
        {`Ends ${convertTimestampToDate(
          endDate,
          true
        )} ${end.getUTCHours()}:${end.getUTCMinutes()} UTC`}
        )
      </Text>
    </Center>
  );
};

export default Time;
