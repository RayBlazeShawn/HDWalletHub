import * as bip39 from 'bip39';

export function generateMnemonic(): string {
    return bip39.generateMnemonic();
}

export function validateMnemonic(mnemonic: string): boolean {
    return bip39.validateMnemonic(mnemonic);
}

export function mnemonicToSeed(mnemonic: string): Buffer {
    if (!validateMnemonic(mnemonic)) {
        throw new Error('Invalid mnemonic phrase');
    }
    return bip39.mnemonicToSeedSync(mnemonic);
}
