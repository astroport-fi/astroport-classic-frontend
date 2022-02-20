import React, { FC } from "react";
import { Flex, Box } from "@chakra-ui/react";

type Props = {};

const StatusBox = ({ status }) => {
  return (
    <Flex>
      {status === 2 && (
        <Box
          w="2"
          h="2"
          mt="1.5"
          mr="2"
          borderRadius="50%"
          bg="green.500"
          borderWidth="2"
        />
      )}
      {status !== 2 && (
        <Box
          w="1"
          h="1"
          mt="2"
          mr="2"
          borderRadius="50%"
          bg={status === 0 ? "whiteAlpha.200" : "whiteAlpha.900"}
        ></Box>
      )}
      <Box color={status === 0 ? "whiteAlpha.200" : "whiteAlpha.900"}>
        <Box>Created</Box>
        <Box>17/11/22</Box>
      </Box>
    </Flex>
  );
};

const Line = () => {
  return (
    <Box mx="2" my="2.5" width="40px" height="1px" bg="whiteAlpha.300"></Box>
  );
};

const TimelineBar: FC<Props> = ({}) => {
  return (
    <Flex fontSize="sm">
      <StatusBox status={1} />
      <Line />
      <StatusBox status={1} />
      <Line />
      <StatusBox status={1} />
      <Line />
      <StatusBox status={2} />
      <Line />
      <StatusBox status={0} />
    </Flex>
  );
};

export default TimelineBar;
