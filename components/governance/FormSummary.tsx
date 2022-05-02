import React, { FC } from "react";
import { Heading, Box, Flex, Text, Code, Link } from "@chakra-ui/react";
import { Proposal } from "types/common";
import { handleBigAndTinyAmount, truncateStr } from "modules/common/helpers";
import Warning from "components/icons/Warning";

type Props = {
  proposal: Proposal;
  xAstroRequiredTokens?: number | undefined;
  xAstroPrice?: number | undefined;
};

const FormTextHeader = (text: string) => {
  return (
    <Heading mb="4" ml="1" fontSize="xs">
      {text}:
    </Heading>
  );
};

const FormBlock = ({
  children,
  overflow = "hidden",
  maxH = undefined,
  overflowY = undefined,
}: {
  children: any;
  maxH?: any;
  overflowY?: any;
  overflow?: any;
}) => {
  return (
    <Box
      bg="white.50"
      p="4"
      borderRadius="lg"
      maxH={maxH}
      overflowY={overflowY}
      overflow={overflow}
    >
      {children}
    </Box>
  );
};

const ForumSummary: FC<Props> = ({
  proposal,
  xAstroRequiredTokens,
  xAstroPrice,
}) => {
  const { title, description, messages, link } = proposal;
  const hasExecMsg = messages && messages.length > 0;

  return (
    <Box fontSize="0.875rem">
      <Box mb="8">
        {FormTextHeader("Proposal Title")}
        <FormBlock>
          <Text isTruncated title={title}>
            {title}
          </Text>
        </FormBlock>
      </Box>
      <Box mb="8">
        {FormTextHeader("Proposal Description")}
        <FormBlock maxH="40" overflowY="auto" overflow="">
          <Text>{description}</Text>
        </FormBlock>
      </Box>
      <Box mb="8">
        {FormTextHeader("Executable Messages")}
        <FormBlock maxH="40" overflowY="auto" overflow="">
          {hasExecMsg && (
            <Code bg="none" color="inherit">
              {messages}
            </Code>
          )}
          {!hasExecMsg && (
            <Text fontSize="sm" color="whiteAlpha.400">
              No executable messages.
            </Text>
          )}
        </FormBlock>
      </Box>
      <Box mb="8">
        {FormTextHeader("Additional Info")}
        <FormBlock>
          <Flex justify="space-between" fontSize="sm" mb="1">
            <Text fontSize="xs">Link:</Text>
            <Link href={link} isExternal>
              <Text color="white.600" fontSize="2xs">
                {link && truncateStr(link, 35)}
              </Text>
            </Link>
          </Flex>
          <Flex justify="space-between" fontSize="sm">
            <Text fontSize="xs">Deposit:</Text>
            <Text color="white.600" fontSize="2xs">
              {xAstroRequiredTokens} xASTRO ($
              {!!xAstroPrice &&
                !!xAstroRequiredTokens &&
                handleBigAndTinyAmount(xAstroPrice * xAstroRequiredTokens)}
              )
            </Text>
          </Flex>
        </FormBlock>
      </Box>
      <Box mb="8">
        <FormBlock>
          <Flex align="center">
            <Flex shrink={0}>
              <Warning />
            </Flex>
            <Text mx="3" fontSize="xs">
              Please be aware that new proposals can take a few mins to show up
              on the dashboard. Also note that you will not be able to vote on
              your own proposal.
            </Text>
          </Flex>
        </FormBlock>
      </Box>
    </Box>
  );
};

export default ForumSummary;
