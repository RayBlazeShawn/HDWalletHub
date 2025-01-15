import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
    width: 250px;
    background: ${({ theme }) => theme.colors.card};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing(4)};
    height: 100vh;
    position: fixed;
`;

const NavItems = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;

    &.active {
        color: ${({ theme }) => theme.colors.primary};
    }

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const SupportLink = styled(StyledNavLink)`
    margin-top: auto;
`;

const Sidebar: React.FC = () => {
    return (
        <SidebarContainer>
            <NavItems>
                <StyledNavLink to="/wallets">Wallets</StyledNavLink>
                <StyledNavLink to="/transactions">Last Transactions</StyledNavLink>
            </NavItems>
            <SupportLink to="/support">Support</SupportLink>
        </SidebarContainer>
    );
};

export default Sidebar;
