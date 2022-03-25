import React, { FC } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { TERRA_ERROR_MAP, CosmosError, WasmError } from "constants/terra";

type Props = {
  txInfo: TxInfo;
};

const friendlyMessages = {
  [CosmosError.TxParseError]:
    "We're sorry, we were unable to parse your transaction. Please try again.",
  [CosmosError.InvalidSequence]:
    "We're sorry, your signature sequence was invalid. Please try again.",
  [CosmosError.Unauthorized]:
    "We're sorry, you don't have the authorization to carry out this request. Verify your permissions and try again.",
  [CosmosError.InsufficientFunds]:
    "We're sorry, you don't have enough funds to complete this request. Please try again when you have more funds available.",
  [CosmosError.UnknownRequest]:
    "We're sorry, we couldn't identify the request you made.",
  [CosmosError.InvalidAddress]:
    "We're sorry, that address is not valid. Please try again with a valid address.",
  [CosmosError.InvalidPubkey]:
    "We're sorry, that public key is not valid. Please try again with a valid public key.",
  [CosmosError.UnknownAddress]:
    "We're sorry, we couldn't find the address you specified. Please try again.",
  [CosmosError.InvalidCoins]: "Sorry, the coins you specified are not valid.",
  [CosmosError.OutOfGas]:
    "Sorry, your request ran out of gas. Please try again with a higher gas limit.",
  [CosmosError.MemoTooLarge]:
    "Sorry, the amount of text you included in your memo was too large. Please try again with a smaller amount of text.",
  [CosmosError.InsufficientFee]:
    "Sorry, the specified fee was not enough to cover the cost of this transaction. Please try again.",
  [CosmosError.MaxSignaturesExceeded]:
    "Sorry, the maximum number of signatures has been reached. Please try again with fewer signatures.",
  [CosmosError.NoSignatures]:
    "Sorry, we didn't receive any signatures for this transaction. Please try again with at least one signature.",
  [CosmosError.FailedToMarshalJSON]:
    "Sorry, Cosmos was unable to encode your JSON bytes. Please try again with valid JSON data.",
  [CosmosError.FailedToUnmarshalJSON]:
    "Sorry, Cosmos was not able to decode your JSON bytes. Please try again with valid JSON data.",
  [CosmosError.InvalidRequest]:
    "Sorry, that request was not valid. Please try again with a valid request.",
  [CosmosError.TxAlreadyInMempool]:
    "Sorry, that transaction was already being processed in the mempool. Please try again later.",
  [CosmosError.MempoolFull]:
    "Sorry, the mempool is full and cannot accept any more transactions. Please try again later.",
  [CosmosError.TxTooLarge]:
    "Sorry, the transaction size is too large. Please try again with a smaller transaction.",
  [CosmosError.KeyNotFound]:
    "Sorry, that key was not found in our system. Please try again with a different key.",
  [CosmosError.InvalidAccountPassword]:
    "Sorry, the key password you entered is not valid. Please try again with a valid key password.",

  // TODO
  // [CosmosError.TxSignerMismatch]: "",
  // [CosmosError.InvalidGasAdjustment]: "",
  // [CosmosError.InvalidHeight]: "",
  // [CosmosError.InvalidVersion]: "",
  // [CosmosError.InvalidChainID]: "",
  // [CosmosError.InvalidType]: "",
  // [CosmosError.TxTimeoutHeight]: "",
  // [CosmosError.UnknownExtensionOptions]: "",
  // [CosmosError.IncorrectAccountSequence]: "",
  // [CosmosError.ProtobufPackingFailed]: "",
  // [CosmosError.ProtobufUnpackingFailed]: "",
  // [CosmosError.InternalLogicError]: "",
  // [CosmosError.Conflict]: "",
  // [CosmosError.FeatureNotSupported]: "",
  // [CosmosError.NotFound]: "",
  // [CosmosError.InternalIOError]: "",
  // [CosmosError.ErrorInAppToml]: "",

  // [WasmError.ContractAccountExists]: "",
  // [WasmError.InstantiateFailed]: "",
  [WasmError.ExecuteFailed]:
    "Execution failed: we're sorry, we were unable to realize your transaction. Please try again.",
  // [WasmError.InsufficientGas]: "",
  // [WasmError.InvalidGenesis]: "",
  // [WasmError.NotFound]: "",
  // [WasmError.InvalidMsg]: "",
  // [WasmError.NoRegisteredQuerier]: "",
  // [WasmError.NoRegisteredParser]: "",
  // [WasmError.MigrationFailed]: "",
  // [WasmError.NotMigratable]: "",
  // [WasmError.StoreCodeFailed]: "",
  // [WasmError.ContractQueryFailed]: "",
  // [WasmError.ExceedMaxContractSize]: "",
  // [WasmError.ExceedMaxContractMsgSize]: "",
  // [WasmError.ExceedMaxContractDataSize]: "",
  // [WasmError.ReplyFailed]: "",
  // [WasmError.ExceedMaxQueryDepth]: "",
};

const executeFailedMessages = [
  {
    keySearch: "minimum receive amount",
    message:
      "Execution failed: slippage tolerance exceeded for the current swap.",
  },
  {
    keySearch: "Error parsing into type",
    message: "Execution failed: parsing error. Please try again.",
  },
];

const FailedNotification: FC<Props> = ({ txInfo }) => {
  const { codespace, code, raw_log } = txInfo;

  let message;

  if (codespace && code) {
    const terraError = TERRA_ERROR_MAP[codespace]?.[code];
    message = friendlyMessages[terraError];

    // Replace generic WasmError.ExecuteFailed message
    if (codespace === "wasm" && code === 4) {
      executeFailedMessages.forEach((efm) => {
        if (txInfo.raw_log.includes(efm.keySearch)) {
          message = efm.message;
        }
      });
    }
  }

  return <Text textStyle={["small", "medium"]}>{message ?? raw_log}</Text>;
};

export default FailedNotification;
