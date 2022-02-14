| Master | Develop |
| ------ | ------- |
| ![Test Suite (master)](https://github.com/astroport-fi/astroport-core-frontend/actions/workflows/test_suite.yml/badge.svg?branch=master) | ![Test Suite (develop)](https://github.com/astroport-fi/astroport-core-frontend/actions/workflows/test_suite.yml/badge.svg?branch=develop) |

# Astroport Core UI

The Astroport Core UI is a web frontend used for interacting with the Astroport Smart Contracts. It is intended to be used with the [Terra Station Extension](https://terra.money/extension) plugin for Chromium browsers.

## Development

This project is using:

- [Next.js](https://github.com/vercel/next.js)
- [Chakra UI](https://chakra-ui.com)

Requirements:
- node v14
- npm v7

Env Settings:
Create an `.env.local` file. You can copy the existing template (`cp .env.template .env.local`)

```
DISPLAY_GOVERNANCE=1
```

If you have nvm installed, you should select the correct version for you based on the [.nvmrc](.nvmrc). Note that v14 ships with npm v6 and you'll need to update npm with `npm install -g npm@7`.

### `npm run dev`

Runs the app in development mode.

### `npm test`

Launches the test runner in the interactive watch mode.
