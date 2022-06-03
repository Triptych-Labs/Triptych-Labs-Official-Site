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

const ORACLE = new PublicKey('sAomFigC3JXKq5ArzwbnRQeaYVk9P7Nkin694RrtfKw');
declare function fetch_candies(T: String): Promise<any>;
declare function getListings(
  Toracle: String,
  TbatchBatchReceipts: String,
): Promise<any>;
declare function reportCatalog(T: String): Promise<any>;
declare function reportHashMap(T: String): Promise<any>;
declare function sellables(Tholder: String, Toracle: String): Promise<any>;
declare function sellCommit(
  Tholder: String,
  Toracle: String,
  Tmint: String,
): Promise<any>;
declare function buy(
  Tholder: String,
  Tbatch: String,
  Tindex: String,
): Promise<any>;

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

export const Candy = ({
  id,
  candyData,
  candyId,
  onPrimaryAction,
  setAlertState,
}) => {
  const onClick = useCallback(() => {
    async function click() {
      try {
        switch (id) {
          case 'Buy': {
            await onPrimaryAction(candyData[Number(candyId)]);
            break;
          }
          case 'Sell':
            console.log();
            await onPrimaryAction(candyData[Number(candyId)]);
        }
        setAlertState({
          open: true,
          message: 'Successful sell!',
          severity: 'success',
        });
      } catch (e) {
        setAlertState({
          open: true,
          message: 'Sell failed! Please try again!',
          severity: 'error',
        });
      }
    }
    click();
  }, [candyId, onPrimaryAction, setAlertState, candyData]);
  const [candyCaches, setCandyCaches] = useRecoilState(candyCache);
  const [candyMeta, setCandyMeta] = useState({});
  useEffect(() => {
    async function fetchMetadata() {
      if (!candyCaches[String(id + candyId)]) {
        setCandyMeta({});
        const data = await axios.get(
          candyData[Number(candyId)].uri.replace('dweb', 'nftstorage'),
        );
        setCandyCaches((cache: any) => {
          let _cache = { ...cache };
          _cache[String(id + candyId)] = data.data;
          return _cache;
        });
        setCandyMeta(data.data);
      } else {
        setCandyMeta(candyCaches[String(id + candyId)]);
      }
    }
    fetchMetadata();
  }, [candyId, setCandyCaches]);

  let content = null;
  let actions = null;
  /*
   */
  switch (id) {
    case 'List':
      content = (
        <RoadPaper sx={{ paddingTop: '2%' }}>
          <FormControl fullWidth variant="outlined">
            <Grid container>
              <Grid item>
                <Typography variant="h5" align="center">
                  Price
                </Typography>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  sx={{ margin: '5%' }}
                  type="number"
                  label="Price"
                  endAdornment={
                    <InputAdornment sx={{ width: '35%' }} position="end">
                      ◎ SOL
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item>
                <Typography variant="h5" align="center">
                  Date Time
                </Typography>
                <OutlinedInput
                  sx={{ margin: '5%' }}
                  type="datetime-local"
                  label="Date Time"
                />
              </Grid>
            </Grid>
          </FormControl>
          <CardActions>
            <Button size="small" onClick={onClick}>
              {id}
            </Button>
          </CardActions>
        </RoadPaper>
      );
      break;
    default:
      content = (
        <Typography variant="h5" align="right" gutterBottom component="div">
          ◎ 1
        </Typography>
      );
      break;
  }
  switch (id) {
    case 'List':
      break;
    default:
      actions = (
        <CardActions>
          <Button size="small" onClick={onClick}>
            {id}
          </Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      );
      break;
  }
  const [loaded, setLoaded] = React.useState(false);

  function handleImageLoad() {
    console.log('asdfasdfasdf', 'LOADED');
    setLoaded(true);
  }

  return (
    <>
      {Object.keys(candyMeta).length > 0 && (
        <RoadPaper>
          <Card sx={{ all: 'revert' }}>
            <AsyncImage
              style={{ height: '300px' }}
              src={
                candyMeta.hasOwnProperty('image')
                  ? // @ts-ignore
                    candyMeta.image.replace('dweb', 'nftstorage')
                  : ''
              }
            />
            <div>
              <CardContent>
                <Typography
                  sx={{ textAlign: 'center' }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {candyData[Number(candyId)].name}
                </Typography>
                {content && content}
              </CardContent>
              {actions && actions}
            </div>
          </Card>
        </RoadPaper>
      )}
    </>
  );
};

export const Candies = ({
  id,
  candyData,
  candyId,
  setCandyId,
  onPrimaryAction,
}) => {
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: '',
    severity: undefined,
  });
  const onChange = useCallback(({ id }) => {
    setCandyId(id);
  }, []);
  const data = candyData.map(({ name }, index) => ({
    id: String(index),
    value: name,
  }));
  return (
    <Grid container sx={{ height: '500px' }}>
      <Grid item xs={2}>
        <RoadPaper sx={{ width: 'webkit-fill-available', height: '500px' }}>
          <Stack>
            <AccordionSummary
              sx={{
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h3">{id} Artifacts</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <WheelPicker
                data={data}
                onChange={onChange}
                itemHeight={60}
                activeColor="#aaa"
                color="#333"
                backgroundColor={'transparent'}
                shadowColor={'transparent'}
                height={400}
                fontSize={18}
                selectedID={candyId}
              />
            </AccordionDetails>
          </Stack>
        </RoadPaper>
      </Grid>

      <Grid xs={10}>
        <Box>
          <RoadPaper sx={{ height: '500px' }}>
            <Candy
              id={id}
              candyData={candyData}
              candyId={candyId}
              onPrimaryAction={onPrimaryAction}
              setAlertState={setAlertState}
            />
          </RoadPaper>
        </Box>
      </Grid>
    </Grid>
  );
};
export const CandiesGalleryListings = ({
  id,
  candyData,
  candyId,
  setCandyId,
  onPrimaryAction,
  batches,
  batch,
  setBatch,
}) => {
  let data = [];
  let batchData = [];
  let filteredCandyData = [];
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: '',
    severity: undefined,
  });
  const onChange = useCallback(({ id }) => {
    setCandyId(id);
  }, []);
  const onBatchChange = useCallback(
    ({ id }) => {
      if (Number(batch) !== Number(id)) setCandyId('0');
      setBatch(id);
    },
    [batch],
  );

  const [batchReceipt, setBatchReceipt] = useState([]);
  switch (id) {
    case 'Buy':
      batchData = batches.map(({ BatchReceiptData: { Name } }, index) => ({
        id: String(index),
        value: Name,
      }));
      filteredCandyData = candyData.filter(
        ({ BatchReceipt }) =>
          batches[Number(batch)].BatchReceipt === BatchReceipt,
      );
      if (filteredCandyData.length > 0)
        data = filteredCandyData.map(({ name }, index) => ({
          id: String(index),
          value: name,
        }));
      break;
    case 'List':
      batchData = batches.map(({ BatchReceipt }, index) => ({
        id: String(index),
        value: BatchReceipt,
      }));
      filteredCandyData = candyData.filter(
        ({ BatchReceipt }) =>
          batches[Number(batch)].BatchReceipt === BatchReceipt,
      );
      if (filteredCandyData.length > 0)
        data = filteredCandyData.map(({ name }, index) => ({
          id: String(index),
          value: name,
        }));
      break;
  }

  return (
    <RoadPaper>
      <Stack>
        <Grid container>
          <RoadPaper sx={{ width: 'webkit-fill-available' }}>
            <Stack>
              <AccordionSummary
                sx={{
                  display: 'flex',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h3">{id} Artifacts</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <WheelPicker
                  data={batchData}
                  onChange={onBatchChange}
                  itemHeight={60}
                  activeColor="#aaa"
                  color="#333"
                  backgroundColor={'transparent'}
                  shadowColor={'transparent'}
                  height={200}
                  fontSize={18}
                  selectedID={batch}
                />
              </AccordionDetails>
            </Stack>
          </RoadPaper>
          <RoadPaper>
            {filteredCandyData.length > 0 && (
              <Stack>
                <AccordionSummary
                  sx={{
                    display: 'flex',
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h3">Select</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <WheelPicker
                    data={data}
                    onChange={onChange}
                    itemHeight={60}
                    activeColor="#aaa"
                    color="#333"
                    backgroundColor={'transparent'}
                    shadowColor={'transparent'}
                    height={200}
                    fontSize={18}
                    selectedID={candyId}
                  />
                </AccordionDetails>
              </Stack>
            )}
          </RoadPaper>
        </Grid>
        {filteredCandyData.length > 0 && (
          <Grid item sx={{ width: 'minContent' }}>
            <Box>
              <RoadPaper>
                <Candy
                  id={id}
                  candyData={filteredCandyData}
                  candyId={candyId}
                  onPrimaryAction={onPrimaryAction}
                  setAlertState={setAlertState}
                />
              </RoadPaper>
            </Box>
          </Grid>
        )}
      </Stack>

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </RoadPaper>
  );
};
export const CandiesGallery = ({
  id,
  candyData,
  candyId,
  setCandyId,
  onPrimaryAction,
  batches,
  batch,
  setBatch,
}) => {
  let data = [];
  let batchData = [];
  let filteredCandyData = [];
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: '',
    severity: undefined,
  });
  const onChange = useCallback(({ id }) => {
    setCandyId(id);
  }, []);
  const onBatchChange = useCallback(
    ({ id }) => {
      if (Number(batch) !== Number(id)) setCandyId('0');
      setBatch(id);
    },
    [batch],
  );

  const [batchReceipt, setBatchReceipt] = useState([]);
  switch (id) {
    case 'Buy':
      batchData = batches.map(({ BatchReceiptData: { Name } }, index) => ({
        id: String(index),
        value: Name,
      }));
      filteredCandyData = candyData.filter(
        ({ BatchReceipt }) =>
          batches[Number(batch)].BatchReceipt === BatchReceipt,
      );
      if (filteredCandyData.length > 0)
        data = filteredCandyData.map(({ name }, index) => ({
          id: String(index),
          value: name,
        }));
      break;
    case 'List':
      batchData = batches.map(({ BatchReceipt }, index) => ({
        id: String(index),
        value: BatchReceipt,
      }));
      filteredCandyData = candyData.filter(
        ({ BatchReceipt }) =>
          batches[Number(batch)].BatchReceipt === BatchReceipt,
      );
      if (filteredCandyData.length > 0)
        data = filteredCandyData.map(({ name }, index) => ({
          id: String(index),
          value: name,
        }));
      break;
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        <RoadPaper sx={{ width: 'webkit-fill-available' }}>
          <Stack>
            <AccordionSummary
              sx={{
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h3">{id} Artifacts</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <WheelPicker
                data={batchData}
                onChange={onBatchChange}
                itemHeight={60}
                activeColor="#aaa"
                color="#333"
                backgroundColor={'transparent'}
                shadowColor={'transparent'}
                height={200}
                fontSize={18}
                selectedID={batch}
              />
            </AccordionDetails>
          </Stack>
        </RoadPaper>
      </Grid>
      <Grid item xs={8}>
        {filteredCandyData.length > 0 && (
          <Box>
            <RoadPaper>
              <Candy
                id={id}
                candyData={filteredCandyData}
                candyId={candyId}
                onPrimaryAction={onPrimaryAction}
                setAlertState={setAlertState}
              />
            </RoadPaper>
          </Box>
        )}
      </Grid>
      <Grid item xs={2}>
        <RoadPaper>
          {filteredCandyData.length > 0 && (
            <Stack>
              <AccordionSummary
                sx={{
                  display: 'flex',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h3">Select</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <WheelPicker
                  data={data}
                  onChange={onChange}
                  itemHeight={60}
                  activeColor="#aaa"
                  color="#333"
                  backgroundColor={'transparent'}
                  shadowColor={'transparent'}
                  height={200}
                  fontSize={18}
                  selectedID={candyId}
                />
              </AccordionDetails>
            </Stack>
          )}
        </RoadPaper>
      </Grid>
    </Grid>
  );
};

export const BuyCandiesContainer = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [candyData, setCandyData] = useState([]);
  const [batches, setBatches] = useState([]);
  const [candyId, setCandyId] = useRecoilState(buyableCandyViewing);
  const [batch, setBatch] = useRecoilState(buyableBatchViewing);

  useEffect(() => {
    async function fetchCandies() {
      if (reportCatalog === undefined) {
        return;
      }
      const catalogBytes = await reportCatalog(ORACLE.toString());
      const catalog = JSON.parse(String.fromCharCode(...catalogBytes));
      setBatches(catalog);
      console.log(catalog);
      const listings = await getListings(
        ORACLE.toString(),
        JSON.stringify(catalog),
      );
      console.log(JSON.parse(String.fromCharCode(...listings)));
      let data = [];
      for (const batch of catalog) {
        const batchData = JSON.parse(
          await fetch_candies(batch.BatchReceiptData.BatchAccount),
        );
        data = data.concat(
          batchData.map((_batchData: Object) => ({ ...batch, ..._batchData })),
        );
      }
      console.log(data);
      setCandyData(data);
    }
    fetchCandies();
  }, []);

  const onBuy = useCallback(
    (candy: Object) => {
      async function buyCommit() {
        if (wallet) {
          const buyIx = JSON.parse(
            String.fromCharCode(
              ...(await buy(
                wallet.publicKey.toString(),
                // @ts-ignore
                candy.BatchReceiptData.BatchAccount,
                candyId,
              )),
            ),
          );

          let buyTx = Transaction.populate(
            new Message(buyIx.transaction.message),
          );
          buyTx.recentBlockhash = (
            await connection.getRecentBlockhash('finalized')
          ).blockhash;
          const signature = await wallet.sendTransaction(buyTx, connection, {
            signers: [Keypair.fromSecretKey(base58_to_binary(buyIx.mintKey))],
          });
          console.log(signature);
          await connection.confirmTransaction(signature, 'processed');
        }
      }
      buyCommit();
    },
    [wallet, connection, candyId],
  );

  return (
    <>
      {candyData.length > 0 && batches.length > 0 && (
        <CandiesGallery
          id={'Buy'}
          candyData={candyData}
          candyId={candyId}
          setCandyId={setCandyId}
          onPrimaryAction={onBuy}
          batches={batches}
          batch={batch}
          setBatch={setBatch}
        />
      )}
    </>
  );
};

export const SellableCandiesContainer = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [candyData, setCandyData] = useState([]);
  const [candyId, setCandyId] = useRecoilState(sellableCandyViewing);

  useEffect(() => {
    async function fetchCandies() {
      if (!wallet) {
        return;
      }
      if (wallet.publicKey) {
        const sellablesBytes = await sellables(
          wallet.publicKey.toString(),
          ORACLE.toString(),
        );
        const sellableNfts = JSON.parse(String.fromCharCode(...sellablesBytes));
        console.log(sellableNfts);
        setCandyData(sellableNfts);
      }
    }
    fetchCandies();
  }, [wallet]);

  const onSell = useCallback(
    ({ mint }) => {
      async function sell() {
        console.log(mint, mint.toString());
        if (wallet) {
          const sellIx = JSON.parse(
            String.fromCharCode(
              ...(await sellCommit(
                wallet.publicKey.toString(),
                ORACLE.toString(),
                mint.toString(),
              )),
            ),
          );

          const sellTx = Transaction.populate(new Message(sellIx.message));
          sellTx.recentBlockhash = (
            await connection.getRecentBlockhash('finalized')
          ).blockhash;
          const signature = await wallet.sendTransaction(sellTx, connection);
          console.log(signature);
          await connection.confirmTransaction(signature, 'processed');
        }
      }
      sell();
    },
    [wallet, connection],
  );

  return (
    <>
      {candyData.length > 0 && (
        <Candies
          id={'Sell'}
          candyData={candyData}
          candyId={candyId}
          setCandyId={setCandyId}
          onPrimaryAction={onSell}
        />
      )}
    </>
  );
};

export const ListableCandiesContainer = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [candyData, setCandyData] = useState([]);
  const [batches, setBatches] = useState([]);
  const [candyId, setCandyId] = useRecoilState(listableCandyViewing);
  const [batch, setBatch] = useRecoilState(listableBatchViewing);

  useEffect(() => {
    async function fetchCandies() {
      if (reportCatalog === undefined) {
        return;
      }
      const catalogBytes = await reportCatalog(ORACLE.toString());
      const catalog = JSON.parse(String.fromCharCode(...catalogBytes));
      console.log(catalog);
      setBatches(catalog);
      let data = [];
      for (const batch of catalog) {
        const batchData = JSON.parse(
          await fetch_candies(batch.BatchReceiptData.BatchAccount),
        );
        console.log('batchdata', batchData);
        data = data.concat(
          batchData.map((_batchData: Object) => ({ ...batch, ..._batchData })),
        );
      }
      setCandyData(data);
    }
    fetchCandies();
  }, []);

  const onList = useCallback(
    (candy: Object) => {
      async function buyCommit() {
        if (wallet) {
          const buyIx = JSON.parse(
            String.fromCharCode(
              ...(await buy(
                wallet.publicKey.toString(),
                // @ts-ignore
                candy.BatchReceiptData.BatchAccount,
                candyId,
              )),
            ),
          );

          let buyTx = Transaction.populate(
            new Message(buyIx.transaction.message),
          );
          buyTx.recentBlockhash = (
            await connection.getRecentBlockhash('finalized')
          ).blockhash;
          const signature = await wallet.sendTransaction(buyTx, connection, {
            signers: [Keypair.fromSecretKey(base58_to_binary(buyIx.mintKey))],
          });
          await connection.confirmTransaction(signature, 'processed');
        }
      }
      buyCommit();
    },
    [wallet, connection],
  );

  return (
    <>
      {candyData.length > 0 && batches.length > 0 && (
        <CandiesGalleryListings
          id={'List'}
          candyData={candyData}
          candyId={candyId}
          setCandyId={setCandyId}
          onPrimaryAction={onList}
          batches={batches}
          batch={batch}
          setBatch={setBatch}
        />
      )}
    </>
  );
};

export const HashMap = () => {
  const { connection } = useConnection();
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
      if (reportHashMap === undefined) {
        return;
      }
      const hashMapBytes = await reportHashMap(ORACLE.toString());
      const hashMap = JSON.parse(String.fromCharCode(...hashMapBytes));
      console.log(hashMap);
      setHashMapData(hashMap);
    }
    fetchCandies();
  }, []);

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
