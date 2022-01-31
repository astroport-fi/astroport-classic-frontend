import React, { FC } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";

const InvalidNetworkModal: FC = () => {
  return (
    <ChakraModal isOpen={true} onClose={undefined} size="xl">
      <ModalOverlay />
      <ModalContent mx={["4", null, "0"]}>
        <ModalBody px={["0", "inherit"]}>
          You are connected to the wrong network. Please switch to Columbus!
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export default InvalidNetworkModal;
