import { Metaplex } from '@metaplex-foundation/js-next';
import base64 from 'base64-js';
// @ts-ignore
import { base58_to_binary } from 'base58-js';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { AnimatorGeneralProvider, Animator } from '@arwes/animation';
import { FrameCorners, FrameHexagon, Text, CodeBlock } from '@arwes/core';
import Typical from 'react-typical';
import Typist from 'react-typist';

import DateTimePicker from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import React, {
  Suspense,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import {
  Box,
  Stack,
  CircularProgress,
  List,
  Grid,
  Divider,
  Paper,
  Container,
  useTheme,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
// import './index.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WheelPicker from 'react-simple-wheel-picker';
import { atom, useRecoilState } from 'recoil';
import axios from 'axios';
import {
  PublicKey,
  TransactionInstructionCtorFields,
  Transaction,
  TransactionInstruction,
  AccountMeta,
  Message,
  MessageArgs,
  SystemProgram,
  Keypair,
} from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Snackbar } from '@mui/material/';
import Alert from '@mui/material/Alert';
// import { Box,  } from '@mui/material';
import { Connection, clusterApiUrl } from '@solana/web3.js';

const ORACLE = new PublicKey('6LopwEBZKvrndrjMiMzSF4uuVwmSvSjqCCPx32rnPnK2');
declare function get_quests(Toracle: String): Promise<any>;

const candyCache = atom({
  key: 'CandyCache',
  default: {},
});
const buyableCandyViewing = atom({
  key: 'BuyableCandyViewing',
  default: '0',
});
const buyableBatchViewing = atom({
  key: 'BuyableBatchViewing',
  default: '0',
});

const listableCandyViewing = atom({
  key: 'ListableCandyViewing',
  default: '0',
});
const listableBatchViewing = atom({
  key: 'ListableBatchViewing',
  default: '0',
});

const sellableCandyViewing = atom({
  key: 'SellableCandyViewing',
  default: '0',
});
interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
}

const AsyncImage = (props) => {
  const [loadedSrc, setLoadedSrc] = React.useState(null);
  React.useEffect(() => {
    setLoadedSrc(null);
    if (props.src) {
      const handleLoad = () => {
        setLoadedSrc(props.src);
      };
      const image = new Image();
      image.addEventListener('load', handleLoad);
      image.src = props.src;
      return () => {
        image.removeEventListener('load', handleLoad);
      };
    }
  }, [props.src]);
  if (loadedSrc === props.src) {
    return <img {...props} />;
  }
  return (
    <div>
      <CircularProgress color="secondary" />
    </div>
  );
};
const RoadPaper = styled(FrameCorners)(
  ({ theme }) => `
  display:flex;
  justify-content:center;
  align-items:center;
  margin:10px;
  background: rgba(71, 71, 71, 0.25)
`,
);

