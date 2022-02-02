import { render, screen } from "@testing-library/react";
import ConnectWalletModal from "components/modals/ConnectWalletModal";
import { ConnectType, useWallet, Wallet } from "@terra-money/wallet-provider";
import userEvent from "@testing-library/user-event";

jest.mock("@terra-money/wallet-provider", () => {
  const original = jest.requireActual("@terra-money/wallet-provider");

  return {
    ...original,
    useWallet: jest.fn() as jest.Mock<Wallet>,
  };
});

const useWalletMock = (overrides) => {
  return (): Wallet => ({
    ...jest.requireActual("@terra-money/wallet-provider").useWallet,
    availableConnections: [],
    availableInstallations: [],
    ...overrides,
  });
};

describe("ConnectWalletModal", () => {
  beforeEach(() => {
    const availableConnections = [
      {
        type: ConnectType.EXTENSION,
        identifier: "station",
        name: "Terra Station",
        icon: "http://example.com/station.svg",
      },
      {
        type: ConnectType.EXTENSION,
        identifier: "leap-wallet",
        name: "Leap Wallet",
        icon: "http://example.com/leap-wallet.svg",
      },
      {
        type: ConnectType.EXTENSION,
        identifier: "foo-wallet",
        name: "Foo Wallet",
        icon: "http://example.com/foo-wallet.svg",
      },
      {
        type: ConnectType.WALLETCONNECT,
        name: "Wallet Connect",
        icon: "http://example.com/wallet-connect.svg",
      },

      // Read-only wallets are ignored by the component
      {
        type: ConnectType.READONLY,
        identifier: "readonly-wallet",
        name: "Readonly Wallet",
        icon: "http://example.com/readonly-wallet.svg",
      },
    ];

    const availableInstallations = [
      {
        type: ConnectType.EXTENSION,
        identifier: "xdefi-wallet",
        name: "XDEFI Wallet",
        icon: "http://example.com/xdefi-wallet.svg",
        url: "http://example.com/install-xdefi-wallet",
      },
    ];

    (useWallet as jest.Mock<Wallet>).mockImplementation(
      useWalletMock({ availableConnections, availableInstallations })
    );
  });

  it("renders a button for each available and installable extension", () => {
    render(<ConnectWalletModal isOpen={true} onClose={() => {}} />);

    // available connections
    expect(
      screen.getByRole("button", { name: "Terra Station" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Leap Wallet" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Foo Wallet" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Wallet Connect" })
    ).toBeInTheDocument();

    // installable connections
    expect(
      screen.getByRole("button", { name: "Install XDEFI Wallet" })
    ).toBeInTheDocument();

    // available read-only connections
    expect(
      screen.queryByRole("button", { name: "Readonly Wallet" })
    ).not.toBeInTheDocument();
  });

  it("opens install URL when installable connection button is clicked", () => {
    const windowSpy = jest.spyOn(window, "open").mockImplementation(jest.fn());

    render(<ConnectWalletModal isOpen={true} onClose={() => {}} />);

    userEvent.click(
      screen.getByRole("button", { name: "Install XDEFI Wallet" })
    );

    expect(windowSpy).toHaveBeenCalledWith(
      "http://example.com/install-xdefi-wallet",
      "_blank"
    );

    windowSpy.mockRestore();
  });
});
