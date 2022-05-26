import React, { FC } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import PopoverWrapper from "components/popovers/PopoverWrapper";
import RewardOverlay from "components/pages/overlays/reward";

type Props = {
  triggerElement: () => React.ReactElement;
};

const RewardCenterPopover: FC<Props> = ({ triggerElement }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();

  const handleOpen = () => {
    queryClient.invalidateQueries("rewards");
    queryClient.invalidateQueries(["userInfo", "lockdrop"]);
    onOpen();
  };

  return (
    <PopoverWrapper
      title="Rewards"
      offset={[-115, -40]}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={handleOpen}
      triggerElement={triggerElement}
    >
      <RewardOverlay onClose={onClose} />
    </PopoverWrapper>
  );
};

export default RewardCenterPopover;
