import { render, screen } from "@testing-library/react";
import ConnectWalletModal from "components/modals/ConnectWalletModal";
import { ConnectType, useWallet, Wallet } from "@terra-money/wallet-provider";

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
    ...overrides,
  });
};

describe("ConnectWalletModal", () => {
  it("renders a button for each extension and mobile", () => {
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

      // Non-extension connections are ignored by component
      {
        type: ConnectType.WALLETCONNECT,
        name: "Wallet Connect",
        icon: "http://example.com/wallet-connect.svg",
      },
    ];

    (useWallet as jest.Mock<Wallet>).mockImplementation(
      useWalletMock({ availableConnections })
    );

    render(<ConnectWalletModal isOpen={true} onClose={() => {}} />);

    expect(
      screen.getByRole("button", { name: "Terra Station Extension" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Leap Wallet Extension" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Foo Wallet Extension" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Terra Station Mobile" })
    ).toBeInTheDocument();
  });
});
