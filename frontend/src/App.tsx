import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import Sidebar from "./components/Sidebar";
import ListWallets from "./pages/ListWallets";
import Transactions from "./pages/Transactions";
import styled from "styled-components";
import { WalletsProvider } from "./contexts/WalletsContext";
import { SyncProvider } from "./contexts/SyncContext";
import SyncStatus from "./components/SyncStatus";

const Content = styled.div`
    margin-left: 250px; 
    padding: ${({ theme }) => theme.spacing(4)};
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
`;

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <SyncProvider>
                <WalletsProvider>
                    <Router>
                        <Sidebar />
                        <SyncStatus />
                        <Content>
                            <Routes>
                                <Route path="/" element={<Navigate to="/wallets" replace />} />
                                <Route path="/wallets" element={<ListWallets />} />
                                <Route path="/transactions" element={<Transactions />} />
                            </Routes>
                        </Content>
                    </Router>
                </WalletsProvider>
            </SyncProvider>
        </ThemeProvider>
    );
};

export default App;
