# Playwright API Tests

This repository contains automated API tests written using [Playwright](https://playwright.dev/). These tests interact with a RESTful API and cover various operations like creating, retrieving, updating, and deleting objects.

## Table of Contents

- [Project Setup](#project-setup)
- [Test Scenarios](#test-scenarios)
- [Running Tests](#running-tests)

## Project Setup

### Prerequisites

- **Node.js**: Ensure that you have [Node.js](https://nodejs.org/) installed (preferably version 14 or higher).
- **Git**: Make sure you have Git installed to clone the repository.

### Install Dependencies

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/playwright-tests.git
    cd playwright-tests
    ```

2. Install required dependencies:

    ```bash
    npm install
    ```

3. Playwright requires some additional browser binaries, so install them with the following command:

    ```bash
    npx playwright install
    ```

### Configuration

The tests interact with an API endpoint at `https://api.restful-api.dev`. Make sure the API is running and accessible, or adjust the `BASE_URL` in the test code accordingly.

## Test Scenarios

The following test scenarios are covered in this repository:

### 1. **Get All Objects**
- **Test Description**: Fetches a list of all objects from the API and checks if the response is an array with a 200 status code.
- **Test**: `Get list of all objects`

### 2. **Create New Object and Retrieve by ID**
- **Test Description**: Creates a new object and then fetches the created object by its ID to verify its data.
- **Test**: `Create a new object`, `Get a single object by ID`

### 3. **Create New Object and Update It**
- **Test Description**: Creates a new object, then updates the object with new data, and checks if the update is successful.
- **Test**: `Create a new object`, `Update previously created object`

### 4. **Create New Object and Delete It**
- **Test Description**: Creates a new object and deletes it. Verifies that the deletion response is as expected.
- **Test**: `Create a new object`, `Delete previously created object`

### 5. **Delete Unknown Object**
- **Test Description**: Attempts to delete an object with an invalid ID and verifies that the API returns a 404 error.
- **Test**: `Delete unknown object`

## Running Tests

1. To run the tests locally, use the following command:

    ```bash
    npx playwright test
    ```

   This will run all the tests using Playwright Test runner. The tests will execute in headless mode by default.

2. **Running a specific test**: If you want to run a specific test file or test case, use the following command:

    ```bash
    npx playwright test tests/apiTest.test.js
    ```
