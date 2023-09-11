## ⚠️ Deprecation and maintenace

This repository is no longer actively maintained by Astroport. It will continue to be here on GitHub and freely available for anyone to fork and use, but we will not be actively monitoring or replying to issues and pull requests. To run this application, you will need to configure `NEXT_PUBLIC_API_CLASSIC` and `NEXT_PUBLIC_GQL_CLASSIC` in your env file.

1. NEXT_PUBLIC_API_CLASSIC can be setup by running an instance of [Astroport Classic API](https://github.com/astroport-fi/terra1-astroport-api)
2. NEXT_PUBLIC_GQL_CLASSIC can be any GraphQL endpoint that runs a terra 1 hive node.

---

# Astroport Core UI

| Master                                                                                                                                   | Develop                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Test Suite (master)](https://github.com/astroport-fi/astroport-core-frontend/actions/workflows/test_suite.yml/badge.svg?branch=master) | ![Test Suite (develop)](https://github.com/astroport-fi/astroport-core-frontend/actions/workflows/test_suite.yml/badge.svg?branch=develop) |

The Astroport Core UI is a web frontend used for interacting with the Astroport Smart Contracts. It is intended to be used with the [Terra Station Extension](https://terra.money/extension) plugin for Chromium browsers.

## Development

This project is using:

- [Next.js](https://github.com/vercel/next.js)
- [Chakra UI](https://chakra-ui.com)

Requirements:

- node v14
- npm v7

For environment settings, you should create a `.env.local` file. You can copy the existing template (`cp .env.template .env.local`) in order to do so:

```
NEXT_PUBLIC_API_CLASSIC=""
NEXT_PUBLIC_GQL_CLASSIC=""

If you have nvm installed, you should select the correct npm version for your environment based on the [.nvmrc](.nvmrc). Note that v14 ships with npm v6 and you'll need to update npm with `npm install -g npm@7`.

### `npm run dev`

Runs the app in development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

## Notifications & Transaction Tracking

Astroport Core UI provides a notification system that uses Toast-style notifications to provide feedback to the user.

Notifications can be added via the `addNotification` function returned by the `useAstroswap` hook.

Notification payloads include a `type` and other attributes, defined in the notifications [model](modules/common/notifications/model.ts).

The `"started"` notification type is a special type, which increases the "Pending Transactions" count and tracks the transaction through to success or failure. (see [TransactionStarted](components/notifications/TransactionStarted.tsx))

Transaction-related notifications (including `"started"` notifications) are handled for you automatically when using the `useTx` or `useTransaction` hooks (more below).

## Posting Transactions

Astroport Core UI provides two hooks designed to simplify transaction posting:
- `useTx` — Thin wrapper around `@terra-money/wallet-provider`'s `post` function. Can be configured with `onPosting`, `onBroadcasting`, and `onError` lifecycle hooks. Returns a `submit` function that accepts Messages and a Fee. Hooks into Astroport Core's notification and transaction tracking systems to provide feedback to the user via Toast notifications.
- `useTransaction` — Higher-level hook that provides message debouncing, automatic fee calculation, and lifecycle state. Internally uses `useTx` to post. Can be configured with `onBroadcasting` and `onError` lifecycle hooks. Returns some state and a `submit` function to post the transaction.

### Adding new transactions

When adding a new transactions to the Astroport Core UI, the following tasks must be completed:
1. Select a new notification `txType` string for the transaction.
2. Add a component for the body of successful notifications to [components/notifications](components/notifications)
3. Add a case for the selected `txType` (step 1) using the component from step 2 to the `renderSuccessfulTxContent` function in the [Notifications component](components/Notifications.tsx).
4. Add the `type` and `notifications.data` object type definition to the `UseTxNotificationDetails` type in the [useTx](modules/common/hooks/useTx.ts) hook.
5. (optional) Add a custom title for transaction post error notifications to the `errorNotificationTitle` function in the [useTx](modules/common/hooks/useTx.ts) hook.
```
