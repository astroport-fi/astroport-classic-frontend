import React, { FC } from "react";
import {
  GridItem,
  Center,
  Flex,
  Box,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { NextLink } from "modules/common";
import { truncateStr } from "modules/common/helpers";
import {
  getProposalStatusProperties,
  getProposalEndDateString,
} from "modules/governance/helpers";
import { GovernanceProposal } from "types/common";

import ProgressBar from "components/governance/ProgressBar";
import ProgressLabel from "components/governance/ProgressLabel";

type Props = {
  proposal: GovernanceProposal;
};

const CardHeader = ({ status, title, endDate }) => {
  const proposalStatus = getProposalStatusProperties(status);

  return (
    <Box h="105px" w="100%">
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
          <Flex width="170px" bg="brand.dark" pl="2" borderLeftRadius="md">
            <Text color="white.400">Ends:</Text>
            <Text pl="1">{getProposalEndDateString(endDate)}</Text>
          </Flex>
        </Flex>
        <Flex pt="5">{title}</Flex>
      </Box>
    </Box>
  );
};

const CardBody = ({ voteFor, voteAgainst, quorum }) => {
  return (
    <Box h="150px" w="100%">
      <Flex
        flexDirection="column"
        borderY="1px"
        borderColor="white.100"
        height="100%"
        fontSize="sm"
        p="5"
      >
        <Flex mt="5">
          <ProgressBar
            voteFor={voteFor}
            voteAgainst={voteAgainst}
            quorum={quorum}
          />
        </Flex>
        <ProgressLabel voteFor={voteFor} voteAgainst={voteAgainst} />
      </Flex>
    </Box>
  );
};

const CardFooter = ({ description, address, id }) => {
  return (
    <Box flex="1" w="100%">
      <Flex p="5" flexDirection="column" height="100%">
        <Box fontSize="sm" color="white.400" maxH="80px" overflow="hidden">
          {description}
        </Box>
        <Box mt="3" mb="auto" color="white.700" fontSize="sm" title={address}>
          by: {truncateStr(address, 15)}
        </Box>
        <Flex justify="center" mb="2">
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
    </Box>
  );
};

const Card: FC<Props> = ({ proposal }) => {
  return (
    <GridItem h="485px" overflow="hidden">
      <Center
        h="100%"
        flexDirection="column"
        bg="brand.defaultTable"
        borderWidth="2px"
        borderColor="white.100"
        borderRadius="2xl"
      >
        <CardHeader
          status={proposal.status}
          title={proposal.title}
          endDate={proposal.endDate}
        />
        <CardBody voteFor={20} voteAgainst={20} quorum={40} />
        <CardFooter
          description={proposal.description}
          address={proposal.address}
          id={proposal.id}
        />
      </Center>
    </GridItem>
  );
};

export default Card;
