import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: ${({ theme }) => theme.colors.card};
    padding: ${({ theme }) => theme.spacing(4)};
    border-radius: ${({ theme }) => theme.spacing(1)};
    position: relative;
    width: 400px;
`;

const CloseIcon = styled.span`
    position: absolute;
    top: ${({ theme }) => theme.spacing(2)};
    right: ${({ theme }) => theme.spacing(2)};
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
`;

const FormGroup = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const Label = styled.label`
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
    width: 100%;
    padding: ${({ theme }) => theme.spacing(1)};
    border: 1px solid ${({ theme }) => theme.colors.text};
    border-radius: ${({ theme }) => theme.spacing(0.5)};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: ${({ theme }) => theme.spacing(1)};
    border: 1px solid ${({ theme }) => theme.colors.text};
    border-radius: ${({ theme }) => theme.spacing(0.5)};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
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
    margin-right: ${({ theme }) => theme.spacing(2)};

    &:hover {
        background-color: #e6a500;
    }
`;

interface ImportWalletProps {
    onClose: (mnemonic?: string, count?: number) => void;
}

const ImportWallet: React.FC<ImportWalletProps> = ({ onClose }) => {
    const [count, setCount] = useState<number>(5);
    const [mnemonic, setMnemonic] = useState("");

    const generateMnemonic = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/mnemonic");
            setMnemonic(response.data.mnemonic);
        } catch (error) {
            console.error("Error generating mnemonic:", error);
        }
    };

    const handleSubmit = () => {
        if (!mnemonic.trim()) {
            alert("Please enter or generate a mnemonic phrase.");
            return;
        }
        if (!count || count <= 0) {
            alert("Please enter a valid wallet count.");
            return;
        }
        onClose(mnemonic, count);
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseIcon onClick={() => onClose()}>&times;</CloseIcon>
                <h2>Import Wallet</h2>
                <FormGroup>
                    <Label>Wallet Count</Label>
                    <Input
                        type="number"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                        placeholder="Enter number of wallets to derive"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Mnemonic Phrase</Label>
                    <TextArea
                        rows={3}
                        value={mnemonic}
                        onChange={(e) => setMnemonic(e.target.value)}
                        placeholder="Enter or generate a mnemonic"
                    />
                </FormGroup>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={generateMnemonic}>Generate Mnemonic</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
            </ModalContent>
        </ModalOverlay>
    );
};

export default ImportWallet;