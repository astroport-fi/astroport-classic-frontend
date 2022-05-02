import React, { FC, useEffect } from "react";
import { useQueryClient } from "react-query";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { getEventsByType } from "modules/common";

type Props = {
  txInfo: TxInfo;
};

const CreateProposalNotification: FC<Props> = ({ txInfo }) => {
  const queryClient = useQueryClient();
  const eventsByType = getEventsByType(txInfo);
  const proposalId = eventsByType?.wasm.proposal_id[0];

  useEffect(() => {
    queryClient.invalidateQueries("balance");
  }, []);

  return (
    <Text textStyle={["small", "medium"]}>
      Submitted New Assembly Proposal with ID #{proposalId}
    </Text>
  );
};

export default CreateProposalNotification;
