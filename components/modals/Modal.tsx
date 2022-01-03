import React, { FC } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: FC<Props> = ({ children, isOpen, onClose, title }) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent mx={["4", null, "0"]}>
        <Flex justify="space-between" align="center">
          <ModalHeader flex={1}>{title}</ModalHeader>
          <ModalCloseButton />
        </Flex>
        <ModalBody px={["0", "inherit"]}>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
