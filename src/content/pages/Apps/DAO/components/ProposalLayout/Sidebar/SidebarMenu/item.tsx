import { FC, ReactNode, useState, useContext } from 'react';
import { useRecoilState } from 'recoil';
import { session } from 'src/content/pages/Apps/DAO/atoms/session';
import {
  proposals,
  selectedProposal,
} from 'src/content/pages/Apps/DAO/atoms/proposals';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { SidebarContext } from 'src/contexts/SidebarContext';

import PropTypes from 'prop-types';
import { Button, Badge, Collapse, ListItem } from '@mui/material';

import ExpandLessTwoToneIcon from '@mui/icons-material/ExpandLessTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';

interface SidebarMenuItemProps {
  children?: ReactNode;
  icon?: any;
  ballot?: string;
  href?: string;
  badge?: string;
  open?: boolean;
  active?: boolean;
  name: string;
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  children,
  href,
  ballot,
  icon: Icon,
  badge,
  open: openParent,
  active,
  name,
  ...rest
}) => {
  const [menuToggle, setMenuToggle] = useState<boolean>(openParent);
  const [, setSelectedProposalsState] = useRecoilState(selectedProposal);
  const [proposalsState, setProposals] = useRecoilState(proposals);

  const toggleSidebar = () => {
    let index = proposalsState.findIndex(
      (proposal) => proposal.proposalAddress === ballot,
    );
    console.log(proposalsState);
    console.log(ballot, index);
    setSelectedProposalsState(index);
  };

  const toggleMenu = (): void => {
    setMenuToggle((Open) => !Open);
  };

  if (children) {
    return (
      <ListItem component="div" className="Mui-children" key={name} {...rest}>
        <Button
          className={clsx({ 'Mui-active': menuToggle })}
          startIcon={Icon && <Icon />}
          endIcon={
            menuToggle ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />
          }
          onClick={toggleMenu}
        >
          {name}
        </Button>
        <Collapse in={menuToggle}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem component="div" key={name} {...rest}>
      <Button onClick={toggleSidebar}>
        {name}
        {badge && <Badge badgeContent={badge} />}
      </Button>
    </ListItem>
  );
};

SidebarMenuItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  ballot: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  badge: PropTypes.string,
  open: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

SidebarMenuItem.defaultProps = {
  open: false,
  active: false,
};

export default SidebarMenuItem;
