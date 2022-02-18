import React, { FC } from "react";
import { GridItem, Flex, Center, Box, Text, Button } from "@chakra-ui/react";
import { NextLink } from "modules/common";
import {
  getProposalStatusProperties,
  convertTimestampToDate,
} from "modules/common/helpers";
import { GovernanceProposal } from "types/common";

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
    <Center
      borderY="1px"
      borderColor="white.100"
      height="100%"
      fontSize="sm"
      fontStyle="italic"
      p="5"
    >
      Voting information...
    </Center>
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
      h="450px"
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
      <Box h="135px" w="100%">
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
