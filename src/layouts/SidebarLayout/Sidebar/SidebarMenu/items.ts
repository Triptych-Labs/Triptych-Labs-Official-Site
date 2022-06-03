import { ReactNode } from 'react';

import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import RocketIcon from '@mui/icons-material/Rocket';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import StartIcon from '@mui/icons-material/Start';

export interface MenuItem {
  href?: string;
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'Mints',
    items: [
      {
        name: 'Artifacts',
        icon: RocketIcon,
        link: '/mint/artifacts',
      },
    ],
  },
  {
    heading: 'Discord',
    items: [
      {
        name: 'Verify',
        icon: VerifiedUserTwoToneIcon,
        link: '/discord/verify',
      },
    ],
  },
  {
    heading: 'GitHubs',
    items: [
      {
        name: 'Triptych Labs Github',
        icon: GitHubIcon,
        href: 'https://github.com/Triptych-Labs',
      },
      {
        name: "Dom's Github (whymidnight)",
        icon: GitHubIcon,
        href: 'https://github.com/whymidnight',
      },
      {
        name: "Peyton's Github (_carrot_)",
        icon: GitHubIcon,
        href: 'https://github.com/yungcrypt',
      },
    ],
  },
  {
    heading: 'Twitters',
    items: [
      {
        name: 'Triptych Labs Twitter',
        icon: TwitterIcon,
        href: 'https://twitter.com/triptychlabs_io',
      },
      {
        name: "Dom's Twitter",
        icon: TwitterIcon,
        href: 'https://twitter.com/_whymidnight',
      },
      {
        name: "Peyton's Twitter",
        icon: TwitterIcon,
        href: 'https://twitter.com/yung_crypt',
      },
      {
        name: "Evan's Twitter",
        icon: TwitterIcon,
        href: 'https://twitter.com/UrUncomfortable',
      },
    ],
  },
];

export default menuItems;
