import React, { createContext, useState, ReactNode, useContext } from "react";

interface Wallet {
    transactions: any;
    address: string;
    coin: string;
    balance: number;
}

interface WalletsContextType {
    wallets: Wallet[];
    setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
}

const WalletsContext = createContext<WalletsContextType | undefined>(undefined);

export const useWallets = () => {
    const context = useContext(WalletsContext);
    if (!context) {
        throw new Error("useWallets must be used within a WalletsProvider");
    }
    return context;
};

interface WalletsProviderProps {
    children: ReactNode;
}

export const WalletsProvider: React.FC<WalletsProviderProps> = ({ children }) => {
    const [wallets, setWallets] = useState<Wallet[]>([]);

    return (
        <WalletsContext.Provider value={{ wallets, setWallets }}>
            {children}
        </WalletsContext.Provider>
    );
};
