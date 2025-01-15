import { Router, Request, Response } from 'express';
import { generateMnemonic, validateMnemonic } from '../services/mnemonic';
import { deriveWallets } from '../services/wallet';
import { addTask, syncQueue } from '../services/queue';
import {balanceWorker, historyWorker, fetchBalance, fetchTransactions} from '../workers/worker';
const walletsStore: any[] = [];

const router = Router();

interface MnemonicRequestBody {
    mnemonic?: string;
}

interface WalletsQuery {
    mnemonic?: string;
    count?: number;
}

router.post('/mnemonic', (req: Request<{}, {}, MnemonicRequestBody>, res: Response) => {
    const { mnemonic } = req.body;

    if (mnemonic) {
        if (!validateMnemonic(mnemonic)) {
            return res.status(400).json({ error: 'Invalid mnemonic phrase' });
        }
        return res.json({ mnemonic, valid: true });
    }

    const newMnemonic = generateMnemonic();
    res.json({ mnemonic: newMnemonic });
});


router.get('/wallets', async (req: Request<{}, {}, {}, WalletsQuery>, res: Response) => {
    const { mnemonic, count } = req.query;


    if (!mnemonic || !validateMnemonic(mnemonic)) {
        return res.status(400).json({ error: 'Invalid mnemonic phrase' });
    }


    const walletCount = count ? parseInt(String(count), 10) : 5;
    if (isNaN(walletCount) || walletCount <= 0) {
        return res.status(400).json({ error: "Invalid wallet count" });
    }

    const wallets = deriveWallets(mnemonic, walletCount);

    const walletsWithBalance = await Promise.all(
        wallets.map(async (wallet) => {
            const balance = await fetchBalance(wallet);
            const transactions = await fetchTransactions(wallet);
            return {
                ...wallet,
                balance,
                coin: "BTC",
                transactions
            };
        })
    );

    walletsWithBalance.forEach((wallet) => {
        const exists = walletsStore.find(w => w.address === wallet.address);
        if (!exists) {
            walletsStore.push(wallet);
        }
    });

    walletsWithBalance.forEach(wallet => {
        addTask('BalanceSyncItem', wallet);
        addTask('HistorySyncItem', wallet);
    });

    res.json(walletsWithBalance);
});

router.post('/sync', async (req: Request, res: Response) => {
    if (syncQueue.length === 0) {
        return res.status(400).json({ error: 'No tasks in the queue' });
    }

    await Promise.all([balanceWorker(), historyWorker()]);
    res.json({ message: 'Sync completed', remainingQueue: syncQueue });
});


export default router;
