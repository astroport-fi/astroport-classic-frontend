import { orderPoolTokens, shouldReverseTokenOrder } from "modules/pool";

const fooToken = { asset: "terrafoo", symbol: "FOO" };
const ust = { asset: "uusd", symbol: "USTC" };
const luna = { asset: "uluna", symbol: "LUNAC" };

describe("orderPoolTokens", () => {
  it("swaps assets when USTC is first", () => {
    expect(orderPoolTokens(ust, fooToken)).toEqual(["terrafoo", "uusd"]);
  });

  it("does not swap assets when USTC is second", () => {
    expect(orderPoolTokens(fooToken, ust)).toEqual(["terrafoo", "uusd"]);
  });

  it("swaps assets when LUNAC is first", () => {
    expect(orderPoolTokens(luna, fooToken)).toEqual(["terrafoo", "uluna"]);
  });

  it("does not swap assets when LUNAC is second", () => {
    expect(orderPoolTokens(fooToken, luna)).toEqual(["terrafoo", "uluna"]);
  });

  it("swaps assets in USTC-LUNAC pool when USTC is first", () => {
    expect(orderPoolTokens(ust, luna)).toEqual(["uluna", "uusd"]);
  });

  it("does not swap assets in LUNAC-USTC pool when LUNA is first", () => {
    expect(orderPoolTokens(luna, ust)).toEqual(["uluna", "uusd"]);
  });
});

describe("shouldReverseTokenOrder", () => {
  it("returns true when USTC is first", () => {
    expect(shouldReverseTokenOrder("USTC", "FOO")).toEqual(true);
  });

  it("returns false when USTC is second", () => {
    expect(shouldReverseTokenOrder("FOO", "USTC")).toEqual(false);
  });

  it("returns true when LUNAC is first", () => {
    expect(shouldReverseTokenOrder("LUNAC", "FOO")).toEqual(true);
  });

  it("returns false when LUNAC is second", () => {
    expect(shouldReverseTokenOrder("FOO", "LUNAC")).toEqual(false);
  });

  it("returns true in USTC-LUNAC pool when USTC is first", () => {
    expect(shouldReverseTokenOrder("USTC", "LUNAC")).toEqual(true);
  });

  it("returns false in LUNAC-USTC pool when LUNAC is first", () => {
    expect(shouldReverseTokenOrder("LUNAC", "USTC")).toEqual(false);
  });
});
