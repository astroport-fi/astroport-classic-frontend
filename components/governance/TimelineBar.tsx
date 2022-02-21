import React, { FC } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { GOV_PROPOSAL_STEPS } from "constants/constants";
import { convertTimestampToDate } from "modules/governance/helpers";

type Props = {
  dates: number[];
  active: number;
};

enum TimelineStatus {
  Future = 0,
  Past = 1,
  Active = 2,
}

const DotStyles = (status: number): any =>
  status === 2
    ? {
        w: "2",
        h: "2",
        mt: "1.5",
        mr: "2",
        borderRadius: "50%",
        bg: "green.500",
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

const StatusBox = ({ date, index, status }) => {
  return (
    <Flex>
      <Box {...DotStyles(status)} />
      <Box color={status === 0 ? "whiteAlpha.200" : "whiteAlpha.900"}>
        <Box>{GOV_PROPOSAL_STEPS[index]}</Box>
        <Box>{convertTimestampToDate(date)}</Box>
      </Box>
    </Flex>
  );
};

const Split = () => {
  return (
    <Box mx="2" my="2.5" width="40px" height="1px" bg="whiteAlpha.300"></Box>
  );
};

const TimelineBar: FC<Props> = ({ dates, active }) => {
  return (
    <Flex fontSize="sm" overflowY="hidden" overflowX="auto">
      {dates.map((date, i) => {
        const status =
          i < active
            ? TimelineStatus.Past
            : i === active
            ? TimelineStatus.Active
            : TimelineStatus.Future;
        return (
          <Flex key={i}>
            <StatusBox date={date} index={i} status={status} />
            {i !== dates.length - 1 && <Split />}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default TimelineBar;
