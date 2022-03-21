import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { WalletStatus } from "@terra-money/wallet-provider";
import { NextLink } from "modules/common";
import React, { FC } from "react";

type Props = {
  id: string;
  address: string;
  status: WalletStatus;
  proposalContract: any;
};

const VotePower: FC<Props> = ({ id, address, status, proposalContract }) => {
  const isOwner = address === proposalContract?.submitter;
  const isVotingOver = proposalContract?.status !== "Active";
  const isVotedFor = proposalContract?.for_voters.includes(address);
  const isVotedAgainst = proposalContract?.against_voters.includes(address);

  const showVotingOptions = !isVotingOver && !isVotedFor && !isVotedAgainst;

  return (
    <Box h="200px" bg="white.50" mb="3" p="5" borderRadius="xl">
      <Text fontSize="xs">My Voting Power</Text>
      <Box bg="blackAlpha.400" p="3" mt="3" borderRadius="lg">
        <Text>x,xxx,xxx.xx</Text>
        <Text fontSize="sm" color="whiteAlpha.400">
          x.xxx%
        </Text>
      </Box>
      <Flex mt="4">
        {showVotingOptions && (
          <>
            <NextLink
              href={`/governance/proposal/${id}/vote/for`}
              passHref
              isDisabled={
                status === WalletStatus.WALLET_NOT_CONNECTED || isOwner
              }
            >
              <Button
                width="50%"
                mr="1"
                variant={isOwner ? "voteinvalid" : "votegreen"}
                isDisabled={
                  status === WalletStatus.WALLET_NOT_CONNECTED || isOwner
                }
              >
                Vote For
              </Button>
            </NextLink>
            <NextLink
              href={`/governance/proposal/${id}/vote/against`}
              passHref
              isDisabled={
                status === WalletStatus.WALLET_NOT_CONNECTED || isOwner
              }
            >
              <Button
                width="50%"
                ml="1"
                variant={isOwner ? "voteinvalid" : "votered"}
                isDisabled={
                  status === WalletStatus.WALLET_NOT_CONNECTED || isOwner
                }
              >
                Vote Against
              </Button>
            </NextLink>
          </>
        )}
        {!showVotingOptions && (
          <Flex
            fontSize="sm"
            w="100%"
            h="10"
            borderRadius="md"
            bg={
              isVotedFor
                ? "proposalColours.greenLight"
                : isVotedAgainst
                ? "proposalColours.redLight"
                : "white.100"
            }
            align="center"
            justify="center"
          >
            {(isVotedFor || isVotedAgainst) && (
              <Text
                color={
                  isVotedFor ? "proposalColours.green" : "proposalColours.red"
                }
                fontWeight="500"
              >{`Voted ${
                isVotedFor ? "in favor of" : "against the"
              } proposal`}</Text>
            )}
            {!(isVotedFor || isVotedAgainst) && (
              <Text color="whiteAlpha.400" fontWeight="500">
                You did not vote
              </Text>
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default VotePower;
