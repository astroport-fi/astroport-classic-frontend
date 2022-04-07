import React, { FC, useEffect } from "react";
import { useQueryClient } from "react-query";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";

type Props = {
  txInfo: TxInfo;
};

const CreateProposalNotification: FC<Props> = ({ txInfo }) => {
  const queryClient = useQueryClient();
  const { logs } = txInfo;
  const { eventsByType } = logs[0];
  const proposalId = eventsByType.wasm.proposal_id[0];

  useEffect(() => {
    queryClient.invalidateQueries("balance");
  }, []);

  return (
    <Text textStyle={["small", "medium"]}>
      Submitted new Assembly Proposal with ID #{proposalId}
    </Text>
  );
};

export default CreateProposalNotification;
