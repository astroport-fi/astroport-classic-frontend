import React, { FC } from "react";
import { Center, Text } from "@chakra-ui/react";
import { Proposal_Status } from "types/common";

import {
  convertTimestampToDate,
  convertTimestapToHHMMSS,
} from "modules/governance/helpers";

import BoxGradient from "components/BoxGradient";

type Props = {
  endTimestamp: string;
  state: Proposal_Status;
  height?: number;
};

const Time: FC<Props> = ({ endTimestamp, state, height = "100px" }) => {
  const end = new Date(endTimestamp);

  return (
    <BoxGradient mb="3">
      <Center
        flexDirection="column"
        h={height}
        width="100%"
        bg="white.50"
        borderRadius="xl"
      >
        <Text fontSize="lg">
          Current time: {`${convertTimestapToHHMMSS(undefined, true)} UTC`}
        </Text>
        <Text fontSize="sm" mt="1" color="proposalColours.purpleAlt">
          (
          {`${
            state === Proposal_Status.Active ? `Ends` : `Ended`
          } ${convertTimestampToDate(endTimestamp, true)} ${String(
            end.getUTCHours()
          ).padStart(2, "0")}:${String(end.getUTCMinutes()).padStart(
            2,
            "0"
          )} UTC`}
          )
        </Text>
      </Center>
    </BoxGradient>
  );
};

export default Time;
