import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

type Props = {
  data: any;
};

const GovVoteNotification: FC<Props> = ({ data }) => {
  const { action, proposal_id } = data;

  return (
    <Text textStyle={["small", "medium"]}>
      Voted {action} Assembly proposal with ID #{proposal_id}
    </Text>
  );
};

export default GovVoteNotification;
