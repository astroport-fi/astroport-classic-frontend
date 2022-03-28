import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { WalletStatus } from "@terra-money/wallet-provider";
import { handleBigAndTinyAmount, NextLink } from "modules/common";
import { useVotingPower } from "modules/governance/hooks";
import React, { FC } from "react";

type Props = {
  id: string;
  address: string;
  status: WalletStatus;
  totalVotePower: number | null;
  proposalContract: any;
};

const VotePower: FC<Props> = ({
  id,
  address,
  status,
  totalVotePower,
  proposalContract,
}) => {
  const isOwner = address === proposalContract?.submitter;
  const isVotingOver = proposalContract?.status !== "Active";
  const isVotedFor = proposalContract?.for_voters.includes(address);
  const isVotedAgainst = proposalContract?.against_voters.includes(address);

  const showVotingOptions = !isVotingOver && !isVotedFor && !isVotedAgainst;
  const userVotingPower = useVotingPower({ proposal_id: Number(id) });
  const userVotingPowerPerc =
    userVotingPower && totalVotePower
      ? (userVotingPower / totalVotePower) * 100
      : `-`;

  return (
    <Box h="200px" bg="white.50" mb="3" p="5" borderRadius="xl">
      <Text fontSize="xs">My Voting Power</Text>
      <Box bg="blackAlpha.400" p="3" mt="3" borderRadius="lg">
        <Text>{userVotingPower ? userVotingPower.toLocaleString() : `-`}</Text>
        <Text fontSize="sm" mt="2px" color="whiteAlpha.400">
          {handleBigAndTinyAmount(userVotingPowerPerc)}%
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
