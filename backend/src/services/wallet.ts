import hdkey from 'hdkey';
import * as bitcoin from 'bitcoinjs-lib';
import { mnemonicToSeed } from './mnemonic';

export interface Wallet {
    index: number;
    address: string;
    privateKey: string;
    publicKey: string;
}

export function deriveWallets(mnemonic: string, count: number = 5): Wallet[] {
    const seed = mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);

    const wallets: Wallet[] = [];
    for (let i = 0; i < count; i++) {
        const path = `m/44'/1'/0'/0/${i}`;
        const child = root.derive(path);

        if (!child.publicKey) {
            throw new Error(`Failed to derive public key for index ${i}`);
        }

        const address = bitcoin.payments.p2pkh({
            pubkey: child.publicKey as Uint8Array,
            network: bitcoin.networks.testnet,
        }).address || '';

        wallets.push({
            index: i,
            address,
            privateKey: child.privateKey?.toString('hex') || '',
            publicKey: child.publicKey.toString('hex'),
        });
    }

    return wallets;
}
