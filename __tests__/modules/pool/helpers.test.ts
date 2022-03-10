import { orderPoolTokens, shouldReverseTokenOrder } from "modules/pool";

const fooToken = { asset: "terrafoo", symbol: "FOO" };
const ust = { asset: "uusd", symbol: "UST" };
const luna = { asset: "uluna", symbol: "LUNA" };

describe("orderPoolTokens", () => {
  it("swaps assets when UST is first", () => {
    expect(orderPoolTokens(ust, fooToken)).toEqual(["terrafoo", "uusd"]);
  });

  it("does not swap assets when UST is second", () => {
    expect(orderPoolTokens(fooToken, ust)).toEqual(["terrafoo", "uusd"]);
  });

  it("swaps assets when LUNA is first", () => {
    expect(orderPoolTokens(luna, fooToken)).toEqual(["terrafoo", "uluna"]);
  });

  it("does not swap assets when LUNA is second", () => {
    expect(orderPoolTokens(fooToken, luna)).toEqual(["terrafoo", "uluna"]);
  });

  it("swaps assets in UST-LUNA pool when UST is first", () => {
    expect(orderPoolTokens(ust, luna)).toEqual(["uluna", "uusd"]);
  });

  it("does not swap assets in LUNA-UST pool when LUNA is first", () => {
    expect(orderPoolTokens(luna, ust)).toEqual(["uluna", "uusd"]);
  });
});

describe("shouldReverseTokenOrder", () => {
  it("returns true when UST is first", () => {
    expect(shouldReverseTokenOrder("UST", "FOO")).toEqual(true);
  });

  it("returns false when UST is second", () => {
    expect(shouldReverseTokenOrder("FOO", "UST")).toEqual(false);
  });

  it("returns true when LUNA is first", () => {
    expect(shouldReverseTokenOrder("LUNA", "FOO")).toEqual(true);
  });

  it("returns false when LUNA is second", () => {
    expect(shouldReverseTokenOrder("FOO", "LUNA")).toEqual(false);
  });

  it("returns true in UST-LUNA pool when UST is first", () => {
    expect(shouldReverseTokenOrder("UST", "LUNA")).toEqual(true);
  });

  it("returns false in LUNA-UST pool when LUNA is first", () => {
    expect(shouldReverseTokenOrder("LUNA", "UST")).toEqual(false);
  });
});
