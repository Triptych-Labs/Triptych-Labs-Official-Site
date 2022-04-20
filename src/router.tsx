import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import TopbarLayout from 'src/layouts/TopbarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Tasks = Loader(lazy(() => import('src/content/dashboards/Tasks')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger')),
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions')),
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile')),
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings')),
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons')),
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals')),
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions')),
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges')),
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips')),
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars')),
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));
const OfficialLink = Loader(
  lazy(() => import('src/content/pages/Components/OfficialLink')),
);

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404')),
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500')),
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon')),
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance')),
);

const Artifacts = Loader(
  lazy(() => import('src/content/pages/Mint/Artifacts')),
);
const Someplace = Loader(
  lazy(() => import('src/content/pages/Marketplace/Someplace')),
);
const P2P = Loader(
  lazy(() => import('src/content/pages/Marketplace/P2P')),
);
const Mission = Loader(lazy(() => import('src/content/pages/Mission')));
const Crew = Loader(lazy(() => import('src/content/pages/Crew')));
const Dao = Loader(lazy(() => import('src/content/pages/DAO')));

const routes: PartialRouteObject[] = [
  {
    path: '*',
    children: [
      {
        path: '/',
        element: <Overview />,
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'mission',
        // element: <TopbarLayout />,
        children: [
          {
            path: '/',
            element: <Mission />,
          },
          {
            path: '/crew',
            element: <Crew />,
          },
        ],
      },
      {
        path: 'dao',
        children: [
          {
            path: '/',
            element: <Mission />,
          },
          {
            path: '/enter',
            element: <Dao />,
          },
          {
            path: 'dashboard',
            element: <Tasks />,
          },
        ],
      },
      {
        path: 'mint',
        // element: <TopbarLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="/" replace />,
          },
          {
            path: '/artifacts',
            element: <Artifacts />,
          },
        ],
      },
      {
        path: 'marketplace',
        // element: <TopbarLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="/" replace />,
          },
          {
            path: '/someplace',
            element: <Someplace />,
          },
          {
            path: '/p2p',
            element: <P2P />,
          },
        ],
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />,
          },
          {
            path: '404',
            element: <Status404 />,
          },
          {
            path: '500',
            element: <Status500 />,
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />,
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: '*',
        element: <Status404 />,
      },
    ],
  },
  {
    path: 'twitters',
    children: [
      {
        path: '/official',
        element: <OfficialLink href={'https://twitter.com/triptychlabs_io'} />,
      },
      {
        path: '/humblehamster',
        element: <OfficialLink href={'https://twitter.com/uruncomfortable'} />,
      },
      {
        path: '/peytonleginge',
        element: <OfficialLink href={'https://twitter.com/peytonleginge'} />,
      },
      {
        path: '/whymidnight',
        element: <OfficialLink href={'https://twitter.com/_whymidnight'} />,
      },
    ],
  },
  {
    path: 'github',
    children: [
      {
        path: '/steakhouse',
        element: (
          <OfficialLink href={'https://github.com/whymidnight/steakhouse'} />
        ),
      },
      {
        path: '/nftloyalty',
        element: (
          <OfficialLink
            href={'https://github.com/Triptych-Labs/Solana-NFT-Loyalty-Rewards'}
          />
        ),
      },
      {
        path: '/cardpacks',
        element: (
          <OfficialLink
            href={'https://github.com/yungcrypt/CandyMachineCardPack'}
          />
        ),
      },
    ],
  },
  {
    path: 'discord',
    children: [
      {
        path: '/verify',
        element: <OfficialLink href={'https://verify.triptychlabs.io'} />,
      },
      {
        path: '/official',
        element: <OfficialLink href={'https://discord.gg/egyp7Fsp'} />,
      },
    ],
  },
  {
    path: 'spaces',
    children: [
      {
        path: '/mint',
        element: (
          <OfficialLink href={'https://twitter.com/i/spaces/1MnGnkrrdlYJO'} />
        ),
      },
    ],
  },
];

export default routes;
