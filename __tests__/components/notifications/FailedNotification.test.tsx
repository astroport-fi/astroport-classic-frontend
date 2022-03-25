import FailedNotification from "components/notifications/FailedNotification";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("FailedNotification", () => {
  it("displays friendly message for transaction parse errors (SDK 2)", () => {
    const txInfo: any = {
      code: 2,
      codespace: "sdk",
      raw_log: "raw error message",
    };

    render(<FailedNotification txInfo={txInfo} />);

    expect(
      screen.getByText(
        "We're sorry, we were unable to parse your transaction. Please try again."
      )
    ).toBeInTheDocument();
  });

  it("displays friendly message for mempool full errors (SDK 20)", () => {
    const txInfo: any = {
      codespace: "sdk",
      code: 20,
      raw_log: "raw error message",
    };

    render(<FailedNotification txInfo={txInfo} />);

    expect(
      screen.getByText(
        "Sorry, the mempool is full and cannot accept any more transactions. Please try again later."
      )
    ).toBeInTheDocument();
  });

  it("displays raw_log when codespace is missing from txinfo", () => {
    const txInfo: any = {
      code: 2,
      raw_log: "raw error message",
    };

    render(<FailedNotification txInfo={txInfo} />);

    expect(screen.getByText("raw error message")).toBeInTheDocument();
  });

  it("displays raw_log when code is missing from txinfo", () => {
    const txInfo: any = {
      codespace: "sdk",
      raw_log: "raw error message",
    };

    render(<FailedNotification txInfo={txInfo} />);

    expect(screen.getByText("raw error message")).toBeInTheDocument();
  });

  it("displays raw_log when codespace does not have an error mapping", () => {
    const txInfo: any = {
      codespace: "oracle",
      code: 2,
      raw_log: "raw error message",
    };

    render(<FailedNotification txInfo={txInfo} />);

    expect(screen.getByText("raw error message")).toBeInTheDocument();
  });

  it("displays raw_log when codespace has mappings, but one is missing for the code", () => {
    const txInfo: any = {
      codespace: "sdk",
      code: 42,
      raw_log: "raw error message",
    };

    render(<FailedNotification txInfo={txInfo} />);

    expect(screen.getByText("raw error message")).toBeInTheDocument();
  });

  it("displays raw_log when codespace (sdk) and code has a mapping, but there is no friendly error message for it", () => {
    const txInfo: any = {
      codespace: "sdk",
      code: 36, // CosmosError.Conflict
      raw_log: "raw error message",
    };

    render(<FailedNotification txInfo={txInfo} />);

    expect(screen.getByText("raw error message")).toBeInTheDocument();
  });

  it("displays a generic friendly error message for WasmError.ExecuteFailed", () => {
    const txInfo: any = {
      codespace: "wasm",
      code: 4, // WasmError.ExecuteFailed
      raw_log: "contract execute failed",
    };

    render(<FailedNotification txInfo={txInfo} />);

    expect(
      screen.getByText(
        "Execution failed: we're sorry, we were unable to realize your transaction. Please try again."
      )
    ).toBeInTheDocument();
  });

  it("displays a non generic friendly error message for a detectable WasmError.ExecuteFailed", () => {
    const txInfo: any = {
      codespace: "wasm",
      code: 4, // WasmError.ExecuteFailed
      raw_log: "minimum receive amount",
    };

    render(<FailedNotification txInfo={txInfo} />);

    expect(
      screen.getByText(
        "Execution failed: slippage tolerance exceeded for the current swap."
      )
    ).toBeInTheDocument();
  });
});
