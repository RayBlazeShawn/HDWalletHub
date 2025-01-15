import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {useWallets} from "../contexts/WalletsContext.tsx";

const Container = styled.div`
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

const Title = styled.h2`
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
`;

const TotalTransactions = styled.div`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
`;

const TransactionTable = styled.table`
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

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
`;

const StatusBadge = styled.span<{ status: string }>`
  color: ${({ status, theme }) =>
    status === "Received" ? theme.colors.primary : theme.colors.error};
  font-weight: bold;
`;

interface Transaction {
    walletAddress: string;
    amount: number;
    hash: string;
    confirmations: number;
    date: string;
    result: string;
}

const Transactions: React.FC = () => {
    const { wallets} = useWallets();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        try {
            const allTransactions: Transaction[] = wallets.flatMap((wallet) =>
                wallet.transactions.map((tx: any) => {
                    const isOutgoing = tx.inputs.some((input: any) =>
                        input.addresses.includes(wallet.address)
                    );

                    const amount = tx.total / 1e8;
                    const confirmations = tx.confirmations;
                    const date = tx.confirmed || 'Pending';
                    const result = isOutgoing ? 'Sent' : 'Received';

                    return {
                        walletAddress: wallet.address,
                        amount,
                        hash: tx.hash,
                        confirmations,
                        date,
                        result,
                    };
                })
            );

            setTransactions(allTransactions);
        } catch (err) {
            console.error('Failed to process transactions:', err);
            setError('Failed to process transactions. Please try again.');
        }
    }, [wallets]);

    return (
        <Container>
            <Header>
                <Title>Transactions</Title>
                <TotalTransactions>Total Transactions: {transactions.length}</TotalTransactions>
            </Header>
            {error && <ErrorText>{error}</ErrorText>}
            <TransactionTable>
                <thead>
                <tr>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Wallet</TableHeader>
                    <TableHeader>Amount</TableHeader>
                    <TableHeader>Result</TableHeader>
                    <TableHeader>Status</TableHeader>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                        <TableData>{transaction.date}</TableData>
                        <TableData>{transaction.walletAddress}</TableData>
                        <TableData>{transaction.amount} BTC</TableData>
                        <TableData>{transaction.result}</TableData>
                        <TableData>
                            <StatusBadge status={transaction.confirmations > 0 ? "Confirmed" : "Pending"}>
                                {transaction.confirmations > 0 ? "Confirmed" : "Pending"}
                            </StatusBadge>
                        </TableData>
                    </TableRow>
                ))}
                </tbody>
            </TransactionTable>
        </Container>
    );
};

export default Transactions;