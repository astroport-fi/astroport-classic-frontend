import React, { FC } from "react";
import Link from "next/link";
import { Flex, HStack, Text, IconButton } from "@chakra-ui/react";
import BackIcon from "components/icons/BackIcon";
import TwitterIcon from "components/icons/TwitterIcon";
import { Proposal_Status } from "types/common";
import StatusTitle from "components/proposal/StatusTitle";

type Props = {
  isMobile: boolean | undefined;
  title: string;
  state: Proposal_Status;
  twitterLink: string;
};

const BackButton = () => {
  return (
    <Link href="/governance" passHref>
      <IconButton
        aria-label="Back"
        size="xs"
        variant="icon"
        isRound
        icon={<BackIcon />}
      />
    </Link>
  );
};

const TweetButton = ({ twitterLink }: { twitterLink: string }) => {
  return (
    <IconButton
      bg="brand.purple"
      aria-label="Tweet"
      size="xs"
      variant="icon"
      border="none"
      p="1"
      ml="2"
      isRound
      icon={<TwitterIcon />}
      onClick={() => {
        window.open(twitterLink, "_blank");
      }}
    />
  );
};

const Header: FC<Props> = ({ isMobile, title, state, twitterLink }) => {
  return isMobile ? (
    <Flex mb="5" flexDirection="column" justify="space-between">
      <HStack spacing={4}>
        <Text fontSize="large">{title}</Text>
      </HStack>
      <Flex mt="4" justify="space-between">
        <StatusTitle state={state} />
        <TweetButton twitterLink={twitterLink} />
      </Flex>
    </Flex>
  ) : (
    <Flex mb="5" align="center" justify="space-between">
      <HStack spacing={4}>
        <BackButton />
        <Text fontSize="xl">{title}</Text>
        <StatusTitle state={state} />
      </HStack>
      <TweetButton twitterLink={twitterLink} />
    </Flex>
  );
};

export default Header;
