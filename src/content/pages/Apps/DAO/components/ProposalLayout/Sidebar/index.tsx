import { useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { SidebarContext } from 'src/contexts/SidebarContext';
import Logo from 'src/components/Logo';

import { Box, Drawer, Hidden } from '@mui/material';

import { styled } from '@mui/material/styles';
import SidebarMenu from './SidebarMenu';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        color: ${theme.sidebar.textColor};
        background: rgba(17, 22, 51, 0.9);
        box-shadow: ${theme.sidebar.boxShadow};
        height: 100%;

        @media (min-width: ${theme.breakpoints.values.lg}px) {
          border-top-right-radius: ${theme.general.borderRadius};
          border-bottom-right-radius: ${theme.general.borderRadius};
        }
`,
);

const TopSection = styled(Box)(
  ({ theme }) => `
        display: flex;
        height: 88px;
        align-items: center;
        margin: 0 ${theme.spacing(2)} ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`,
);

function Sidebar() {
  return <SidebarMenu />;
}

export default Sidebar;
