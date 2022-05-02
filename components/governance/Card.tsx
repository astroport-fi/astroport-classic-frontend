import React, { FC } from "react";
import {
  GridItem,
  Center,
  Flex,
  Box,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import useFinder from "hooks/useFinder";
import { NextLink, truncateStr } from "modules/common";
import {
  getProposalEndDateString,
  calcVotingPower,
} from "modules/governance/helpers";
import { Proposal, Proposal_Status } from "types/common";
import ProgressBar from "components/governance/ProgressBar";
import ProgressLabel from "components/governance/ProgressLabel";
import StatusTitle from "components/proposal/StatusTitle";

type Props = {
  proposal: Proposal;
  quorum?: string | undefined;
};

const CardHeader = ({
  state,
  title,
  endTimestamp,
}: {
  state: Proposal_Status;
  title: string;
  endTimestamp: string;
}) => {
  const voteTimeLabel = getProposalEndDateString(endTimestamp);

  return (
    <Box h="105px" w="100%">
      <Box pl="5" pt="5">
        <Flex
          justify="space-between"
          fontSize="sm"
          height="24px"
          lineHeight="24px"
        >
          <StatusTitle state={state} />
          <Flex width="170px" bg="brand.dark" pl="2" borderLeftRadius="md">
            <Text color="white.400">{voteTimeLabel[0]}</Text>
            <Text pl="1">{voteTimeLabel[1]}</Text>
          </Flex>
        </Flex>
        <Flex pt="5">{truncateStr(title, 35)}</Flex>
      </Box>
    </Box>
  );
};

const CardBody = ({ proposal, quorum }: Props) => {
  const { voteForPower, voteAgainstPower } = calcVotingPower(proposal);

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
            voteFor={voteForPower}
            voteAgainst={voteAgainstPower}
            quorum={Number(quorum) * 100 || null}
          />
        </Flex>
        <ProgressLabel proposal={proposal} />
      </Flex>
    </Box>
  );
};

const CardFooter = ({
  description,
  address,
  id,
}: {
  description: string;
  address: string;
  id: string;
}) => {
  const finder = useFinder();

  return (
    <Box flex="1" w="100%">
      <Flex p="5" flexDirection="column" height="100%">
        <Box fontSize="sm" color="whiteAlpha.600" maxH="80px" overflow="hidden">
          {truncateStr(description, 300)}
        </Box>
        <Box
          mt="3"
          mb="auto"
          color="whiteAlpha.800"
          fontSize="sm"
          title={address}
        >
          by:{" "}
          <Link href={finder(address)} isExternal>
            {address}
          </Link>
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

const Card: FC<Props> = ({ proposal, quorum }) => {
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
          state={proposal.state}
          title={proposal.title}
          endTimestamp={proposal.end_timestamp}
        />
        <CardBody proposal={proposal} quorum={quorum || ""} />
        <CardFooter
          description={proposal.description}
          address={proposal.submitter}
          id={proposal.proposal_id}
        />
      </Center>
    </GridItem>
  );
};

export default Card;
