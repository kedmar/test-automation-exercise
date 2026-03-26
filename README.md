# Test Automation Exercise

A test automation exercise project by Frontegg. This repository contains a React client application built with Vite and the Frontegg SDK, along with an E2E test suite powered by Playwright.

## Client Application

The client app (`client-app/client-app-vite`) is a React application that integrates with the Frontegg platform. It provides hosted and embedded login flows, tenant switching, step-up authentication, and feature flag evaluation. The app runs locally on port 3000 using Vite.

## Project Structure

```
test-automation-exercise/
├── client-app/
│   ├── client-app-vite/    # React + Vite application with Frontegg SDK
│   └── utils/              # Shared client utilities
├── tests/
│   ├── src/
│   │   └── e2e-tests/      # E2E test specs
│   ├── utils/              # Test utilities and config helpers
│   ├── playwright.config.ts
│   ├── getReporters.ts
│   ├── tsconfig.json
│   └── package.json
└── docs/
    └── images/             # Screenshots for exercise reference
```

## Prerequisites

- Node.js v24.13.0 (see `.nvmrc`)
- npm
- [Yarn](https://yarnpkg.com/) (for the client app)

### Installing Yarn

If you don't have Yarn installed, you can install it via npm:

```bash
npm install -g yarn
```

Or via Corepack (bundled with Node.js 16+):

```bash
corepack enable
```

## Getting Started

Run the following command to clone the repo:

```bash
curl -fsSL https://raw.githubusercontent.com/frontegg/test-automation-exercise/master/scripts/setup.sh | bash
```

### Install and start the client app

```bash
cd test-automation-exercise/client-app/client-app-vite
yarn install
yarn start
```

The client app will be available at `http://localhost:3000`.

### Install test dependencies and run the tests

```bash
cd test-automation-exercise/tests
npm install
npm test
```

## Requirements

### 1. Make the first test pass

A sanity test exists in `tests/src/e2e-tests/sanity.spec.ts`. It navigates to the application and verifies the page loads with the expected heading. The test should work for any developer cloning the repo and on CI without manually starting the client app. Make the necessary changes so that this test passes when running `npm test`.

### 2. Health check before test execution

Before any project run, verify that the system under test is up and running. Implement a way to check if `https://api.stg.frontegg.com/test` returns 200. If the health check fails, the test suite should not execute.

### 3. Verify SSO provider buttons on the hosted login page

The client application displays the following page:

![Client App](docs/images/client-app.png)

Click the **"Click me to login - hosted"** button. This will redirect to the hosted login page:

![Hosted Login](docs/images/hosted-login.png)

Write a test that verifies all three SSO provider buttons are visible on the hosted login page:
- **GitHub**
- **Microsoft**
- **custom provider**

### 4. Failed login attempt

On the hosted login page, enter a valid email address in the email input and a random password in the password field. Click the **"Sign in"** button. Verify that:
1. An error message is displayed to the user.
2. The corresponding network request to the authentication endpoint was made.

### 5. HTML test report

Configure the test suite to generate an HTML report after the tests finish. The report should be generated automatically on every run and include test results, screenshots, and traces for failed tests.

### 6. Capture Frontegg trace IDs on failure

Every network response from Frontegg includes a `frontegg-trace-id` header. This trace ID is critical for debugging server-side issues. Implement a mechanism that collects `frontegg-trace-id` values from network responses during each test. When a test fails, attach the collected trace IDs to the test report so developers can use them to investigate what went wrong on the backend.