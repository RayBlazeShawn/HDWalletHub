import React, { useContext } from 'react';
import styled from 'styled-components';
import { SyncContext } from '../contexts/SyncContext';

const SyncButtonStyled = styled.button`
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

const SyncButton: React.FC = () => {
    const { syncStatus, sync } = useContext(SyncContext);

    return (
        <SyncButtonStyled onClick={sync}>
            {syncStatus}
        </SyncButtonStyled>
    );
};

export default SyncButton;
