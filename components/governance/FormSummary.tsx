import React, { FC } from "react";
import { Heading, Box, Flex, Text, Code } from "@chakra-ui/react";
import { GovernanceProposal } from "types/common";

type Props = {
  proposal: GovernanceProposal;
};

const FormTextHeader = (text) => {
  return (
    <Heading mb="4" ml="1" fontSize="xs">
      {text}:
    </Heading>
  );
};

const FormBlock = ({ children }) => {
  return (
    <Box bg="white.50" p="4" borderRadius="lg">
      {children}
    </Box>
  );
};

const ForumSummary: FC<Props> = ({ proposal }) => {
  const { title, description, msg, link } = proposal;

  return (
    <Box>
      <Box mb="8">
        {FormTextHeader("Proposal Title")}
        <FormBlock>
          <Text>{title}</Text>
        </FormBlock>
      </Box>
      <Box mb="8">
        {FormTextHeader("Proposal Description")}
        <FormBlock>
          <Text>{description}</Text>
        </FormBlock>
      </Box>
      <Box mb="8">
        {FormTextHeader("Executable Messages")}
        <FormBlock>
          <Code bg="none" color="inherit">
            {msg}
          </Code>
        </FormBlock>
      </Box>
      <Box mb="8">
        {FormTextHeader("Additional Info")}
        <FormBlock>
          <Flex justify="space-between" fontSize="sm" mb="1">
            <Text fontSize="xs">Link to Discord:</Text>
            <Text color="white.600" fontSize="2xs">
              {link}
            </Text>
          </Flex>
          <Flex justify="space-between" fontSize="sm">
            <Text fontSize="xs">Deposit:</Text>
            <Text color="white.600" fontSize="2xs">
              5,000 xASTRO ($250.00)
            </Text>
          </Flex>
        </FormBlock>
      </Box>
    </Box>
  );
};

export default ForumSummary;
