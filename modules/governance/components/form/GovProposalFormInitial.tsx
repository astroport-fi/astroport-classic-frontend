import React, { FC } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";
import DOMPurify from "dompurify";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { FormActions, FormTextItem } from "modules/common";
import { GovProposalFormFooter } from "modules/governance";
import { Proposal } from "types/common";
import { ONE_TOKEN } from "constants/constants";
import DepositBox from "components/proposal/DepositBox";
import ErrorBox from "components/proposal/ErrorBox";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_LINK_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_LINK_LENGTH,
  MIN_TITLE_LENGTH,
} from "constants/proposals";

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
  title: string,
  placeholder?: string
) => {
  return { type, id, title, placeholder };
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
        </Flex>
      </FormActions>

      {balanceError && <ErrorBox />}

      <FormTextItem
        {...CommonFormProps(
          "input",
          "title",
          "Set Title:",
          `Type a title that is between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH} characters long`
        )}
        value={title}
        formRegister={methods.register}
        error={inputErrors?.title || null}
        onChange={(text) => {
          methods.setValue("title", DOMPurify.sanitize(text));
          methods.clearErrors("title");
        }}
      />
      <FormTextItem
        {...CommonFormProps(
          "textarea",
          "description",
          "Insert Description:",
          `Type a description that is between ${MIN_DESCRIPTION_LENGTH} and ${MAX_DESCRIPTION_LENGTH} characters long`
        )}
        value={description}
        formRegister={methods.register}
        error={inputErrors?.description || null}
        onChange={(text) => {
          methods.setValue("description", DOMPurify.sanitize(text));
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
        {...CommonFormProps(
          "input",
          "link",
          "Insert Link to Discussion:",
          `Add a link that is between ${MIN_LINK_LENGTH} and ${MAX_LINK_LENGTH} characters long`
        )}
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
