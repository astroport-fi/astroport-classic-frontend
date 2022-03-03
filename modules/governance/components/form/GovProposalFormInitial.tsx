import React, { FC } from "react";
import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { FormActions, FormTextItem } from "modules/common";
import { GovProposalFormFooter } from "modules/governance";
import { GovernanceProposal } from "types/common";

type Props = {
  fee: Fee;
  inputErrors: any;
  methods: UseFormReturn<GovernanceProposal, object>;
};

const CommonFormProps = (
  type: "input" | "textarea",
  id: string,
  title: string
) => {
  return { type, id, title };
};

const GovProposalFormInitial: FC<Props> = ({ fee, inputErrors, methods }) => {
  const { watch } = useFormContext();
  const [title, description, msg, link] = [
    watch("title"),
    watch("description"),
    watch("msg"),
    watch("link"),
  ];

  return (
    <>
      <FormActions>
        <Heading fontSize="lg">Submit Proposal</Heading>
      </FormActions>

      <FormTextItem
        {...CommonFormProps("input", "title", "Set Title:")}
        value={title}
        formRegister={methods.register}
        error={inputErrors?.title || null}
        required={true}
        onChange={(text) => methods.setValue("title", text)}
      />
      <FormTextItem
        {...CommonFormProps("textarea", "description", "Insert Description:")}
        value={description}
        formRegister={methods.register}
        error={inputErrors?.description || null}
        required={true}
        onChange={(text) => methods.setValue("description", text)}
      />
      <FormTextItem
        {...CommonFormProps("textarea", "msg", "Executable Messages:")}
        fontFamily="mono"
        fontSize="sm"
        _placeholder={{ color: "white.400" }}
        value={msg}
        formRegister={methods.register}
        required={false}
        onChange={(text) => methods.setValue("msg", text)}
      />
      <FormTextItem
        {...CommonFormProps("input", "link", "Insert Link to Discussion:")}
        placeholder="https://discord.gg/..."
        value={link}
        formRegister={methods.register}
        required={false}
        onChange={(text) => methods.setValue("link", text)}
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
            <Text ml="2">2,000 xASTRO</Text>
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

      <GovProposalFormFooter fee={fee} txFeeNotEnough={false} />
    </>
  );
};

export default GovProposalFormInitial;
