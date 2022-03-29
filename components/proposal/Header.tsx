import React, { FC } from "react";
import Link from "next/link";
import { Flex, HStack, Text, IconButton, Box } from "@chakra-ui/react";

import BackIcon from "components/icons/BackIcon";
import TwitterIcon from "components/icons/TwitterIcon";
import { Proposal_Status } from "types/common";
import StatusTitle from "components/proposal/StatusTitle";

type Props = {
  title: string;
  state: Proposal_Status;
  twitterLink: string;
};

const Header: FC<Props> = ({ title, state, twitterLink }) => {
  return (
    <Flex mb="5" justify="space-between">
      <HStack spacing={4}>
        <Link href="/governance" passHref>
          <IconButton
            aria-label="Back"
            size="xs"
            variant="icon"
            isRound
            icon={<BackIcon />}
          />
        </Link>
        <Text fontSize="xl">{title}</Text>
        <StatusTitle state={state} />
      </HStack>
      <IconButton
        bg="brand.purple"
        aria-label="Tweet"
        size="xs"
        variant="icon"
        border="none"
        p="1"
        isRound
        icon={<TwitterIcon />}
        onClick={() => {
          window.open(twitterLink, "_blank");
        }}
      />
    </Flex>
  );
};

export default Header;
