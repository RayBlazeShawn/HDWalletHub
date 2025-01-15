import React, { useContext } from "react";
import styled from "styled-components";
import { SyncContext } from "../contexts/SyncContext";

const SyncButton = styled.button`
    position: fixed;
    top: 0;
    right: 0;
    margin: ${({ theme }) => theme.spacing(2)};
    padding: ${({ theme }) => theme.spacing(1)};
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
        text-decoration: underline;
    }
`;

const SyncStatus: React.FC = () => {
    const { syncStatus, sync } = useContext(SyncContext);

    return <SyncButton onClick={sync}>{syncStatus}</SyncButton>;
};

export default SyncStatus;
