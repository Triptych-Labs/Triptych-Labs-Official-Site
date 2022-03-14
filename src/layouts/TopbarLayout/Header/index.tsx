import { useContext } from 'react';

import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import HeaderMenu from './Menu';
import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';
import Logo from 'src/components/Logo';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: space-between;
        width: 100%;
`,
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        <a
          href="https://bank.gov.ua/en/news/all/natsionalniy-bank-vidkriv-spetsrahunok-dlya-zboru-koshtiv-na-potrebi-armiyi"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '80px',
            height: '80px',
            background:
              "url('http://stfalcon.github.io/stopwar/img/stop-war-in-ukraine.png')",
            zIndex: 2013,
            border: 0,
        
          }}
          title="Do something to stop this war! Russians are killing our children and civilians!"
          target="_blank"
        />
        <HeaderMenu />
      </Box>
      <Box display="flex" alignItems="center">
        <HeaderButtons />
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
