import { LCDClient, MsgExecuteContract } from '@terra-money/terra.js';

/* query */

export const getPoolLength = async (
  client: LCDClient,
  gauge: string,
) => {
  const queryMsg = {
    pool_length: {} 
  }

  return client.wasm.contractQuery(gauge, queryMsg);
};

export const getPendingToken = async (
  client: LCDClient,
  gauge: string,
  tokenAddr: string,
  userAddr: string,
) => {
  const queryMsg = {
    pending_token: {
      token: tokenAddr,
      user: userAddr,
    }
  }

  return client.wasm.contractQuery(gauge, queryMsg);
};

export const getMultiplier = async (
  client: LCDClient,
  gauge: string,
  from: string,
  to: string,
) => {
  const queryMsg = {
    get_multiplier: {
      from,
      to,
    },
  }

  return client.wasm.contractQuery(gauge, queryMsg);
};

/* execute */

export const createAddExecuteMsg = (
  sender: string,
  gauge: string,
  allocPoint: string,
  tokenAddr: string,
  withUpdate: string,
) => {
  const executeMsg = new MsgExecuteContract(sender, gauge, {
    add: {
      alloc_point: allocPoint,
      token: tokenAddr,
      with_update: withUpdate,
    }
  });

  return executeMsg;
}

export const createSetExecuteMsg = (
  sender: string,
  gauge: string,
  allocPoint: string,
  tokenAddr: string,
  withUpdate: string,
) => {
  const executeMsg = new MsgExecuteContract(sender, gauge, {
    set: {
      alloc_point: allocPoint,
      token: tokenAddr,
      with_update: withUpdate,
    }
  });

  return executeMsg;
}

export const createMassUpdatePoolsExecuteMsg = (
  sender: string,
  gauge: string,
) => {
  const executeMsg = new MsgExecuteContract(sender, gauge, {
    mass_update_pools: {}
  });

  return executeMsg;
}

export const createUpdatePoolExecuteMsg = (
  sender: string,
  gauge: string,
  tokenAddr: string,
) => {
  const executeMsg = new MsgExecuteContract(sender, gauge, {
    update_pool: {
      token: tokenAddr
    }
  });

  return executeMsg;
}

export const createDepositExecuteMsg = (
  sender: string,
  gauge: string,
  tokenAddr: string,
  amount: string,
) => {
  const executeMsg = new MsgExecuteContract(sender, gauge, {
    deposit: {
      amount,
      token: tokenAddr
    }
  });

  return executeMsg;
}

export const createWithdrawExecuteMsg = (
  sender: string,
  gauge: string,
  amount: string,
  tokenAddr: string,
) => {
  const executeMsg = new MsgExecuteContract(sender, gauge, {
    withdraw: {
      amount,
      token: tokenAddr
    }
  });

  return executeMsg;
}

export const createEmergencyWithdrawExecuteMsg = (
  sender: string,
  gauge: string,
  tokenAddr: string,
  amount: string,
) => {
  const executeMsg = new MsgExecuteContract(sender, gauge, {
    emergency_withdraw: {
      amount,
      token: tokenAddr
    }
  });

  return executeMsg;
}

export const createIncreaseAllowanceExecuteMsg = (
  sender: string,
  contract: string,
  spender: string,
  amount: string,
) => {
  const executeMsg = new MsgExecuteContract(
    sender,
    contract,
    {
      increase_allowance: {
        amount,
        spender,
      },
    }
  );

  return executeMsg;
}
