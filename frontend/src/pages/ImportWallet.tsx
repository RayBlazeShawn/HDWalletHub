import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background: ${({ theme }) => theme.colors.card};
    padding: ${({ theme }) => theme.spacing(4)};
    border-radius: ${({ theme }) => theme.spacing(1)};
    width: 400px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Title = styled.h2`
    margin: 0;
    font-size: 1.5rem;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.5rem;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const Input = styled.input`
    width: 100%;
    padding: ${({ theme }) => theme.spacing(2)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    border: 1px solid #ccc;
    border-radius: ${({ theme }) => theme.spacing(0.5)};
    background: #2c2c2c;
`;

const Button = styled.button`
    width: 100%;
    padding: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border-radius: ${({ theme }) => theme.spacing(0.5)};
    font-weight: bold;

    &:hover {
        background-color: #e6a500;
    }
`;

const GenerateMnemonic = styled(Button)`
    margin-top: ${({ theme }) => theme.spacing(2)};
`;


const ImportWallet: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [mnemonic, setMnemonic] = useState("");
    const [walletName, setWalletName] = useState("");

    const handleGenerateMnemonic = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/mnemonic");
            setMnemonic(response.data.mnemonic);
        } catch (err) {
            console.error("Failed to generate mnemonic:", err);
        }
    };

    const handleSubmit = () => {
        console.log("Import Wallet Submitted", { walletName, mnemonic });
    };

    return (
        <Overlay>
            <ModalContainer>
                <Header>
                    <Title>Import Wallet</Title>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </Header>
                <Input
                    placeholder="Enter wallet name"
                    value={walletName}
                    onChange={(e) => setWalletName(e.target.value)}
                />
                <Input
                    placeholder="Enter your mnemonic"
                    value={mnemonic}
                    onChange={(e) => setMnemonic(e.target.value)}
                />
                <Button onClick={handleSubmit}>Submit</Button>
                <GenerateMnemonic onClick={handleGenerateMnemonic}>
                    Generate Mnemonic
                </GenerateMnemonic>
            </ModalContainer>
        </Overlay>
    );
};

export default ImportWallet;
