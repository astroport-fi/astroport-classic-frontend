import React, { FC } from "react";
import { Flex, Box, Center, Link, Text } from "@chakra-ui/react";
import useFinder from "hooks/useFinder";
import { Proposal } from "types/common";
import { handleTinyAmount, truncateStr } from "modules/common/helpers";

import UnderlineButton from "components/UnderlineButton";
import ProgressBar from "components/governance/ProgressBar";
import ProgressLabel from "components/governance/ProgressLabel";
import { calcVotingPercentages } from "modules/governance/helpers";

type Props = {
  proposal: Proposal;
  quorum: any;
  minH?: number;
  addressOpen: boolean;
  onClick: () => void;
};

// Dummy data
const votesForArr = [];

const votesAgainstArr = [];

const VoteStats: FC<Props> = ({
  proposal,
  quorum,
  minH = "250px",
  addressOpen,
  onClick,
}) => {
  const finder = useFinder();
  const { voteForPerc, voteAgainstPerc } = calcVotingPercentages(proposal);

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
          <ProgressBar
            voteFor={voteForPerc}
            voteAgainst={voteAgainstPerc}
            quorum={quorum * 100 || null}
          />
        </Flex>
        <ProgressLabel voteFor={voteForPerc} voteAgainst={voteAgainstPerc} />
      </Flex>
      <Flex borderY="1px" borderColor="white.100" p="6">
        <Flex flexDirection="column" w="50%" mr="1">
          <Text mb="2">For</Text>
          <Box bg="blackAlpha.400" px="4" py="2" borderRadius="lg">
            <Text fontSize="lg" color="green.500">
              {voteForPerc > 0 ? handleTinyAmount(voteForPerc) : "0"}%
            </Text>
            <Text color="white.400">
              {Number(proposal.votes_for).toLocaleString()} Votes
            </Text>
          </Box>
        </Flex>
        <Flex flexDirection="column" w="50%" ml="1">
          <Text mb="2">Against</Text>
          <Box bg="blackAlpha.400" px="4" py="2" borderRadius="lg">
            <Text fontSize="lg" color="red.500">
              {voteAgainstPerc > 0 ? handleTinyAmount(voteAgainstPerc) : "0"}%
            </Text>
            <Text color="white.400">
              {Number(proposal.votes_against).toLocaleString()} Votes
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Center flexDirection="column">
        {addressOpen && (
          <Flex width="100%" p="5">
            <Box width="50%" mr="2" p="3" bg="whiteAlpha.50" borderRadius="lg">
              <Text color="green.500" mb="1" fontSize="2xs" fontWeight="500">
                {votesForArr.length} Addresses
              </Text>
              <Box height="32" overflowY="auto">
                {votesForArr.map((vote, index) => (
                  <Flex
                    key={index}
                    justify="space-between"
                    my="1.5"
                    fontSize="xs"
                  >
                    <Link href={finder(vote.address)} isExternal>
                      <Text>{truncateStr(vote.address, 15)}</Text>
                    </Link>
                    <Text mr="1">{vote.percent}%</Text>
                  </Flex>
                ))}
              </Box>
            </Box>
            <Box width="50%" ml="2" p="3" bg="whiteAlpha.50" borderRadius="lg">
              <Text color="red.500" mb="1" fontSize="2xs" fontWeight="500">
                {votesAgainstArr.length} Addresses
              </Text>
              <Box height="32" overflowY="auto">
                {votesAgainstArr.map((vote, index) => (
                  <Flex
                    key={index}
                    justify="space-between"
                    my="1.5"
                    fontSize="xs"
                  >
                    <Link href={finder(vote.address)} isExternal>
                      <Text>{truncateStr(vote.address, 15)}</Text>
                    </Link>
                    <Text mr="1">{vote.percent}%</Text>
                  </Flex>
                ))}
              </Box>
            </Box>
          </Flex>
        )}
        <UnderlineButton
          w="100%"
          h="50px"
          fontWeight="500"
          color="proposalColours.purpleAlt"
          fontSize=".875rem"
          onClick={onClick}
        >
          {addressOpen ? "Close" : "View Addresses"}
        </UnderlineButton>
      </Center>
    </Flex>
  );
};

export default VoteStats;
