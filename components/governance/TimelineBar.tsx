import React, { FC } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { convertTimestampToDate } from "modules/governance/helpers";
import { Proposal_History } from "types/common";

type Props = {
  blocks: Proposal_History;
};

const StatusBox = ({ block }: { block: any }) => {
  const redGreenDot =
    block.dotColor === "red.500" || block.dotColor === "green.500";

  return (
    <Flex>
      <Box
        w={redGreenDot ? "2" : "1"}
        h={redGreenDot ? "2" : "1"}
        mt={redGreenDot ? "5px" : "7px"}
        mr="7px"
        borderRadius="50%"
        bg={block.dotColor}
      />
      <Box color={block.color}>
        <Box>{block.title}</Box>
        {block.timestamp && (
          <Box mt="1">{convertTimestampToDate(block.timestamp)}</Box>
        )}
      </Box>
    </Flex>
  );
};

const Split = () => {
  return (
    <Box
      ml="2"
      mr="4"
      my="9px"
      width="50px"
      height="1px"
      bg="whiteAlpha.300"
    ></Box>
  );
};

const TimelineBar: FC<Props> = ({ blocks }) => {
  return (
    <Flex fontSize="xs" overflowY="hidden" overflowX="auto">
      {blocks.map((block, i) => {
        return (
          <Flex key={i}>
            <StatusBox block={block} />
            {i !== blocks.length - 1 && <Split />}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default TimelineBar;
