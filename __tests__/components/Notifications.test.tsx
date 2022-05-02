import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import Notifications from "components/Notifications";
import { useAstroswap } from "modules/common";
import { render, screen } from "@testing-library/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const renderToHTML = (element: ReactElement) => {
  const container = document.createElement("div");
  ReactDOM.render(element, container);
  return container.innerHTML;
};

jest.mock("react-query", () => ({
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

jest.mock("modules/common", () => {
  const original = jest.requireActual("modules/common");

  return {
    ...original,
    useAstroswap: jest.fn(),
    useTokenInfo: jest.fn().mockReturnValue({
      getDecimals: () => 6,
      getSymbol: (token: string) => {
        return {
          terra123: "FOO",
          uusd: "UST",
        }[token];
      },
    }),
  };
});

// Testing the specifics of the TransactionStarted component
// is outside of the scope of this test
jest.mock("components/notifications/TransactionStarted", () => ({
  __esModule: true,
  default: ({ txHash }: { txHash: string }) => <div>Tx {txHash} started</div>,
}));

const mockNotifications = (notifications: any[]) => {
  (useAstroswap as jest.Mock).mockReturnValue({
    notifications: {
      items: notifications,
    },
  });
};

const expectIcon = (container: any, type: string) => {
  const component =
    type === "success" ? (
      <CheckIcon color="otherColours.green" w={3} />
    ) : (
      <CloseIcon color="red.500" w={3} />
    );

  // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
  expect(container.querySelector("svg.chakra-icon").outerHTML).toEqual(
    renderToHTML(component)
  );
};

describe("Notifications", () => {
  it("renders TransactionStarted component for 'started' notifications", () => {
    mockNotifications([
      {
        id: 1,
        type: "started",
        txHash: "terra123",
      },
    ]);

    render(<Notifications />);

    expect(screen.getByText("Tx terra123 started")).toBeInTheDocument();
  });

  it("renders TransactionNotification-wrapped FailedNotification component for 'failed' notifications", () => {
    mockNotifications([
      {
        id: 1,
        type: "failed",
        txHash: "terra123",
        txInfo: {
          raw_log: "this tx failed",
        },
      },
    ]);

    const { container } = render(<Notifications />);

    expect(screen.getByText("this tx failed")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "View Transaction" })
    ).toHaveAttribute("href", "https://example.com/testnet/tx/terra123");

    expectIcon(container, "error");
  });

  it("renders TransactionNotification-wrapped FailedNotification component for 'failed' notifications even when txType is set", () => {
    mockNotifications([
      {
        id: 1,
        type: "failed",
        txType: "swap",
        txHash: "terra123",
        txInfo: {
          raw_log: "this tx failed",
        },
      },
    ]);

    const { container } = render(<Notifications />);

    expect(screen.getByText("this tx failed")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "View Transaction" })
    ).toHaveAttribute("href", "https://example.com/testnet/tx/terra123");

    expectIcon(container, "error");
  });

  it("renders TransactionNotification-wrapped SwapNotification component for successful swap notifications", () => {
    mockNotifications([
      {
        id: 1,
        type: "succeed",
        txType: "swap",
        txHash: "terra42",
        txInfo: {
          logs: [
            {
              eventsByType: {
                wasm: {
                  offer_amount: [42_000_000],
                  return_amount: [41_000_000],
                },
              },
            },
          ],
        },
        data: {
          token1: "terra123",
          token2: "uusd",
        },
      },
    ]);

    const { container } = render(<Notifications />);

    expect(
      screen.getByText("Swap 42.00 FOO for 41.00 UST")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "View Transaction" })
    ).toHaveAttribute("href", "https://example.com/testnet/tx/terra42");

    expectIcon(container, "success");
  });

  it("renders TransactionNotification-wrapped ProvideNotification component for successful provide notifications", () => {
    mockNotifications([
      {
        id: 1,
        type: "succeed",
        txType: "provide",
        txHash: "terra42",
        txInfo: {
          logs: [
            {
              eventsByType: {
                wasm: {
                  assets: ["42000000terra123, 42000000uusd"],
                },
              },
            },
          ],
        },
      },
    ]);

    const { container } = render(<Notifications />);

    expect(
      screen.getByText("Provide 42.00 FOO and 42.00 UST")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "View Transaction" })
    ).toHaveAttribute("href", "https://example.com/testnet/tx/terra42");

    expectIcon(container, "success");
  });

  it("renders TransactionNotification-wrapped WithdrawNotification component for successful withdraw notifications", () => {
    mockNotifications([
      {
        id: 1,
        type: "succeed",
        txType: "withdraw",
        txHash: "terra42",
        txInfo: {
          logs: [
            {
              eventsByType: {
                wasm: {
                  refund_assets: ["42000000terra123, 42000000uusd"],
                },
              },
            },
          ],
        },
      },
    ]);

    const { container } = render(<Notifications />);

    expect(
      screen.getByText("Withdraw 42.00 FOO and 42.00 UST")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "View Transaction" })
    ).toHaveAttribute("href", "https://example.com/testnet/tx/terra42");

    expectIcon(container, "success");
  });

  it.todo(
    "renders TransactionNotification-wrapped StakeLpNotification component for successful stakeLp notifications"
  );
  it.todo(
    "renders TransactionNotification-wrapped UnstakeLpNotification component for successful unstakeLp notifications"
  );
  it.todo(
    "renders TransactionNotification-wrapped ClaimRewardsNotification component for successful claimRewards notifications"
  );
  it.todo(
    "renders TransactionNotification-wrapped AuctionUnlockLpNotification component for successful auctionUnlockLp notifications"
  );
  it.todo(
    "renders TransactionNotification-wrapped LockdropUnlockLpNotification component for successful lockdropUnlockLp notifications"
  );
  it.todo(
    "renders TransactionNotification-wrapped GovStakeNotification component for successful govStake notifications"
  );
  it.todo(
    "renders TransactionNotification-wrapped GovUnstakeNotification component for successful govUnstake notifications"
  );

  it("renders GenericNotification with title and description for error notifications", () => {
    mockNotifications([
      {
        id: 1,
        type: "error",
        title: "Something went wrong",
        description: "Details go here",
      },
    ]);

    const { container } = render(<Notifications />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Details go here")).toBeInTheDocument();

    expectIcon(container, "error");
  });

  it("throws error for unsupported notification types", () => {
    mockNotifications([
      {
        type: "foo",
      },
    ]);

    // Otherwise error is reported via console.error
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    expect(() => render(<Notifications />)).toThrow(
      "Unsupported notification type"
    );

    consoleSpy.mockRestore();
  });
});
