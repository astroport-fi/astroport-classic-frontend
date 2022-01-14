// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import "@testing-library/jest-dom";

// Resolves "Crypto module not found" error when running test suite,
// stemming from newer versions of terra.js
global.crypto = require("crypto");
