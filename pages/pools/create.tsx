import React, { FormEvent, useState } from "react";
import { NextPage } from "next";
import { TxInfo } from "@terra-money/terra.js";
import { useRouter } from "next/router";
import ConnectWalletModal from "components/modals/ConnectWalletModal";
import useAddress from "hooks/useAddress";
import { getEventsByType, useContracts } from "modules/common";
import {
  AMPLIFICATION_DESCRIPTION,
  CONSTANT_PRODUCT_POOL_DESCRIPTION,
  ERROR_MESSAGE,
  STABLE_SWAP_POOL_DESCRIPTION,
} from "constants/constants";
import useCreatePool from "hooks/useCreatePool";
import useTxInfo from "hooks/useTxInfo";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import BackButton from "components/BackButton";
import Card from "components/Card";
import InputOptions from "components/InputOptions";
import WarningMessage from "components/common/WarningMessage";
import SelectToken from "components/SelectToken";
import ImportToken from "components/ImportToken";
import Fee from "components/Fee";
import RawPoolBox from "components/RawPoolBox";
import FormConfirm from "components/common/FormConfirm";
import TokenBox from "components/TokenBox";
import FormLoading from "components/common/FormLoading";

function getPoolInfo(
  poolType: string
): { title: string; description: string } | null {
  const info = {
    xyk: {
      title: "About Constant Product Pools",
      description: CONSTANT_PRODUCT_POOL_DESCRIPTION,
    },
    stable: {
      title: "About Stable Swap Pools",
      description: STABLE_SWAP_POOL_DESCRIPTION,
    },
  };

  if (poolType === "xyk") {
    return info.xyk;
  }

  if (poolType === "stable") {
    return info.stable;
  }

  return null;
}

function parseErrorMessage(error: string): string {
  if (error.match(/NotFound desc \= account/i)) {
    return ERROR_MESSAGE.INSUFFICIENT_ASSETS_WALLET;
  }

  if (error.match(/address cannot be empty/i)) {
    return ERROR_MESSAGE.CONNECT_WALLET;
  }

  if (error.match(/pair was already created/i)) {
    return ERROR_MESSAGE.POOL_ALREADY_CREATED;
  }

  if (error.match(/doubling assets/i)) {
    return ERROR_MESSAGE.POOL_UNIQUE_TOKENS;
  }

  return error;
}

