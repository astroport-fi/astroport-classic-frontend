import React, { FC, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useQueryClient } from "react-query";

const ClaimRewardsNotification: FC = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries("userInfoWithList");
    queryClient.invalidateQueries("userInfo");
    queryClient.invalidateQueries("balance");
    queryClient.invalidateQueries("rewards");
  }, []);

  return <Text textStyle={["small", "medium"]}>Rewards Claimed</Text>;
};

export default ClaimRewardsNotification;
