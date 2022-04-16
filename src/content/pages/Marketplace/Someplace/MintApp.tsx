import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import {
  WalletDialogProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-material-ui';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useSnackbar } from 'notistack';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { Theme } from './Theme';
import { Features } from './Features';
import Home from './mint/Home';
import * as anc from '@project-serum/anchor';
import { useTheme, Box } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import SidebarLayout from 'src/layouts/SidebarLayout';
import {
  BuyCandiesContainer,
  SellableCandiesContainer,
  ListableCandiesContainer,
} from './features/candyviewer';

declare function fetch_candies(): Promise<any>;

export const MintApp: FC = () => {
  const theme = useTheme();
  return (
    <Theme>
      <Context>
        <div className={'App-header'} style={{}}>
          <Content />
        </div>
      </Context>
    </Theme>
  );
};
const Context: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network],
  );

  const { enqueueSnackbar } = useSnackbar();
  const onError = useCallback(
    (error: WalletError) => {
      enqueueSnackbar(
        error.message ? `${error.name}: ${error.message}` : error.name,
        { variant: 'error' },
      );
      console.error(error);
    },
    [enqueueSnackbar],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <WalletDialogProvider>{children}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  const getCandyMachineId = (): anc.web3.PublicKey | undefined => {
    try {
      const candyMachineId = new anc.web3.PublicKey(
        'AKQJEFQ6SeTWNMRPhg716rLTWQ33ECGPdhLGwzqsZKN3',
      );

      return candyMachineId;
    } catch (e) {
      console.log('Failed to construct CandyMachineId', e);
      return undefined;
    }
  };
  const candyMachineId = getCandyMachineId();
  const network = 'mainnet-beta';
  const rpcHost = 'https://api.mainnet-beta.solana.com/';
  const connection = new anc.web3.Connection(
    rpcHost ? rpcHost : anc.web3.clusterApiUrl('mainnet-beta'),
  );

  const onClick = async () => {
    console.log('hello');
    const data = await fetch_candies();
    console.log('am high', JSON.parse(data));
  };

  const startDateSeed = parseInt('10');
  const txTimeoutInMilliseconds = 30000;
  const [menuOpen, setMenuOpen] = useState(false);
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  return (
    <>
      {menuOpen && <SidebarLayout />}
      <div
        style={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '100px',
        }}
      >
        <Menu
          style={{
            position: 'absolute',
            float: 'right',
            left: '10vw',
            margin: '0px',
            fontSize: '50',
          }}
          onClick={() => {
            if (menuOpen === false) {
              setMenuOpen(true);
            }
            if (menuOpen === true) {
              setMenuOpen(false);
            }
          }}
        />
        <img
          src={'/static/images/labs.png'}
          style={{ width: '40vw', maxWidth: '400px' }}
        />
        <div className={'feature-spot'}>
          {
            //@ts-ignore
            <Features className={'features'} />
          }
        </div>
        <WalletMultiButton />
        <div
          style={{
            width: 'max-content',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <BuyCandiesContainer />
          </Box>
        </div>
        <div>
          <Box>
            <SellableCandiesContainer />
          </Box>
        </div>
        <div>
          <Box>
            <ListableCandiesContainer />
          </Box>
        </div>
      </div>
    </>
  );
};
