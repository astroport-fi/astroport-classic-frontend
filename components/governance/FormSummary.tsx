import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { GovernanceProposal } from "types/common";

type Props = {
  proposal: GovernanceProposal;
};

const FormTextHeader = (text) => {
  return (
    <Text mb="3" ml="1" fontSize="sm">
      {text}
    </Text>
  );
};

const FormBlock = ({ children }) => {
  return (
    <Box bg="white.50" p="4" borderRadius="md">
      {children}
    </Box>
  );
};

const ForumSummary: FC<Props> = ({ proposal }) => {
  const { title, description, msg, link } = proposal;

  return (
    <Box>
      <Box mb="5">
        {FormTextHeader("Proposal Title")}
        <FormBlock>
          <Text>{title}</Text>
        </FormBlock>
      </Box>
      <Box mb="5">
        {FormTextHeader("Proposal Description")}
        <FormBlock>
          <Text>{description}</Text>
        </FormBlock>
      </Box>
      <Box mb="5">
        {FormTextHeader("Executable Messages")}
        <FormBlock>
          <Text>{msg}</Text>
        </FormBlock>
      </Box>
      <Box mb="5">
        {FormTextHeader("Additional Info")}
        <FormBlock>
          <Flex justify="space-between" fontSize="sm" mb="1">
            <Text>Link to Discord:</Text>
            <Text>{link}</Text>
          </Flex>
          <Flex justify="space-between" fontSize="sm">
            <Text>Deposit:</Text>
            <Text>5,000 ASTRO ($250.00)</Text>
          </Flex>
        </FormBlock>
      </Box>
    </Box>
  );
};

export default ForumSummary;
