import { useMemo } from "react";
import useAddress from "hooks/useAddress";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { toBase64 } from "libs/terra";
import {
  toAssetInfo,
  TxErrorHandler,
  TxStep,
  useContracts,
  useTransaction,
} from "modules/common";

type CreateCreateMsgsOptions = {
  contract: string;
  poolType: string;
  token1: string;
  token2: string;
  init_params: {
    amp?: Number;
  };
};

const createCreateMsgs = (
  options: CreateCreateMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const { contract, poolType, token1, token2, init_params = {} } = options;

  const executeMsg = {
    create_pair: {
      pair_type: { [poolType]: {} },
      asset_infos: [toAssetInfo(token1), toAssetInfo(token2)],
      init_params: toBase64(init_params),
    },
  };

  const msg = new MsgExecuteContract(sender, contract, executeMsg);

  return [msg];
};

type CreateState = {
  error: any;
  fee: any;
  txHash?: string | undefined;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  poolType: string;
  token1: string;
  amount1?: string;
  token2: string;
  amount2?: string;
  amplification?: Number;
  onPosting?: () => void;
  onBroadcasting?: (txHash: string) => void;
  onError?: TxErrorHandler;
};

const useCreatePool = ({
  poolType,
  token1,
  token2,
  amplification = 100,
  onBroadcasting = () => null,
  onError = () => null,
}: Params): CreateState => {
  const address = useAddress();
  const { factory } = useContracts();

  const msgs = useMemo(() => {
    if (!address) {
      return [];
    }

    let init_params = {};
    if (poolType === "stable") {
      init_params = { amp: amplification };
    }

    return createCreateMsgs(
      {
        contract: factory,
        poolType,
        token1,
        token2,
        init_params,
      },
      address || ""
    );
  }, [factory, poolType, token1, token2, amplification]);

  return useTransaction({
    notification: {
      type: "createPool",
      data: {
        token1,
        token2,
      },
    },
    msgs,
    onBroadcasting,
    onError,
  });
};

export default useCreatePool;
