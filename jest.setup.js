// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import "@testing-library/jest-dom";

// Import any jest-extended matchers that we need
import { toHaveBeenCalledBefore, toHaveBeenCalledAfter } from "jest-extended";

// Resolves "Crypto module not found" error when running test suite,
// stemming from newer versions of terra.js
global.crypto = require("crypto");

// Extend Jest's expect with jest-extended matchers that we need
expect.extend({ toHaveBeenCalledBefore, toHaveBeenCalledAfter });

// https://jestjs.io/docs/26.x/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
