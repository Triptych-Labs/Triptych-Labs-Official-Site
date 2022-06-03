import { AnimatorGeneralProvider, Animator } from '@arwes/animation';
import { FrameCorners, Button, FrameHexagon, Text } from '@arwes/core';
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
import { Grid, styled } from '@mui/material';
import React, {
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { Theme } from './Theme';
import { Features } from './Features';
import Home from './mint/Home';
import * as anc from '@project-serum/anchor';
import { useTheme, Box } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import { QuestsGallery, Rewards } from './questing/candyviewer';

declare function fetch_candies(): Promise<any>;

const StyledButton = styled(Button)`
  width: 150px;
`;

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

  // You can also provide a custom RPC endpoint.
  const endpoint = 'https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/';

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [],
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

  const generalAnimator = { duration: { enter: 200, exit: 200 } };
  const [toggle, setToggle] = useState('start');
  const [mouse, setMouse] = useState(false);
  const [activate, setActivate] = useState(true);
  useEffect(() => {
    console.log(activate);
    if (!activate) {
      const reappear = setTimeout(() => {
        setActivate(true);
      }, 625);

      return () => clearTimeout(reappear);
    }
  }, [activate, mouse]);

  const enableAnim = useCallback(
    (event) => {
      console.log(activate);
      if (!mouse) {
        setMouse(true);
        const reappear = setTimeout(() => {
          setActivate(false);
        }, 750);

        return () => clearTimeout(reappear);
      }
    },
    [activate, mouse],
  );
  const disableAnim = useCallback(
    (event) => {
      console.log(activate);
      setMouse(false);
    },
    [activate],
  );

  let body;
  switch (toggle) {
    case 'start':
      body = (
        <Box>
          <QuestsGallery />
        </Box>
      );
      break;
    case 'claim':
      body = (
        <Box>
          <Rewards />
        </Box>
      );
      break;
  }

  const toggleView = useCallback(
    (event) => {
      setToggle('start');
    },
    [setToggle],
  );
  const toggleBuy = useCallback(
    (event) => {
      setToggle('claim');
    },
    [setToggle],
  );

  return (
    <>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={'/static/images/labs.png'}
          style={{ width: '40vw', maxWidth: '400px' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid alignItems="center" container>
          <Grid item xs={4}>
            <Box textAlign="center">
              <AnimatorGeneralProvider animator={generalAnimator}>
                <Animator animator={{ activate, manager: 'stagger' }}>
                  <StyledButton FrameComponent={FrameHexagon}>
                    <div
                      onMouseEnter={enableAnim}
                      onMouseLeave={disableAnim}
                      onClick={toggleView}
                    >
                      <Text style={{ margin: '10px 20px 10px 20px' }}>
                        Start Quests
                      </Text>
                    </div>
                  </StyledButton>
                </Animator>
              </AnimatorGeneralProvider>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center">
              <AnimatorGeneralProvider animator={generalAnimator}>
                <Animator animator={{ activate, manager: 'stagger' }}>
                  <StyledButton FrameComponent={FrameHexagon}>
                    <div
                      onMouseEnter={enableAnim}
                      onMouseLeave={disableAnim}
                      onClick={toggleBuy}
                    >
                      <Text style={{ margin: '10px 20px 10px 20px' }}>
                        Claim Rewards
                      </Text>
                    </div>
                  </StyledButton>
                </Animator>
              </AnimatorGeneralProvider>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center">
              <StyledButton FrameComponent={FrameHexagon}>
                <div
                  className="arwes-frame arwes-text"
                  style={{ margin: '10px 20px 10px 20px' }}
                >
                  <div onMouseEnter={enableAnim} onMouseLeave={disableAnim}>
                    <WalletMultiButton style={{ all: 'unset' }} />
                  </div>
                </div>
              </StyledButton>
            </Box>
          </Grid>
        </Grid>
      </div>
      <div>{body}</div>
    </>
  );
};
