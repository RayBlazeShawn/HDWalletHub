import { Wallet } from './wallet';

export interface SyncTask {
    type: 'BalanceSyncItem' | 'HistorySyncItem';
    wallet: Wallet;
}

export const syncQueue: SyncTask[] = [];


export function addTask(type: SyncTask['type'], wallet: Wallet): void {
    syncQueue.push({ type, wallet });
}


export function getTask(): SyncTask | undefined {
    return syncQueue.shift();
}


export function isQueueEmpty(): boolean {
    return syncQueue.length === 0;
}
