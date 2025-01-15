import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import ImportWallet from "../components/ImportWallet";
import {useWallets} from "../contexts/WalletsContext";

const Content = styled.div`
    flex: 1;
    padding: ${({ theme }) => theme.spacing(4)};
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const SyncedStatus = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.primary};
`;

const Button = styled.button`
    padding: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border-radius: ${({ theme }) => theme.spacing(0.5)};
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    border: none;

    &:hover {
        background-color: #e6a500;
    }
`;

const WalletTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    text-align: left;
    padding: ${({ theme }) => theme.spacing(2)};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.card};
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background: ${({ theme }) => theme.colors.background};
    }
`;

const TableData = styled.td`
    padding: ${({ theme }) => theme.spacing(2)};
    color: ${({ theme }) => theme.colors.text};
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.error};
    cursor: pointer;

    &:hover {
        color: #ff4d4f;
    }
`;


const ListWallets: React.FC = () => {
    const { wallets, setWallets } = useWallets();
    const [showImportModal, setShowImportModal] = useState(false);
    const [syncStatus, setSyncStatus] = useState("No wallets imported");

    const fetchWallets = async (mnemonic: string, count: number) => {
        try {
            setSyncStatus("Syncing...");
            const response = await axios.get("http://localhost:3000/api/wallets", {
                params: { mnemonic, count },
            });
            setWallets(response.data);
            setSyncStatus("Synced");
        } catch (err) {
            console.error("Failed to fetch wallets:", err);
            setSyncStatus("Failed to sync");
        }
    };

    const handleImportWallet = (mnemonic?: string, count?: number) => {
        setShowImportModal(false);
        if (mnemonic && count !== undefined) {
            fetchWallets(mnemonic, count);
        } else {
            console.error("Mnemonic or count not provided");
        }
    };

    const handleDelete = (walletAddress: string) => {
        setWallets(wallets.filter((wallet) => wallet.address !== walletAddress));
    };

    return (
        <Content>
            <Header>
                <h2>Wallets</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <SyncedStatus>{syncStatus}</SyncedStatus>
                    <Button onClick={() => setShowImportModal(true)}>Import Wallet</Button>
                </div>
            </Header>
            <WalletTable>
                <thead>
                <tr>
                    <TableHeader>Coin</TableHeader>
                    <TableHeader>Holding</TableHeader>
                    <TableHeader>Actions</TableHeader>
                </tr>
                </thead>
                <tbody>
                {wallets.length ? (
                    wallets.map((wallet) => (
                        <TableRow key={wallet.address}>
                            <TableData>{wallet.coin}</TableData>
                            <TableData>{wallet.balance} BTC</TableData>
                            <TableData>
                                <DeleteButton onClick={() => handleDelete(wallet.address)}>🗑️</DeleteButton>
                            </TableData>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableData colSpan={3} style={{ textAlign: "center" }}>
                            No wallets found.
                        </TableData>
                    </TableRow>
                )}
                </tbody>
            </WalletTable>
            {showImportModal && (
                <ImportWallet onClose={(mnemonic, count) => handleImportWallet(mnemonic, count)} />
            )}
        </Content>
    );
};

export default ListWallets;


