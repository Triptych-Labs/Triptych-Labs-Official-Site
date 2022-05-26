import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SuspenseLoader from './components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('./content/overview')));

// Dashboards

const Tasks = Loader(lazy(() => import('./content/dashboards/Tasks')));

// Applications

const Messenger = Loader(
  lazy(() => import('./content/applications/Messenger')),
);
const Transactions = Loader(
  lazy(() => import('./content/applications/Transactions')),
);
const UserProfile = Loader(
  lazy(() => import('./content/applications/Users/profile')),
);
const UserSettings = Loader(
  lazy(() => import('./content/applications/Users/settings')),
);

// Components

const Buttons = Loader(
  lazy(() => import('./content/pages/Components/Buttons')),
);
const Modals = Loader(
  lazy(() => import('./content/pages/Components/Modals')),
);
const Accordions = Loader(
  lazy(() => import('./content/pages/Components/Accordions')),
);
const Tabs = Loader(lazy(() => import('./content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('./content/pages/Components/Badges')),
);
const Tooltips = Loader(
  lazy(() => import('./content/pages/Components/Tooltips')),
);
const Avatars = Loader(
  lazy(() => import('./content/pages/Components/Avatars')),
);
const Cards = Loader(lazy(() => import('./content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('./content/pages/Components/Forms')));
const OfficialLink = Loader(
  lazy(() => import('./content/pages/Components/OfficialLink')),
);

// Status

const Status404 = Loader(
  lazy(() => import('./content/pages/Status/Status404')),
);
const Status500 = Loader(
  lazy(() => import('./content/pages/Status/Status500')),
);
const StatusComingSoon = Loader(
  lazy(() => import('./content/pages/Status/ComingSoon')),
);
const StatusMaintenance = Loader(
  lazy(() => import('./content/pages/Status/Maintenance')),
);

const Artifacts = Loader(
  lazy(() => import('./content/pages/Mint/Artifacts')),
);
const Questing = Loader(
  lazy(() => import('./content/pages/Questing')),
);
const Someplace = Loader(
  lazy(() => import('./content/pages/Marketplace/Someplace')),
);
const P2P = Loader(
  lazy(() => import('./content/pages/Marketplace/P2P')),
);
const Mission = Loader(lazy(() => import('./content/pages/Mission')));
const Crew = Loader(lazy(() => import('./content/pages/Crew')));
const Dao = Loader(lazy(() => import('./content/pages/DAO')));

// @ts-ignore
const routes = [
  {
    path: '/',
    children: [
      {
        path: '/overview',
        element: <Overview />,
      },
      {
        path: '/mission',
        // element: <TopbarLayout />,
        children: [
          {
            path: '/mission/crew',
            element: <Crew />,
          },
        ],
      },
      {
        path: 'dao',
        children: [
          {
            path: '/dao/enter',
            element: <Dao />,
          },
          {
            path: '/dao/dashboard',
            element: <Tasks />,
          },
        ],
      },
      {
        path: 'questing',
        // element: <TopbarLayout />,
        children: [
          {
            path: '/questing/artifacts',
            element: <Questing />,
          },
        ],
      },
      {
        path: 'mint',
        // element: <TopbarLayout />,
        children: [
          {
            path: '/mint/artifacts',
            element: <Artifacts />,
          },
        ],
      },
      {
        path: 'marketplace',
        // element: <TopbarLayout />,
        children: [
          {
            path: '/marketplace/someplace',
            element: <Someplace />,
          },
          {
            path: '/marketplace/p2p',
            element: <P2P />,
          },
        ],
      },
      {
        path: 'status',
        children: [
          {
            path: '/status/404',
            element: <Status404 />,
          },
          {
            path: '/status/500',
            element: <Status500 />,
          },
          {
            path: '/status/maintenance',
            element: <StatusMaintenance />,
          },
          {
            path: '/status/coming-soon',
            element: <StatusComingSoon />,
          },
        ],
      },
    ],
  },
  {
    path: 'twitters',
    children: [
      {
        path: '/twitters/official',
        element: <OfficialLink href={'https://twitter.com/triptychlabs_io'} />,
      },
      {
        path: '/twitters/humblehamster',
        element: <OfficialLink href={'https://twitter.com/uruncomfortable'} />,
      },
      {
        path: '/twitters/peytonleginge',
        element: <OfficialLink href={'https://twitter.com/peytonleginge'} />,
      },
      {
        path: '/twitters/whymidnight',
        element: <OfficialLink href={'https://twitter.com/_whymidnight'} />,
      },
    ],
  },
  {
    path: 'github',
    children: [
      {
        path: '/github/steakhouse',
        element: (
          <OfficialLink href={'https://github.com/whymidnight/steakhouse'} />
        ),
      },
      {
        path: '/github/nftloyalty',
        element: (
          <OfficialLink
            href={'https://github.com/Triptych-Labs/Solana-NFT-Loyalty-Rewards'}
          />
        ),
      },
      {
        path: '/github/cardpacks',
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
        path: '/discord/verify',
        element: <OfficialLink href={'https://verify.triptychlabs.io'} />,
      },
      {
        path: '/discord/official',
        element: <OfficialLink href={'https://discord.gg/egyp7Fsp'} />,
      },
    ],
  },
  {
    path: 'spaces',
    children: [
      {
        path: '/spaces/mint',
        element: (
          <OfficialLink href={'https://twitter.com/i/spaces/1MnGnkrrdlYJO'} />
        ),
      },
    ],
  },
];

export default routes;
