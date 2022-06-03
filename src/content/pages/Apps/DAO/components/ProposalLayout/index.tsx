import { proposals } from 'src/content/pages/Apps/DAO/atoms/proposals';
import { useRecoilState } from 'recoil';
import { FC, ReactNode, useState, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        flex-direction: 'column';
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            padding-left: ${theme.sidebar.width};
            border-top-right-radius: ${theme.general.borderRadius};
            border-bottom-right-radius: ${theme.general.borderRadius};
        }
`,
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
        border-top-right-radius: ${theme.general.borderRadius};
        border-bottom-right-radius: ${theme.general.borderRadius};
`,
);
const FragmentWrapper = styled(Box)(
  ({ theme }) => `
        background-color: ${theme.colors.secondary.lighter};
        border-top-right-radius: ${theme.general.borderRadius};
        border-bottom-right-radius: ${theme.general.borderRadius};
`,
);

const SidebarLayout: FC<SidebarLayoutProps> = ({}) => {
  const [proposalsState] = useRecoilState(proposals);
  return (
    proposalsState.length > 0 && (
      <FragmentWrapper>
        <Sidebar />
        <MainWrapper>
          <MainContent>
            <Outlet />
          </MainContent>
        </MainWrapper>
      </FragmentWrapper>
    )
  );
};

export default SidebarLayout;
