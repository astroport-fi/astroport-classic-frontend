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
