import React, { FC } from "react";
import Modal from "components/modals/Modal";

import RewardOverlay from "components/pages/overlays/reward";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const RewardCentreModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rewards">
      <RewardOverlay type="modal" onClose={onClose} />
    </Modal>
  );
};

export default RewardCentreModal;
