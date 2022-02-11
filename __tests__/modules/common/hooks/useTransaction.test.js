import useTransaction, { TxStep } from "modules/common/hooks/useTransaction";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";
import { Coin, Coins } from "@terra-money/terra.js";
import { useTx, TxPostError } from "modules/common";
import { Timeout } from "@terra-money/wallet-types";

// Stub useDebounceValue to just immediately return the provided value
// (i.e. completely disable debounce behavior)
jest.mock("hooks/useDebounceValue", () => ({
  __esModule: true,
  default: (value) => value,
}));

jest.mock("@arthuryeti/terra", () => ({
  useAddress: jest.fn(() => "terra123"),
  useTerraWebapp: jest.fn(),
}));

jest.mock("modules/common", () => {
  const original = jest.requireActual("modules/common");

  return {
    ...original,
    useTx: jest.fn(() => ({ submit: jest.fn() })),
  };
});

let consoleErrorSpy;

beforeEach(() => {
  useTerraWebapp.mockReset();

  // Silence console error output
  consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
});

const renderUseTransaction = (initialProps) => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return renderHook(useTransaction, {
    wrapper,
    initialProps,
  });
};

const mockTerraClient = ({
  sequenceNumber = 1,
  publicKey = "publickey",
} = {}) => {
  const estimateFee = jest.fn();

  useTerraWebapp.mockImplementation(() => ({
    client: {
      auth: {
        accountInfo: () => ({
          getSequenceNumber: () => sequenceNumber,
          getPublicKey: () => publicKey,
        }),
      },
      tx: {
        estimateFee,
      },
    },
  }));

  return { estimateFee };
};

describe("useTransaction", () => {
  it("fetches fee and advances to Estimating and then Ready state when messages are set", async () => {
    const { estimateFee } = mockTerraClient();
    const { result, rerender, waitFor } = renderUseTransaction({
      msgs: undefined,
    });

    expect(result.current.txStep).toEqual(TxStep.Idle);

    // Fee should not have been estimated yet while idle
    expect(estimateFee).not.toHaveBeenCalled();

    const msgs = [jest.fn()];
    rerender({ msgs });

    // First advances to Estimating
    await waitFor(() => result.current.txStep === TxStep.Estimating);

    // txStep should be moved to Ready after fee estimation
    await waitFor(() => result.current.txStep === TxStep.Ready);

    // Fee should have been estimated
    expect(estimateFee).toHaveBeenCalledWith(
      [
        {
          sequenceNumber: 1,
          publicKey: "publickey",
        },
      ],
      {
        msgs,
        gasPrices: new Coins([new Coin("uusd", 0.15)]),
        gasAdjustment: 1.2,
        feeDenoms: ["uusd"],
      }
    );
  });

  it("stays/returns to Idle state and sets error when fee query fails with error message", async () => {
    const msgs = [jest.fn()];

    const { estimateFee } = mockTerraClient();

    estimateFee.mockRejectedValue({
      response: { data: { message: "Error 42" } },
    });

    const { result, waitFor } = renderUseTransaction({ msgs });

    // Should move to Estimating first (since messages are set)
    expect(result.current.txStep).toEqual(TxStep.Estimating);

    // Wait for error to be set
    await waitFor(() => result.current.error === "Error 42");

    // Should still be Idle
    expect(result.current.txStep).toEqual(TxStep.Idle);
  });

  it("stays/returns to Idle state and sets generic error message when fee query fails without error message", async () => {
    const msgs = [jest.fn()];

    const { estimateFee } = mockTerraClient();

    estimateFee.mockRejectedValue(new Error("Uh oh"));

    const { result, waitFor } = renderUseTransaction({ msgs });

    // Should move to Estimating first (since messages are set)
    expect(result.current.txStep).toEqual(TxStep.Estimating);

    // Wait for error to be set
    await waitFor(() => result.current.error === "Something went wrong");

    // Should still be Idle
    expect(result.current.txStep).toEqual(TxStep.Idle);
  });

  it("submits transaction, advances state, sets txHash, and invokes onBroadcasting handler on successful broadcast", async () => {
    const msgs = [jest.fn()];
    const mockOnBroadcasting = jest.fn();
    const fee = jest.fn();

    const { estimateFee } = mockTerraClient();

    estimateFee.mockResolvedValue(fee);

    useTx.mockImplementation(({ onPosting, onBroadcasting }) => ({
      submit: () => {
        onPosting();
        onBroadcasting("ABC123");
      },
    }));

    const { result, waitFor } = renderUseTransaction({
      msgs,
      onBroadcasting: mockOnBroadcasting,
    });

    // Begins in Estimating state
    expect(result.current.txStep).toEqual(TxStep.Estimating);

    // Wait for fee fetch
    await waitFor(() => result.current.txStep === TxStep.Ready);

    result.current.submit();

    // Since successful submit is mocked, we should end up in the Broadcasting state
    // with the txhash set
    expect(result.current.txStep).toEqual(TxStep.Broadcasting);
    expect(result.current.txHash).toEqual("ABC123");

    expect(mockOnBroadcasting).toHaveBeenCalledWith("ABC123");
    // TODO: Improve test to assert that useTx submit() was called with msgs and fee
  });

  it("submits transaction, advances state, and invokes onError handler on failed broadcast", async () => {
    const msgs = [jest.fn()];
    const mockOnError = jest.fn();
    const fee = jest.fn();

    const { estimateFee } = mockTerraClient();

    estimateFee.mockResolvedValue(fee);

    useTx.mockImplementation(({ onPosting, onError }) => ({
      submit: () => {
        onPosting();
        onError(TxPostError.Timeout, new Timeout("timed out"));
      },
    }));

    const { result, waitFor } = renderUseTransaction({
      msgs,
      onError: mockOnError,
    });

    // Begins in Estimating state
    expect(result.current.txStep).toEqual(TxStep.Estimating);

    // Wait for fee fetch
    await waitFor(() => result.current.txStep === TxStep.Ready);

    result.current.submit();

    // Since failed submit is mocked, we should end up in the Failed state
    expect(result.current.txStep).toEqual(TxStep.Failed);

    expect(mockOnError).toHaveBeenCalledWith(
      TxPostError.Timeout,
      new Timeout("timed out")
    );

    // TODO: Improve test to assert that useTx submit() was called with msgs and fee
  });
});
