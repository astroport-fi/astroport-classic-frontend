import React, { FC, useState } from "react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { useTerraWebapp } from "@arthuryeti/terra";
import { Box, Button, Flex, Link, Text, Code } from "@chakra-ui/react";
import useFinder from "hooks/useFinder";
import { NextLink } from "modules/common";
import { useProposal } from "modules/governance";
import { composeTwitterLink } from "modules/governance/helpers";

import ProposalHeader from "components/proposal/Header";
import ProposalTime from "components/proposal/Time";
import ProposalVoteStats from "components/proposal/VoteStats";
import TimelineBar from "components/governance/TimelineBar";
import FormLoading from "components/common/FormLoading";

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
  const finder = useFinder();

  return (
    <Box minH="250px" bg="white.50" mb="3" p="6" borderRadius="xl" width="100%">
      <Text mb="3">Description</Text>
      <Text mb="3" color="whiteAlpha.600" fontSize="sm">
        by:{" "}
        <Link href={finder(address)} isExternal>
          {address}
        </Link>
      </Text>
      <Box maxH="40" overflowY="auto">
        <Text color="whiteAlpha.400" fontSize="sm">
          {description}
        </Text>
      </Box>
    </Box>
  );
};

const MsgBox = ({ msg }) => {
  return (
    <Box minH="150px" bg="white.50" mb="3" p="6" borderRadius="xl" width="100%">
      <Text mb="3">Executable Messages</Text>
      <Box maxH="40" overflowY="auto">
        <Code bg="none" color="whiteAlpha.400" fontSize="sm">
          {msg}
        </Code>
      </Box>
    </Box>
  );
};

const MyVotingPowerBox = ({ id, status }) => {
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
        <NextLink
          href={`/governance/proposal/${id}/vote/for`}
          passHref
          isDisabled={status === WalletStatus.WALLET_NOT_CONNECTED}
        >
          <Button
            width="50%"
            mr="1"
            variant="votegreen"
            isDisabled={status === WalletStatus.WALLET_NOT_CONNECTED}
          >
            Vote For
          </Button>
        </NextLink>
        <NextLink
          href={`/governance/proposal/${id}/vote/against`}
          passHref
          isDisabled={status === WalletStatus.WALLET_NOT_CONNECTED}
        >
          <Button
            width="50%"
            ml="1"
            variant="votered"
            isDisabled={status === WalletStatus.WALLET_NOT_CONNECTED}
          >
            Vote Against
          </Button>
        </NextLink>
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
      <ProposalTime endDate={proposal.endDate} status={proposal.status} />
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

const RightColumn = ({ id, status, discussionLink }) => {
  return (
    <Flex display={["none", "none", "flex"]} flexDirection="column" w="33.3%">
      <MyVotingPowerBox id={id} status={status} />
      <DiscussionBox link={discussionLink} />
    </Flex>
  );
};

const Proposal: FC<Props> = ({ id }) => {
  const { status } = useWallet();
  const proposal = useProposal(id);
  const { network } = useTerraWebapp();
  const [addressOpen, setAddressOpen] = useState(false);
  const twitterLink = composeTwitterLink(network.name, proposal?.title, id);

  if (!proposal) {
    return <FormLoading />;
  }

  return (
    <Box>
      <ProposalHeader
        title={proposal.title}
        state={proposal.state}
        twitterLink={twitterLink}
      />
      {/* <ProposalFooter
      <Flex>
        <LeftColumn
          proposal={proposal}
          addressOpen={addressOpen}
          setAddressOpen={setAddressOpen}
        />
        <RightColumn id={id} status={status} discussionLink={proposal.link} />
      </Flex>
      */}
    </Box>
  );
};

export default Proposal;
