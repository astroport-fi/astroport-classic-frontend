import { chakra, Button, Box, Text, Flex, Input } from "@chakra-ui/react";
import { useGetToken } from "modules/common/hooks/useGetToken";
import React, { FC, useState } from "react";
import Modal from "./modals/Modal";

type Props = {
  label?: string;
  onChange: (token: string) => void;
};

const ImportToken: FC<Props> = ({
  label = "Don't see your token?",
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const { isLoading, hasError } = useGetToken(tokenAddress);

  const onAddToken = () => {
    if (onChange) onChange(tokenAddress);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTokenAddress("");
  };

  return (
    <Box mt="4">
      <Box fontSize="sm" color="whiteAlpha.500">
        {label}{" "}
        <chakra.button
          type="button"
          ml="1"
          fontWeight="medium"
          color="brand.purpleAlt"
          onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
        >
          Import Token
        </chakra.button>
      </Box>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Import Token">
        <Box
          mb={4}
          py={6}
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor="blackAlpha.200"
        >
          <Text textStyle="minibutton">Token Address</Text>

          <Input
            mt="4"
            borderWidth="1px"
            borderColor={hasError ? "errors.main" : "blackAlpha.200"}
            bg="transparent"
            color="blackAlpha.900"
            value={tokenAddress}
            placeholder={"Type here"}
            _placeholder={{ fontSize: "sm", color: "blackAlpha.600" }}
            _hover={hasError ? { borderColor: "errors.main" } : {}}
            _focus={hasError ? { borderColor: "errors.main" } : {}}
            onChange={(e) => setTokenAddress(e.target.value)}
            h="12"
          />
          {hasError && (
            <Text mt="2" color="errors.main" fontSize="sm">
              That address is not a valid CW20 token contract address. Please
              try a different address.
            </Text>
          )}
        </Box>

        <Box
          mb={6}
          pb={4}
          borderBottom="1px solid"
          borderColor="blackAlpha.200"
          fontWeight="medium"
        >
          <Text fontSize="xs">Be aware</Text>
          <Text mt="1" fontSize="xs" color="blackAlpha.700" lineHeight="1.2">
            Anyone can create a token. Make sure this is the token you want to
            trade before you execute a transaction.
          </Text>
        </Box>

        <Flex justify="center" alignItems="center">
          <Button
            w="full"
            variant="primary"
            isLoading={isLoading}
            disabled={!tokenAddress || hasError}
            onClick={() => onAddToken()}
          >
            Add Token
          </Button>
        </Flex>
      </Modal>
    </Box>
  );
};

export default ImportToken;
