import { LCDClient, MsgExecuteContract } from "@terra-money/terra.js";

/* query */

export const getPoolLength = async (client: LCDClient, generator: string) => {
  const queryMsg = {
    pool_length: {},
  };

  return client.wasm.contractQuery(generator, queryMsg);
};

export const getPendingToken = async (
  client: LCDClient,
  generator: string,
  tokenAddr: string,
  userAddr: string
) => {
  const queryMsg = {
    pending_token: {
      token: tokenAddr,
      user: userAddr,
    },
  };

  return client.wasm.contractQuery(generator, queryMsg);
};

export const getMultiplier = async (
  client: LCDClient,
  generator: string,
  from: string,
  to: string
) => {
  const queryMsg = {
    get_multiplier: {
      from,
      to,
    },
  };

  return client.wasm.contractQuery(generator, queryMsg);
};

/* execute */

export const createAddExecuteMsg = (
  sender: string,
  generator: string,
  allocPoint: string,
  tokenAddr: string,
  withUpdate: string
) => {
  const executeMsg = new MsgExecuteContract(sender, generator, {
    add: {
      alloc_point: allocPoint,
      token: tokenAddr,
      with_update: withUpdate,
    },
  });

  return executeMsg;
};

export const createSetExecuteMsg = (
  sender: string,
  generator: string,
  allocPoint: string,
  tokenAddr: string,
  withUpdate: string
) => {
  const executeMsg = new MsgExecuteContract(sender, generator, {
    set: {
      alloc_point: allocPoint,
      token: tokenAddr,
      with_update: withUpdate,
    },
  });

  return executeMsg;
};

export const createMassUpdatePoolsExecuteMsg = (
  sender: string,
  generator: string
) => {
  const executeMsg = new MsgExecuteContract(sender, generator, {
    mass_update_pools: {},
  });

  return executeMsg;
};

export const createUpdatePoolExecuteMsg = (
  sender: string,
  generator: string,
  tokenAddr: string
) => {
  const executeMsg = new MsgExecuteContract(sender, generator, {
    update_pool: {
      token: tokenAddr,
    },
  });

  return executeMsg;
};

export const createDepositExecuteMsg = (
  sender: string,
  generator: string,
  tokenAddr: string,
  amount: string
) => {
  const executeMsg = new MsgExecuteContract(sender, generator, {
    deposit: {
      amount,
      lp_token: tokenAddr,
    },
  });

  return executeMsg;
};

export const createWithdrawExecuteMsg = (
  sender: string,
  generator: string,
  amount: string,
  tokenAddr: string
) => {
  const executeMsg = new MsgExecuteContract(sender, generator, {
    withdraw: {
      amount,
      lp_token: tokenAddr,
    },
  });

  return executeMsg;
};

export const createEmergencyWithdrawExecuteMsg = (
  sender: string,
  generator: string,
  tokenAddr: string,
  amount: string
) => {
  const executeMsg = new MsgExecuteContract(sender, generator, {
    emergency_withdraw: {
      amount,
      lp_token: tokenAddr,
    },
  });

  return executeMsg;
};

export const createIncreaseAllowanceExecuteMsg = (
  sender: string,
  contract: string,
  spender: string,
  amount: string
) => {
  const executeMsg = new MsgExecuteContract(sender, contract, {
    increase_allowance: {
      amount,
      spender,
    },
  });

  return executeMsg;
};
