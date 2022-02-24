import React, { FC } from "react";
import { Flex, Box } from "@chakra-ui/react";
import {
  getGovProposalStepStatus,
  convertTimestampToDate,
} from "modules/governance/helpers";

type Props = {
  dates: number[];
  active: number;
  completion: number;
};

enum TimelineStatus {
  Future = 0,
  Past = 1,
  Active = 2,
}

enum TimelineProposalCompleted {
  Fail = -1,
  Pending = 0,
  Success = 1,
}

const DotStyles = (status: number, completion: number): any =>
  status === 2
    ? {
        w: "2",
        h: "2",
        mt: "1.5",
        mr: "2",
        borderRadius: "50%",
        bg: completion === -1 ? "red.500" : "green.500",
        borderWidth: "2",
      }
    : {
        w: "1",
        h: "1",
        mt: "2",
        mr: "2",
        borderRadius: "50%",
        bg: status === 0 ? "whiteAlpha.200" : "whiteAlpha.900",
      };

const StatusBox = ({ date, index, status, completion }) => {
  return (
    <Flex>
      <Box {...DotStyles(status, completion)} />
      <Box color={status === 0 ? "whiteAlpha.200" : "whiteAlpha.900"}>
        <Box>{getGovProposalStepStatus(index, completion)}</Box>
        <Box mt="1">{convertTimestampToDate(date)}</Box>
      </Box>
    </Flex>
  );
};

const Split = () => {
  return (
    <Box mx="2" my="2.5" width="35px" height="1px" bg="whiteAlpha.300"></Box>
  );
};

const TimelineBar: FC<Props> = ({ dates, active, completion }) => {
  return (
    <Flex fontSize="xs" overflowY="hidden" overflowX="auto">
      {dates.map((date, i) => {
        const status =
          i < active
            ? TimelineStatus.Past
            : i === active
            ? TimelineStatus.Active
            : TimelineStatus.Future;
        return (
          <Flex key={i}>
            <StatusBox
              date={date}
              index={i}
              status={status}
              completion={completion}
            />
            {i !== dates.length - 1 && <Split />}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default TimelineBar;
