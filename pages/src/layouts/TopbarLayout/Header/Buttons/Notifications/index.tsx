import {
  alpha,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';
import Icon from '@mui/material/Icon';

import { NavLink } from 'react-router-dom';
import { useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';

import { formatDistance, subDays } from 'date-fns';
import { Suspense, lazy } from 'react';
import SuspenseLoader from 'src/components/SuspenseLoader';

import TwitterIcon from '@mui/icons-material/Twitter';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
const OfficialLink = Loader(
  lazy(() => import('src/content/pages/Components/OfficialLink')),
);

const TwitterBadge = styled(TwitterIcon)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`,
);
const DiscordBadge = styled(Avatar)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`,
);
const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`,
);

/*
            <Tooltip arrow title="Discord">
              <IconButton color="primary" ref={ref} onClick={openDiscord}>
                <DiscordBadge
                  src={
                    'https://discord.com/assets/9f6f9cd156ce35e2d94c0e62e3eff462.png'
                  }
                />
              </IconButton>
            </Tooltip>
 * */

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const openTwitter = () => {
    setOpen(true);
    return <NavLink to="/twitter/official" />;
  };
  const openDiscord = () => {
    setOpen(true);

    return <NavLink to="/discord/official" />;
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Box>
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/twitters/official"
          >
            <Tooltip arrow title="Twitter">
              <IconButton color="primary" ref={ref} onClick={openTwitter}>
                <TwitterBadge />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/discord/official"
          ></ListItem>
        </List>
      </Box>
    </>
  );
}

export default HeaderNotifications;
