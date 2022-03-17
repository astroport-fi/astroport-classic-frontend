import React, { FC } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { FormActions, FormTextItem } from "modules/common";
import { GovProposalFormFooter } from "modules/governance";
import { Proposal } from "types/common";
import { ONE_TOKEN } from "constants/constants";
import DepositBox from "components/proposal/DepositBox";
import ErrorBox from "components/proposal/ErrorBox";

type Props = {
  fee: Fee;
  txFeeNotEnough?: boolean;
  feeIsLoading?: boolean;
  xAstroPrice?: number;
  xAstroRequired?: string;
  xAstroBalance?: string;
  inputErrors: any;
  methods: UseFormReturn<Proposal, object>;
};

const CommonFormProps = (
  type: "input" | "textarea",
  id: string,
  title: string
) => {
  return { type, id, title };
};

const GovProposalFormInitial: FC<Props> = ({
  fee,
  txFeeNotEnough,
  feeIsLoading,
  xAstroPrice,
  xAstroRequired,
  xAstroBalance,
  inputErrors,
  methods,
}) => {
  const { watch } = useFormContext();
  const [title, description, messages, link] = [
    watch("title"),
    watch("description"),
    watch("messages"),
    watch("link"),
  ];

  const xAstroRequiredTokens = Number(xAstroRequired) / ONE_TOKEN || null;
  const xAstroBalanceTokens = Number(xAstroBalance) / ONE_TOKEN || null;
  const balanceError = xAstroRequiredTokens > xAstroBalanceTokens || false;

  return (
    <>
      <FormActions>
        <Flex flexDirection="column">
          <Heading fontSize="lg">Submit Proposal</Heading>
          {xAstroRequiredTokens && (
            <Heading fontSize="sm" mt="2px" color="white.300">
              You need {xAstroRequiredTokens} xASTRO that will be locked in
              order to submit a proposal
            </Heading>
          )}
        </Flex>
      </FormActions>

      {balanceError && <ErrorBox />}

      <FormTextItem
        {...CommonFormProps("input", "title", "Set Title:")}
        value={title}
        formRegister={methods.register}
        error={inputErrors?.title || null}
        onChange={(text) => {
          methods.setValue("title", text);
          methods.clearErrors("title");
        }}
      />
      <FormTextItem
        {...CommonFormProps("textarea", "description", "Insert Description:")}
        value={description}
        formRegister={methods.register}
        error={inputErrors?.description || null}
        onChange={(text) => {
          methods.setValue("description", text);
          methods.clearErrors("description");
        }}
      />
      <FormTextItem
        {...CommonFormProps("textarea", "messages", "Executable Messages:")}
        fontFamily="mono"
        fontSize="sm"
        _placeholder={{ color: "white.400" }}
        value={messages}
        formRegister={methods.register}
        error={inputErrors?.messages || null}
        onChange={(text) => {
          methods.setValue("messages", text);
          methods.clearErrors("messages");
        }}
      />
      <FormTextItem
        {...CommonFormProps("input", "link", "Insert Link to Discussion:")}
        placeholder="https://discord.gg/..."
        value={link}
        formRegister={methods.register}
        error={inputErrors?.link || null}
        onChange={(text) => {
          methods.setValue("link", text);
          methods.clearErrors("link");
        }}
      />

      <DepositBox
        xAstroRequiredTokens={xAstroRequiredTokens}
        xAstroBalanceTokens={xAstroBalanceTokens}
        xAstroPrice={xAstroPrice}
        balanceError={balanceError}
      />

      <GovProposalFormFooter
        fee={fee}
        txFeeNotEnough={txFeeNotEnough}
        feeIsLoading={feeIsLoading}
        balanceError={balanceError}
      />
    </>
  );
};

export default GovProposalFormInitial;
