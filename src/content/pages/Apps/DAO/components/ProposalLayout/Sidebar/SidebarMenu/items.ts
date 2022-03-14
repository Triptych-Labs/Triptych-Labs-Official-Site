import { ReactNode } from 'react';

import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import RocketIcon from '@mui/icons-material/Rocket';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import StartIcon from '@mui/icons-material/Start';

export interface MenuItem {
  href?: string;
  ballot?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [];

export default menuItems;
