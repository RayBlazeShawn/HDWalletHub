import axios from 'axios';
import { Wallet } from '../services/wallet';
import { getTask, isQueueEmpty } from '../services/queue';
import { BLOCKCYPHER_API_KEY } from '../config/dotenv';


function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


export async function withRetries<T>(func: () => Promise<T>, retries: number = 3, backoff: number = 1000): Promise<T> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await func();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 429) {
                    console.warn(`Attempt ${attempt} failed due to rate limiting. Retrying in ${backoff}ms...`);
                    await delay(backoff);
                    backoff *= 2;
                } else {
                    console.error(`Error: ${error.response.status} ${error.response.statusText}`);
                    throw error;
                }
            } else if (attempt < retries) {
                console.warn(`Attempt ${attempt} failed. Retrying in ${backoff}ms...`);
                await delay(backoff);
                backoff *= 2;
            } else {
                console.error(`All ${retries} attempts failed.`);
                throw error;
            }
        }
    }
    throw new Error('All retries failed');
}


export async function fetchBalance(wallet: { address: string }): Promise<number> {
    try {
        const response = await withRetries(async () => {
            return await axios.get(
                `https://api.blockcypher.com/v1/btc/test3/addrs/${wallet.address}/balance?token=${BLOCKCYPHER_API_KEY}`
            );
        });
        return response.data.balance || 0;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error fetching balance for address ${wallet.address}:`, error.message);
        }
        return 0;
    }
}


export async function fetchTransactions(wallet: Wallet): Promise<any[]> {
    try {
        const response = await withRetries(async () => {
            return await axios.get(
                `https://api.blockcypher.com/v1/btc/test3/addrs/${wallet.address}/full?token=${BLOCKCYPHER_API_KEY}`
            );
        });
        return response.data.txs || [];
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error fetching transactions for address ${wallet.address}:`, error.message);
        }
        return [];
    }
}


export async function balanceWorker(): Promise<void> {
    while (!isQueueEmpty()) {
        const task = getTask();
        if (task?.type === 'BalanceSyncItem') {
            console.log(`Processing BalanceSyncItem for wallet ${task.wallet.address}`);
            try {
                await fetchBalance(task.wallet);
            } catch (error) {
                if(error instanceof Error ){
                    console.error(`Failed BalanceSyncItem for wallet ${task.wallet.address}: ${error.message}`);
                } else{
                    console.error(`Failed BalanceSyncItem for wallet ${task.wallet.address}: Unknown error`);
                }
            }
            await delay(200);
        }
    }
    console.log('BalanceWorker: All tasks completed.');
}


export async function historyWorker(): Promise<void> {
    while (!isQueueEmpty()) {
        const task = getTask();
        if (task?.type === 'HistorySyncItem') {
            console.log(`Processing HistorySyncItem for wallet ${task.wallet.address}`);
            try {
                await fetchTransactions(task.wallet);
            } catch (error) {
                if(error instanceof Error ){
                    console.error(`Failed HistorySyncItem for wallet ${task.wallet.address}: ${error.message}`);
                } else{
                    console.error(`Failed HistorySyncItem for wallet ${task.wallet.address}: Unknown error`);
                }
            }
            await delay(200);
        }
    }
    console.log('HistoryWorker: All tasks completed.');
}