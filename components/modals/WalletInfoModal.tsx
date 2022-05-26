import React, { FC } from "react";
import Modal from "components/modals/Modal";

import WalletOverlay from "components/pages/overlays/wallet";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const WalletInfoModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My wallet">
      <WalletOverlay type="modal" onClose={onClose} />
    </Modal>
  );
};

export default WalletInfoModal;
