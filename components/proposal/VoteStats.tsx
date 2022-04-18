import React, { FC } from "react";
import { Flex, Box, Center, Text } from "@chakra-ui/react";
import { Proposal } from "types/common";
import { handleAmountWithoutTrailingZeros } from "modules/common/helpers";

import UnderlineButton from "components/UnderlineButton";
import ProgressBar from "components/governance/ProgressBar";
import ProgressLabel from "components/governance/ProgressLabel";
import {
  calcVotingPower,
  calcVotingDistribution,
} from "modules/governance/helpers";

import VoteArray from "./VoteArray";

type Props = {
  proposal: Proposal;
  quorum: any;
  minH?: number;
  addressOpen: boolean;
  onClick: () => void;
};

const VoteStats: FC<Props> = ({
  proposal,
  quorum,
  minH = "250px",
  addressOpen,
  onClick,
}) => {
  const { voteForPower, voteAgainstPower } = calcVotingPower(proposal);
  const { voteForDist, voteAgainstDist } = calcVotingDistribution(proposal);

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
            voteFor={voteForPower}
            voteAgainst={voteAgainstPower}
            quorum={quorum * 100 || null}
          />
        </Flex>
        <ProgressLabel proposal={proposal} />
      </Flex>
      <Flex borderTop="1px" borderColor="white.100" p="6">
        <Flex flexDirection="column" w="50%" mr="1">
          <Text mb="2">For</Text>
          <Box bg="blackAlpha.400" px="4" py="2" borderRadius="lg">
            <Text fontSize="lg" color="green.500">
              {voteForDist > 0
                ? handleAmountWithoutTrailingZeros(voteForDist)
                : "0"}
              %
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
              {voteAgainstDist > 0
                ? handleAmountWithoutTrailingZeros(voteAgainstDist)
                : "0"}
              %
            </Text>
            <Text color="white.400">
              {Number(proposal.votes_against).toLocaleString()} Votes
            </Text>
          </Box>
        </Flex>
      </Flex>
      {(proposal.votes_for > 0 || proposal.votes_against > 0) && (
        <Center borderTop="1px" borderColor="white.100" flexDirection="column">
          {addressOpen && (
            <Flex width="100%" p="5">
              <Box
                width="50%"
                mr="2"
                p="3"
                bg="whiteAlpha.50"
                borderRadius="lg"
              >
                <Text color="green.500" mb="1" fontSize="2xs" fontWeight="500">
                  {proposal.votes_for} Addresses
                </Text>
                <VoteArray
                  proposalId={proposal.proposal_id.toString()}
                  choice="for"
                  totalVotingPower={proposal.votes_for_power}
                />
              </Box>
              <Box
                width="50%"
                ml="2"
                p="3"
                bg="whiteAlpha.50"
                borderRadius="lg"
              >
                <Text color="red.500" mb="1" fontSize="2xs" fontWeight="500">
                  {proposal.votes_against} Addresses
                </Text>
                <VoteArray
                  proposalId={proposal.proposal_id.toString()}
                  choice="against"
                  totalVotingPower={proposal.votes_against_power}
                />
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
      )}
    </Flex>
  );
};

export default VoteStats;
