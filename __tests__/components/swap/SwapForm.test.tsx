import SwapForm from "components/swap/SwapForm";
import {
  render,
  screen,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEstimateFee } from "@arthuryeti/terra";
import { useTx } from "modules/common";
import { useSwap } from "modules/swap";
import { Coin, Coins } from "@terra-money/terra.js";

jest.mock("@terra-money/wallet-provider", () => ({
  useWallet: () => ({
    network: { name: "testnet" },
  }),
}));

jest.mock("@arthuryeti/terra", () => {
  const original = jest.requireActual("@arthuryeti/terra");

  return {
    ...original,
    useBalance: (token) => 100_000_000,
    useEstimateFee: jest.fn(),
    useAddress: () => "terra42",
  };
});

jest.mock("modules/common/context", () => {
  return {
    useAstroswap: jest.fn().mockReturnValue({
      routes: [],
      tokens: {
        uusd: {},
        terra123: {},
      },
    }),
  };
});

jest.mock("modules/common", () => {
  const original = jest.requireActual("modules/common");

  return {
    ...original,
    useTokenInfo: () => ({
      getDecimals: () => 6,
      getSymbol: (token) => {
        return {
          terra123: "FOO",
          uusd: "UST",
        }[token];
      },
      getIcon: () => {},
      isHidden: () => false,
    }),
    useTx: jest.fn(),
  };
});

jest.mock("modules/swap", () => {
  const original = jest.requireActual("modules/swap");

  return {
    ...original,
    useSwap: jest.fn(),
    useSwapRoute: () => [
      {
        contract_addr: "terra456",
        from: "uusd",
        to: "terra123",
        type: "xyk",
      },
    ],
    useTokenPriceInUstWithSimulate: (token) => {
      return {
        uusd: 1,
        terra123: 42,
      }[token];
    },
    usePriceImpact: () => 0,
  };
});

beforeEach(() => {
  (useEstimateFee as jest.Mock).mockReturnValue({
    fee: {
      amount: new Coins([new Coin("uusd", 0)]),
    },
    isLoading: false,
  });
});

describe("SwapForm", () => {
  const renderAndSwap = async () => {
    let successCallback;

    (useSwap as jest.Mock).mockImplementation(({ onSimulateSuccess }) => {
      successCallback = onSimulateSuccess;

      return {
        msgs: [],
        minReceive: 0,
        simulated: {
          isLoading: false,
          price: 84000000,
          commission: 1,
        },
      };
    });

    render(<SwapForm defaultToken1="uusd" defaultToken2="terra123" />);

    const [fromInput] = screen.getAllByRole("spinbutton");

    userEvent.type(fromInput, "2");

    act(() => {
      // This is normally invoked by the useSwap hook
      // on successful simulation, but we have to do it manually here
      successCallback({ amount: 84000000 });
    });

    userEvent.click(screen.getByRole("button", { name: "Swap Tokens" }));
    userEvent.click(screen.getByRole("button", { name: "Confirm Swap" }));

    // Wait for swap confirm to be hidden (form is validated and submits)
    await waitForElementToBeRemoved(() =>
      screen.queryAllByText("Confirm Swap")
    );
  };

  it("submits transaction", async () => {
    const mockSubmit = jest.fn();

    // Mock useTx with a submit fn that immediately invokes
    // onPosting callback, mocking a tx that's waiting on the extension,
    // then invoke a mock fn so we can assert on it
    (useTx as jest.Mock).mockImplementation(({ onPosting }) => ({
      submit: (...args) => {
        onPosting();
        mockSubmit(...args);
      },
    }));

    await renderAndSwap();

    expect(useTx).toHaveBeenCalledWith({
      notification: {
        type: "swap",
        data: {
          token1: "uusd",
          token2: "terra123",
        },
      },
      onPosting: expect.any(Function),
      onBroadcasting: expect.any(Function),
      onError: expect.any(Function),
    });

    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