export const HashMap = () => {
  const wallet = useWallet();
  const [hashMapData, setHashMapData] = useState({});
  const [batch, setBatch] = useState('');
  const [candyId, setCandyId] = useState('');

  const animatorGeneral = { duration: { enter: 300, exit: 300 } };

  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  useEffect(() => {
    async function fetchCandies() {
      if (!wallet.publicKey) {
        return;
      }
      const connection = new Connection(
        'https://sparkling-dark-shadow.solana-devnet.quiknode.pro/0e9964e4d70fe7f856e7d03bc7e41dc6a2b84452/',
      );
      console.log(connection);
      // const hashMap = JSON.parse(String.fromCharCode(...hashMapBytes));

      const metaplex = Metaplex.make(connection);
      const myNfts = await metaplex
        .nfts()
        .findAllByOwner(new PublicKey(wallet.publicKey.toBase58()));
      console.log(myNfts);
      setHashMapData(myNfts);
    }
    fetchCandies();
  }, [wallet]);

  return (
    <>
      {Object.keys(hashMapData).length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid alignItems="center" container>
            <Grid xs={5}>
              <Box textAlign="center">
                <FrameCorners>hello</FrameCorners>
              </Box>
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={5}>
              <Box textAlign="center">
                <FrameCorners>hello</FrameCorners>
              </Box>
            </Grid>
            <Grid xs={12} sx={{ height: '40vh', width: '85vw' }}>
              <Box textAlign="center">
                <FrameCorners>
                  <RoadPaper sx={{ height: '40vh', width: '85vw' }}>
                    <Box sx={{ whiteSpace: 'preWrap' }} textAlign="left">
                      <Typist>{JSON.stringify(hashMapData, null, 2)}</Typist>
                    </Box>
                  </RoadPaper>
                </FrameCorners>
              </Box>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};
export const NFTGalleryItem = (metadata) => {
  metadata = metadata.metadata;
  const metadataUri = metadata.uri;
  const metadataName = metadata.name;

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {metadataName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export const NFTGallery = () => {
  const wallet = useWallet();
  const [hashMapData, setHashMapData] = useState([]);
  const [batch, setBatch] = useState('');
  const [candyId, setCandyId] = useState('');

  const animatorGeneral = { duration: { enter: 300, exit: 300 } };

  const [activate, setActivate] = React.useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  useEffect(() => {
    async function fetchCandies() {
      if (!wallet.publicKey) {
        return;
      }
      const metaplex = Metaplex.make(
        new Connection(
          'https://sparkling-dark-shadow.solana-devnet.quiknode.pro/0e9964e4d70fe7f856e7d03bc7e41dc6a2b84452/',
        ),
      );
      const myNfts = await metaplex
        .nfts()
        .findAllByOwner(new PublicKey(wallet.publicKey.toBase58()));
      console.log(myNfts);
      setHashMapData(myNfts);
    }
    fetchCandies();
  }, [wallet]);

  return (
    <>
      {Object.keys(hashMapData).length > 0 && (
        <div
          style={{
            margin: '5%',
            height: '50vh',
            // width: '50vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
            overflowY: 'scroll', // added scroll
          }}
        >
          <Grid alignItems="center" container>
            {hashMapData.map((metadata) => (
              <Grid xs={4}>
                <Box textAlign="center">
                  <FrameCorners>
                    <RoadPaper>
                      <NFTGalleryItem metadata={metadata} />
                    </RoadPaper>
                  </FrameCorners>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export const QuestsGallery = () => {
  // fetch quests
  // fetch questees
  // plumb quest with questees
  // determine quest eligiblity via questees

  const wallet = useWallet();
  const [quests, setQuests] = useState([]);

  const [activate, setActivate] = React.useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  useEffect(() => {
    async function fetchQuests() {
      if (!wallet.publicKey) {
        return;
      }

      const questsJson = await get_quests(ORACLE.toString());
      const quests = JSON.parse(String.fromCharCode(...questsJson));

      const walletNFTs = await Metaplex.make(
        new Connection(
          'https://sparkling-dark-shadow.solana-devnet.quiknode.pro/0e9964e4d70fe7f856e7d03bc7e41dc6a2b84452/',
        ),
      )
        .nfts()
        .findAllByOwner(new PublicKey(wallet.publicKey.toBase58()));

      console.log(walletNFTs);
      setQuests(quests);
    }
    fetchQuests();
  }, [wallet]);

  return (
    <>
      {quests.length > 0 && (
        <div
          style={{
            margin: '5%',
            height: '50vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
            overflowY: 'scroll',
          }}
        >
          <Grid alignItems="center" container>
            {quests.map((quest) => (
              <Grid xs={4}>
                <Box textAlign="center">
                  <FrameCorners>
                    <RoadPaper>
                      <QuestGalleryItem quest={quest} />
                    </RoadPaper>
                  </FrameCorners>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};
export const QuestGalleryItem = ({ quest }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {quest.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