const CreatePoolPage: NextPage = () => {
  const address = useAddress();
  const { astroToken } = useContracts();
  const router = useRouter();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [poolType, setPoolType] = useState("xyk");
  const isStablePool = poolType === "stable";
  const [token1, setToken1] = useState(astroToken);
  const [token2, setToken2] = useState("uluna");
  const [amplification, setAmplification] = useState(100);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const poolInfo = getPoolInfo(poolType);
  const [isPosting, setIsPosting] = useState(false);
  const [txHash, setTxHash] = useState<string>();

  const state = useCreatePool({
    poolType,
    token1: token1,
    token2: token2,
    amplification,
    onBroadcasting: (txHash) => {
      setIsPosting(true);
      setTxHash(txHash);
      setIsConfirmOpen(false);
    },
    onError: () => {
      setIsConfirmOpen(false);
    },
  });

  useTxInfo({
    txHash,
    onSuccess: (_txHash, txInfo?: TxInfo) => {
      if (txInfo) {
        const eventsByType = getEventsByType(txInfo, -1);
        const poolAddress = eventsByType?.wasm.pair_contract_addr[0];
        const lpTokenAddress = eventsByType?.wasm.liquidity_token_addr[0];
        router.push(`/pools/${poolAddress}?lp_address=${lpTokenAddress}`);
      } else {
        router.push("/pools");
      }
    },
    onError: () => {
      setTxHash(undefined);
      setIsConfirmOpen(false);
    },
  });

  const createPool = async (e: FormEvent) => {
    e.preventDefault();
    state.submit();
  };

  if (isPosting) {
    return (
      <div className="py-6 px-3 max-w-2xl w-full mx-auto my-10">
        <FormLoading txHash={txHash} />
      </div>
    );
  }

  return (
    <form onSubmit={createPool}>
      {!isConfirmOpen && (
        <>
          <Box m="0 auto" pt="6">
            <Flex justify="center">
              <Box
                maxW="650px"
                mx="6"
                mt={[0, 0, 10]}
                mb={[75, 75, 10]}
                w="full"
              >
                <Flex justify="space-between" color="white" mb="6" px="6">
                  <Box flex="1">
                    <HStack spacing={4}>
                      <BackButton />
                      <Text as="button" fontSize="1.125rem" color={"white"}>
                        Create Pool
                      </Text>
                    </HStack>
                  </Box>
                </Flex>

                <Box mt="6">
                  <Card mb="2">
                    <Flex justify="space-between" align="center">
                      <HStack textStyle="small" color="white">
                        <Text variant="dimmed">Create New Pool</Text>
                      </HStack>

                      <HStack>
                        <Button
                          type="button"
                          variant="mini"
                          isActive={poolType === "xyk"}
                          onClick={() => setPoolType("xyk")}
                        >
                          Constant
                        </Button>

                        <Button
                          type="button"
                          variant="mini"
                          isActive={poolType === "stable"}
                          onClick={() => setPoolType("stable")}
                        >
                          Stable
                        </Button>
                      </HStack>
                    </Flex>
                  </Card>

                  {poolInfo && (
                    <Card mb="2">
                      <Text textStyle="small" color="whiteAlpha.800">
                        {poolInfo.title}
                      </Text>
                      <Text mt="2" textStyle="small" variant="dimmed">
                        {poolInfo.description}
                      </Text>
                    </Card>
                  )}
                </Box>

                <Card mb="2">
                  <SelectToken value={token1} onChange={setToken1} />
                  <ImportToken onChange={setToken1} />
                </Card>

                <Card mb="2">
                  <SelectToken value={token2} onChange={setToken2} />
                  <ImportToken onChange={setToken2} />
                </Card>

                {isStablePool && (
                  <Card mb="2">
                    <Flex
                      alignItems={["flex-start", "center"]}
                      flexDirection={["column", "row"]}
                    >
                      <Text flex="1" textStyle="small" color="whiteAlpha.800">
                        Select Amplification Parameter
                      </Text>
                      <Flex mt={[4, 0]} justify="center">
                        <InputOptions
                          value={amplification}
                          onDataHandle={(val) => {
                            if (isNaN(val)) {
                              return amplification;
                            }

                            return Math.max(10, Math.min(val, 200)); // Impose stricter amplification limit
                          }}
                          onChange={(value) => setAmplification(value)}
                          options={[10, 50, 100]}
                          withCustom
                        />
                      </Flex>
                    </Flex>
                    <Text
                      mt="6"
                      fontSize="xs"
                      variant="dimmed"
                      fontWeight="medium"
                      lineHeight="1.2"
                    >
                      {AMPLIFICATION_DESCRIPTION}
                    </Text>
                  </Card>
                )}

                {state.error && (
                  <WarningMessage
                    mt={2}
                    content={parseErrorMessage(state.error)}
                  />
                )}

                <Box mt={8} px={3} mb={4}>
                  <Text textStyle="h2" color="white" fontSize="xl">
                    New Pool
                  </Text>
                </Box>

                <Card mb={2}>
                  <RawPoolBox tokens={[token1, token2]} />
                </Card>

                {address && (
                  <Card>
                    <VStack align="center">
                      <Button
                        variant="primarywhite"
                        borderRadius="md"
                        minW={64}
                        w={["full", 64]}
                        size="md"
                        type="button"
                        onClick={() => setIsConfirmOpen(true)}
                        disabled={!!state.error || !state.fee}
                      >
                        Create Pool
                      </Button>
                      {state.fee && (
                        <Box mt={2}>
                          <Fee fee={state.fee} />
                        </Box>
                      )}
                    </VStack>
                  </Card>
                )}
                {!address && (
                  <Card>
                    <VStack align="center">
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => setIsWalletModalOpen(true)}
                      >
                        Connect Wallet
                      </Button>
                    </VStack>
                    <ConnectWalletModal
                      isOpen={isWalletModalOpen}
                      onClose={() => setIsWalletModalOpen(false)}
                    />
                  </Card>
                )}
              </Box>
            </Flex>
          </Box>
        </>
      )}

      {isConfirmOpen && (
        <Box mt="20">
          <FormConfirm
            fee={state.fee}
            title="Confirm Pool Creation"
            actionLabel="Confirm Pool Creation"
            contentComponent={
              <>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  textColor="whiteAlpha.600"
                >
                  Pool assets:
                </Text>
                <VStack mt={2}>
                  <TokenBox borderRadius="xl" token={token1} />
                  <TokenBox borderRadius="xl" token={token2} />
                </VStack>
                <Text
                  mt={4}
                  fontSize="sm"
                  fontWeight="medium"
                  textColor="whiteAlpha.600"
                >
                  Created pool:
                </Text>
                <Box mt={2}>
                  <RawPoolBox borderRadius="xl" tokens={[token1, token2]} />
                </Box>
              </>
            }
            details={
              isStablePool
                ? [{ label: "Amplification parameter", value: amplification }]
                : null
            }
            onCloseClick={() => setIsConfirmOpen(false)}
            taxRate={0.002}
          />
        </Box>
      )}
    </form>
  );
};

export default CreatePoolPage;
