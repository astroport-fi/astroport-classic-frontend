import React, { FC } from "react";
import {
  useMediaQuery,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import { MOBILE_MAX_WIDTH } from "constants/constants";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: FC<Props> = ({ children, isOpen, onClose, title }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        {...(isMobile ? { alignSelf: "flex-end", my: "4" } : {})}
        mx={["4", null, "0"]}
      >
        <Flex justify="space-between" align="center">
          <ModalHeader flex={1}>{title}</ModalHeader>
          <ModalCloseButton />
        </Flex>
        <ModalBody px={isMobile ? "0" : ["0", "inherit"]}>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
