import React, { FC } from "react";
import { Flex, Box, Center, HStack, Text, Button } from "@chakra-ui/react";
import { GovernanceProposal } from "types/common";

import UnderlineButton from "components/UnderlineButton";

import ProgressBar from "components/governance/ProgressBar";
import ProgressLabel from "components/governance/ProgressLabel";

type Props = {
  proposal: GovernanceProposal;
  minH?: number;
  addressOpen: boolean;
  onClick: () => void;
};

// Dummy data
const votesForArr = [
  {
    address: "terra123....",
    percent: 8,
  },
  {
    address: "terra456....",
    percent: 3.4,
  },
  {
    address: "terra789....",
    percent: 2,
  },
  {
    address: "terraabc....",
    percent: 1,
  },
];

const votesAgainstArr = [
  {
    address: "terra123....",
    percent: 5,
  },
  {
    address: "terra456....",
    percent: 4.4,
  },
  {
    address: "terra789....",
    percent: 4.1,
  },
  {
    address: "terraabc....",
    percent: 3.8,
  },
];

const VoteStats: FC<Props> = ({
  proposal,
  minH = "250px",
  addressOpen,
  onClick,
}) => {
  return (
    <Flex
      flexDirection="column"
      minH={minH}
      bg="white.50"
      mb="3"
      borderRadius="xl"
      width="100%"
      fontSize="sm"
    >
      <Flex flexDirection="column" p="5" mt="5">
        <Flex>
          <ProgressBar voteFor={20} voteAgainst={20} quorum={40} />
        </Flex>
        <ProgressLabel voteFor={20} voteAgainst={20} />
      </Flex>
      <Flex borderY="1px" borderColor="white.100" p="6">
        <Flex flexDirection="column" w="50%" mr="1">
          <Text mb="2">For</Text>
          <Box bg="blackAlpha.400" px="4" py="2" borderRadius="lg">
            <Text fontSize="lg" color="green.500">
              xx.xx%
            </Text>
            <Text color="white.400">x,xxx,xxx Votes</Text>
          </Box>
        </Flex>
        <Flex flexDirection="column" w="50%" ml="1">
          <Text mb="2">Against</Text>
          <Box bg="blackAlpha.400" px="4" py="2" borderRadius="lg">
            <Text fontSize="lg" color="red.500">
              xx.xx%
            </Text>
            <Text color="white.400">x,xxx,xxx Votes</Text>
          </Box>
        </Flex>
      </Flex>
      <Center flexDirection="column">
        {addressOpen && (
          <Flex width="100%" p="5">
            <Box width="50%" mr="2" p="3" bg="whiteAlpha.50" borderRadius="lg">
              <Text color="green.500" mb="1">
                {votesForArr.length} Addresses
              </Text>
              {votesForArr.map((vote, index) => (
                <Flex key={index} justify="space-between" my="1">
                  <Text>{vote.address}</Text>
                  <Text>{vote.percent}%</Text>
                </Flex>
              ))}
            </Box>
            <Box width="50%" ml="2" p="3" bg="whiteAlpha.50" borderRadius="lg">
              <Text color="red.500" mb="1">
                {votesAgainstArr.length} Addresses
              </Text>
              {votesAgainstArr.map((vote, index) => (
                <Flex key={index} justify="space-between" my="1">
                  <Text>{vote.address}</Text>
                  <Text>{vote.percent}%</Text>
                </Flex>
              ))}
            </Box>
          </Flex>
        )}
        <UnderlineButton
          w="100%"
          h="50px"
          bg="none"
          color="proposalColours.purpleAlt"
          fontSize="md"
          onClick={onClick}
        >
          {addressOpen ? "Close" : "View Addresses"}
        </UnderlineButton>
      </Center>
    </Flex>
  );
};

export default VoteStats;
