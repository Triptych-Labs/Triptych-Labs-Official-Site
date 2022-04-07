import React, { FC, ReactNode, useCallback, useMemo } from 'react';
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
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { useSnackbar } from 'notistack';
import * as anchor from '@project-serum/anchor';
import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import TopbarLayout from 'src/layouts/TopbarLayout';
import Entry from 'src/content/pages/Apps/DAO/components/Entry';

import { styled } from '@mui/material/styles';
import { useRecoilState } from 'recoil';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { Suspense, lazy } from 'react';
import { login } from 'src/content/pages/Apps/DAO/atoms/login';
const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
const Tasks = Loader(lazy(() => import('src/content/dashboards/Tasks')));
const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`,
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`,
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`,
);

const network = 'devnet';
const rpcHost =
  'https://sparkling-dark-shadow.solana-devnet.quiknode.pro/0e9964e4d70fe7f856e7d03bc7e41dc6a2b84452/';
const connection = new Connection(rpcHost);

function Mission() {
  const [entry, setEntry] = useRecoilState(login);
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
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

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            {!entry && (
              <>
                <div>
                  <TopbarLayout />
                </div>
                <Helmet>
                  <title>Status - 404</title>
                </Helmet>
                <MainContent>
                  <Container maxWidth="md">
                    <Container maxWidth="sm">
                      <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
                        <Box textAlign="center">
                          <WalletMultiButton />
                          <Entry />
                        </Box>
                        <Divider sx={{ my: 4 }}>OR</Divider>
                        <Button href="/overview" variant="outlined">
                          Go to homepage
                        </Button>
                      </Card>
                    </Container>
                  </Container>
                </MainContent>
              </>
            )}
            {entry && <Tasks />}
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default Mission;
