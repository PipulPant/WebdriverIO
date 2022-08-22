## Getting Started

Use yarn to install all the package.json dependencies.

```sh
yarn install
```

Configure following environment variables:

```sh
APP_ENV
# Browserstack config (optional for local test)
BROWSERSTACK_USERNAME
BROWSERSTACK_ACCESS_KEY
# Mailosaur config
MAILOSAUR_SERVER_ID
MAILOSAUR_API_KEY
```

ENV can be set with `.env.local` file for running locally.

## Running Tests

Tests can be run as follows:

```sh
# run test locally
yarn test:local

# run test with browserstack
yarn test:bs

# run test on browserstack local
yarn test:bs:local
```

> **Note** If you're testing locally, make sure you're running the build locally before running tests.
