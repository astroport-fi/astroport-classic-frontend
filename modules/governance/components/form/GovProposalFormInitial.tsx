import React, { FC } from "react";
import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";
import { useFormContext } from "react-hook-form";
import { FormActions, FormTextItem } from "modules/common";
import { GovProposalFormFooter } from "modules/governance";

type Props = {
  fee: Fee;
  onClick: () => void;
};

const GovProposalFormInitial: FC<Props> = ({ fee, onClick }) => {
  const { watch, setValue } = useFormContext();
  const [title, description, msg, link] = [
    watch("title"),
    watch("description"),
    watch("msg"),
    watch("link"),
  ];

  return (
    <>
      <FormActions>
        <Heading>Submit Proposal</Heading>
      </FormActions>

      <FormTextItem
        title="Set Title:"
        type="input"
        value={title}
        onChange={(text) => setValue("title", text)}
      />
      <FormTextItem
        title="Insert Description:"
        type="textarea"
        value={description}
        onChange={(text) => setValue("description", text)}
      />
      <FormTextItem
        title="Executable Messages:"
        type="textarea"
        value={msg}
        onChange={(text) => setValue("msg", text)}
      />
      <FormTextItem
        title="Insert Link to Discussion:"
        placeholder="https://discord.gg/..."
        type="input"
        value={link}
        onChange={(text) => setValue("link", text)}
      />

      {/* Deposit Box. More work to be done here... */}
      <Box
        bg="brand.defaultTable"
        py={["2", "5"]}
        px={["4", "8"]}
        mb="5"
        borderWidth="none"
        borderRadius="xl"
        position="relative"
        color="white"
      >
        <Flex mb="2" mx="1" fontSize="sm" justify="space-between">
          <Text>Deposit:</Text>
          <Flex>
            <Text color="white.500">In Wallet:</Text>
            <Text ml="2">2,000 ASTRO</Text>
          </Flex>
        </Flex>
        <Box bg="black.400" px="5" py="3" borderRadius="md">
          <Flex color="white.600" fontSize="md">
            5000.00 xASTRO
          </Flex>
          <Flex color="white.400" fontSize="sm">
            $7,500.00
          </Flex>
        </Box>
      </Box>
      {/* Deposit Box. More work to be done here... */}

      <GovProposalFormFooter
        fee={fee}
        txFeeNotEnough={false}
        onConfirmClick={onClick}
      />
    </>
  );
};

export default GovProposalFormInitial;
