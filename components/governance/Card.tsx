import React, { FC } from "react";
import {
  GridItem,
  Flex,
  Center,
  Box,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { NextLink } from "modules/common";
import {
  getProposalStatusProperties,
  convertTimestampToDate,
} from "modules/common/helpers";
import { GovernanceProposal } from "types/common";

import ProgressBar from "components/governance/ProgressBar";

type Props = {
  proposal: GovernanceProposal;
};

const CardHeader = ({ status, title, endDate }) => {
  const proposalStatus = getProposalStatusProperties(status);

  return (
    <Box pl="5" pt="5">
      <Flex
        justify="space-between"
        fontSize="sm"
        height="24px"
        lineHeight="24px"
      >
        <Box
          borderWidth="1px"
          borderColor={proposalStatus.color}
          px="2"
          borderRadius="md"
          bg={proposalStatus.lightColor}
          color={proposalStatus.color}
        >
          {proposalStatus.title}
        </Box>
        <Box width="160px" bg="#000D37" pl="2" borderLeftRadius="4px">
          {convertTimestampToDate(endDate)}
        </Box>
      </Flex>
      <Flex pt="5">{title}</Flex>
    </Box>
  );
};

const CardBody = () => {
  return (
    <Flex
      flexDirection="column"
      borderY="1px"
      borderColor="white.100"
      height="100%"
      fontSize="sm"
      p="5"
    >
      <Flex mt="5">
        <ProgressBar voteFor={20} voteAgainst={20} quorum={40} />
      </Flex>
      <HStack mt="5" spacing="5">
        <Flex align="center">
          <Box w="12px" h="12px" borderRadius="50%" bg="green.500" />
          <Text pl="2">20% Votes for</Text>
        </Flex>
        <Flex align="center">
          <Box w="12px" h="12px" borderRadius="50%" bg="red.500" />
          <Text pl="2">20% Votes against</Text>
        </Flex>
      </HStack>
    </Flex>
  );
};

const CardFooter = ({ description, address, id }) => {
  return (
    <Flex p="5" flexDirection="column" height="100%">
      <Box fontSize="sm" color="white.400" maxH="80px" overflow="hidden">
        {description}
      </Box>
      <Box mt="2" mb="auto" color="white.700" fontSize="sm">
        by: {address}
      </Box>
      <Flex justify="center">
        <NextLink href={`/governance/proposal/${id}`} passHref>
          <Button
            variant="primarywhite"
            type="button"
            borderRadius="md"
            w="250px"
          >
            View Proposal
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  );
};

const Card: FC<Props> = ({ proposal }) => {
  return (
    <GridItem
      h="465px"
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
      bg="brand.defaultTable"
      borderWidth="2px"
      borderColor="white.100"
      borderRadius="2xl"
    >
      <Box h="105px" w="100%">
        <CardHeader
          status={proposal.status}
          title={proposal.title}
          endDate={proposal.endDate}
        />
      </Box>
      <Box h="150px" w="100%">
        <CardBody />
      </Box>
      <Box flex="1" w="100%">
        <CardFooter
          description={proposal.description}
          address={proposal.address}
          id={proposal.id}
        />
      </Box>
    </GridItem>
  );
};

export default Card;
