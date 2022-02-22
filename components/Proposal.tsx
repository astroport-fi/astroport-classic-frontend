import React, { FC, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  Center,
  HStack,
  Text,
  Code,
} from "@chakra-ui/react";
import { useProposals } from "modules/governance";

import ProposalHeader from "components/proposal/Header";
import ProposalTime from "components/proposal/Time";
import ProposalVoteStats from "components/proposal/VoteStats";

import ProgressBar from "components/governance/ProgressBar";
import TimelineBar from "components/governance/TimelineBar";

type Props = {
  id: string;
};

const HistoryBox = ({ history }: any) => {
  return (
    <Flex
      flexDirection="column"
      mb="3"
      p="6"
      h="140px"
      bg="white.50"
      borderRadius="xl"
      width="100%"
    >
      <Text mb="6">Proposal History</Text>
      <TimelineBar
        dates={history?.dates}
        active={history?.status}
        completion={history?.completed}
      />
    </Flex>
  );
};

const DescriptionBox = ({ address, description }) => {
  return (
    <Box minH="250px" bg="white.50" mb="3" p="6" borderRadius="xl" width="100%">
      <Text mb="3">Description</Text>
      <Text mb="3" color="whiteAlpha.600" fontSize="sm">
        by: {address}
      </Text>
      <Text color="whiteAlpha.400" fontSize="sm">
        {description}
      </Text>
    </Box>
  );
};

const MsgBox = ({ msg }) => {
  return (
    <Box minH="150px" bg="white.50" mb="3" p="6" borderRadius="xl" width="100%">
      <Text mb="3">Executable Messages</Text>
      <Code bg="none" color="whiteAlpha.400" fontSize="sm">
        {msg}
      </Code>
    </Box>
  );
};

const MyVotingPowerBox = ({ id }) => {
  return (
    <Box h="200px" bg="white.50" mb="3" p="5" borderRadius="xl">
      <Text fontSize="xs">My Voting Power</Text>
      <Box bg="blackAlpha.400" p="3" my="3" borderRadius="lg">
        <Text>9,999,999.00</Text>
        <Text fontSize="sm" color="whiteAlpha.400">
          x.xxx%
        </Text>
      </Box>
      <Flex>
        <Link href={`/governance/proposal/${id}/vote/for`} passHref>
          <Button width="50%" mr="1" variant="votegreen">
            Vote For
          </Button>
        </Link>
        <Link href={`/governance/proposal/${id}/vote/against`} passHref>
          <Button width="50%" ml="1" variant="votered">
            Vote Against
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

const DiscussionBox = ({ link }) => {
  const forumLink = "https://forum.astroport.fi";

  return (
    <Flex
      flexDirection="column"
      h="190px"
      bg="proposalColours.purpleAlt"
      p="5"
      borderRadius="xl"
      color="blackAlpha.900"
      fontSize=".875rem"
      borderColor="proposalColours.purple"
      borderWidth="2px"
    >
      <Text fontWeight="500">Discuss</Text>
      <Text mt="2" mb="auto">
        Have thoughts about this proposal?
        <br />
        Discuss with others on the forum.
      </Text>
      <Button
        variant="primary"
        borderRadius="md"
        onClick={() => {
          window.open(forumLink, "_blank");
        }}
      >
        Go To Forum
      </Button>
    </Flex>
  );
};

const LeftColumn = ({ proposal, addressOpen, setAddressOpen }) => {
  return (
    <Flex flexDirection="column" w={["100%", "100%", "66.6%"]} mr="5">
      <ProposalTime endDate={proposal.endDate} />
      <ProposalVoteStats
        proposal={proposal}
        addressOpen={addressOpen}
        onClick={() => setAddressOpen(!addressOpen)}
      />
      <HistoryBox history={proposal.history} />
      <DescriptionBox
        address={proposal.address}
        description={proposal.description}
      />
      <MsgBox msg={proposal.msg} />
    </Flex>
  );
};

const RightColumn = ({ id, discussionLink }) => {
  return (
    <Flex display={["none", "none", "flex"]} flexDirection="column" w="33.3%">
      <MyVotingPowerBox id={id} />
      <DiscussionBox link={discussionLink} />
    </Flex>
  );
};

const Proposal: FC<Props> = ({ id }) => {
  const proposals = useProposals();
  const proposal = proposals.find((p) => p.id === id);
  const [addressOpen, setAddressOpen] = useState(false);
  const twitterLink = `https://www.twitter.com/share?url=https://app.astroport.fi/governance/proposal/${id}`;

  return (
    <Box>
      <ProposalHeader title={proposal.title} twitterLink={twitterLink} />
      <Flex>
        <LeftColumn
          proposal={proposal}
          addressOpen={addressOpen}
          setAddressOpen={setAddressOpen}
        />
        <RightColumn id={id} discussionLink={proposal.link} />
      </Flex>
    </Box>
  );
};

export default Proposal;
