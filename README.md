# Bitcoin Wallet and Transactions Viewer

A simple application to import Bitcoin wallets, view their balances, and display recent transactions using the Bitcoin testnet.

## Overview

This project consists of a backend and frontend application that allows users to:

- **Import Bitcoin Wallets**: Use a mnemonic phrase to derive multiple wallets.
- **View Wallet Balances**: Display the balance of each imported wallet.
- **Display Recent Transactions**: Show recent transactions associated with the wallets.
- **Sync Wallet Data**: Manually sync wallet data with the Bitcoin testnet.

## Technologies Used

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, TypeScript, Styled-components
- **API**: BlockCypher API for interacting with the Bitcoin testnet

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn**


### Running the Application
1. Start the backend server:
2. Start the frontend server:
3. Open the frontend in your browser (http://localhost:5173 by default).

### Test Scenarios
#### 1. Generate and Import a Wallet
- **Input**: Click "Import Wallet", generate a mnemonic, set the wallet count to `5`, and submit.
- **Expected Output**: The wallets table should populate with 5 rows. Each row will have:
- Coin: `BTC`
- Holding: `0` (or a valid balance fetched from the blockchain)
- Actions: Delete button

#### 2. Refresh Wallet Sync
- **Action**: Click the **Re-Sync** button on the UI.
- **Expected Output**: The "Synced" status briefly changes to "Syncing..." and updates wallet balances if available.

#### 3. Delete a Wallet
- **Action**: Click the delete button (🗑️) on a wallet row.
- **Expected Output**: The selected wallet is removed from the table.

#### 4. Test Invalid Mnemonic
- **Input**: Enter an invalid mnemonic phrase.
- **Expected Output**: An error message is displayed: "Invalid mnemonic phrase".

### Backend API Test (Using Postman)
1. **Generate Mnemonic**:
- Endpoint: `GET http://localhost:3000/api/mnemonic`
- Expected Output: A valid mnemonic phrase in JSON format.
2. **Import Wallets**:
- Endpoint: `GET http://localhost:3000/api/wallets?mnemonic=<your-mnemonic>&count=3`
- Expected Output: A list of 3 wallets with their addresses, private/public keys, and balances.
3. **Delete Wallet**:
- Endpoint: `DELETE http://localhost:3000/api/wallets/<wallet-id>`
- Expected Output: Confirmation of the wallet deletion.

---

### API Testing with Postman
Use the included [postman_collection.json](./HD Wallet Backend API.postman_collection.json) file to test the API endpoints. Import it into Postman and run the requests.


