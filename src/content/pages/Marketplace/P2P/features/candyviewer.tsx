import base64 from 'base64-js';
// @ts-ignore
import { base58_to_binary } from 'base58-js';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

import DateTimePicker from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
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

import InputLabel from '@mui/material/InputLabel';

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
  Connection,
} from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Snackbar } from '@mui/material/';
import Alert from '@mui/material/Alert';
// import { Box,  } from '@mui/material';

const ORACLE = new PublicKey('BAM9WgGRkjh2sjaqTLc4YD5X2cYfpMrHE2Wz51HSKhzf');
const MARKETUID = new PublicKey('4Gm324iNEMapZV9aVyWg8EwJYLiqepYYab47sCWcPnh1');
declare function fetch_candies(T: String): Promise<any>;
declare function reportCatalog(T: String): Promise<any>;
declare function sellables(Tholder: String, Toracle: String): Promise<any>;
declare function marketBuy(
  Tbuyer: String,
  Toracle: String,
  Tmarketuid: String,
  TlistingId: String,
): Promise<any>;
declare function marketListNft(
  Tholder: String,
  Toracle: String,
  Tmarketuid: String,
  Tmint: String,
  Tprice: String,
): Promise<any>;
declare function buy(
  Tholder: String,
  Tbatch: String,
  Tindex: String,
): Promise<any>;
declare function marketListBuyables(
  Toracle: String,
  Tmarketuid: String,
): Promise<any>;
declare function getMarketMeta(
  Toracle: String,
  Tmarketuid: String,
): Promise<any>;
declare function marketDelist(
  Tholder: String,
  Toracle: String,
  Tmarketuid: String,
  Tmint: String,
): Promise<any>;

const marketMetaCache = atom({
  key: 'marketMeta',
  default: {},
});
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
const marketListingsAtom = atom({
  key: 'MarketListings',
  default: [],
});

const refreshCounterAtom = atom({
  key: 'RefreshCounter',
  default: 0,
});
interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
}

function formatAmountToUiAmount(amount, decimals): String {
  return String(amount / Math.pow(10, decimals));
}

function formatUiAmountToAmount(uiAmount, decimals): String {
  return String(uiAmount * Math.pow(10, decimals));
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
const RoadPaper = styled(Paper)(
  ({ theme }) => `
  display:flex;
  justify-content:center;
  align-items:center;
  margin:10px;
  background: rgba(112, 99, 192, 0.25)
`,
);

export const Candy = ({
  id,
  candyData,
  candyId,
  onPrimaryAction,
  setAlertState,
}) => {
  const [marketMeta, setMarketMeta] = useRecoilState(marketMetaCache);
  const [candyCaches, setCandyCaches] = useRecoilState(candyCache);
  const [candyMeta, setCandyMeta] = useState({});
  const [price, setPrice] = useState('0');
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
  const onClick = useCallback(() => {
    async function click() {
      try {
        switch (id) {
          case 'Buy': {
            await onPrimaryAction(candyData[Number(candyId)]);
            setAlertState({
              open: true,
              message: 'Successful Buy!',
              severity: 'success',
            });
            break;
          }
          case 'Manage':
            if (marketMeta[MARKETUID.toString()]) {
              console.log(
                formatUiAmountToAmount(
                  price,
                  marketMeta[MARKETUID.toString()].decimals,
                ),
              );
              const signature = await onPrimaryAction(
                candyData[Number(candyId)],
                formatUiAmountToAmount(
                  price,
                  marketMeta[MARKETUID.toString()].decimals,
                ),
              );
              console.log(signature);
              setAlertState({
                open: true,
                message: 'Successful List!',
                severity: 'success',
              });
              /*
                  setAlertState({
                    open: true,
                    message: 'List failed! Please try again!',
                    severity: 'error',
                  });
                  */
            }
            break;
        }
      } catch (e) {}
    }
    click();
  }, [candyId, price, onPrimaryAction, setAlertState, candyData]);

  let content = null;
  let actions = null;
  const onPriceChange = (event) => {
    if (marketMeta[MARKETUID.toString()]) {
      let amount = formatUiAmountToAmount(
        event.target.value,
        marketMeta[MARKETUID.toString()].decimals,
      );
      if (Number(amount) <= Math.floor(Number(amount))) {
        setPrice(event.target.value);
      }
    }
  };
  /*
   */
  switch (id) {
    case 'Manage':
      let body = null;
      let action = 'Oops! Something went wrong!';
      if (candyData[Number(candyId)]) {
        console.log(candyData.length, candyData[Number(candyId)]);
        switch (candyData[Number(candyId)].enum) {
          case 'listed':
            action = 'Unlist';
            break;
          case 'sellable':
            action = 'List';
            body = (
              <div style={{ paddingTop: '2%', width: '75%' }}>
                <FormControl variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">
                    Price
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    type="number"
                    onChange={onPriceChange}
                    value={price}
                    endAdornment={
                      <InputAdornment sx={{ width: '35%' }} position="end">
                        {marketMeta[MARKETUID.toString()] &&
                          marketMeta[MARKETUID.toString()].symbol}
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            );
            break;
        }
      }
      content = (
        <div
          style={{
            paddingTop: '3%',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          {body && <RoadPaper style={{ margin: 'auto' }}>{body}</RoadPaper>}
          <RoadPaper
            style={{
              height: '10%',
              margin: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CardActions>
              <Button size="small" onClick={onClick}>
                {action}
              </Button>
            </CardActions>
          </RoadPaper>
        </div>
      );
      break;
    default:
      content = (
        <Typography variant="h5" align="right" gutterBottom component="div">
          {candyData[Number(candyId)] &&
            marketMeta[MARKETUID.toString()] &&
            formatAmountToUiAmount(
              candyData[Number(candyId)].price,
              marketMeta[MARKETUID.toString()].decimals,
            )}
          {String(' ')}
          {marketMeta[MARKETUID.toString()] &&
            marketMeta[MARKETUID.toString()].symbol}
        </Typography>
      );
      break;
  }
  switch (id) {
    case 'Manage':
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
              style={{ height: '200px' }}
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
                  {candyData[Number(candyId)] &&
                    candyData[Number(candyId)].name}
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
    console.log(candyData.length);
    setCandyId(id);
  }, []);
  let data = [];
  switch (id) {
    default:
      setCandyId(String(0));
      data = candyData.map(({ name }, index) => ({
        id: String(index),
        value: name,
      }));
      console.log('wheel data', data, candyData);
      break;
  }
  return (
    <RoadPaper>
      <Grid>
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
              {data.length && (
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
              )}
            </AccordionDetails>
          </Stack>
        </RoadPaper>
      </Grid>
      <Candy
        id={id}
        candyData={candyData}
        candyId={candyId}
        onPrimaryAction={onPrimaryAction}
        setAlertState={setAlertState}
      />

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
  console.log('......... listings');
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
    case 'Manage':
      console.log('.........');
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
          {batchData.length && (
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
          )}
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
    case 'Manage':
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

export const BuyCandiesContainer = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [candyData, setCandyData] = useState([]);
  const [batches, setBatches] = useState([]);
  const [candyId, setCandyId] = useRecoilState(buyableCandyViewing);
  const [, setMarketListings] = useRecoilState(marketListingsAtom);
  const [refreshCounter, setRefreshCounter] =
    useRecoilState(refreshCounterAtom);

  useEffect(() => {
    async function fetchCandies() {
      if (reportCatalog === undefined) {
        return;
      }
      const catalogBytes = await marketListBuyables(
        ORACLE.toString(),
        MARKETUID.toString(),
      );
      const catalog = JSON.parse(String.fromCharCode(...catalogBytes));

      let marketListings = catalog
        .map((listing) => {
          return Object.fromEntries(
            Object.entries({
              ...listing.marketListingData,
              ...listing.metadata.Data,
            }).map(([k, v]) => [k.toLowerCase(), v]),
          );
        })
        .filter((listing) => listing.fulfilled === 0);
      setCandyData(marketListings);
      setMarketListings(marketListings);
    }
    fetchCandies();
  }, [setCandyData, setMarketListings, refreshCounter]);

  const onBuy = useCallback(
    (candy: Object) => {
      async function buyCommit() {
        if (wallet) {
          console.log(candy);
          const buyIx = JSON.parse(
            String.fromCharCode(
              ...(await marketBuy(
                wallet.publicKey.toString(),
                ORACLE.toString(),
                MARKETUID.toString(),
                // @ts-ignore
                String(candy.index),
              )),
            ),
          );

          let buyTx = Transaction.populate(new Message(buyIx.message));
          buyTx.recentBlockhash = (
            await connection.getRecentBlockhash('finalized')
          ).blockhash;
          const signature = await wallet.sendTransaction(buyTx, null);
          console.log(signature);
          await connection.confirmTransaction(signature, 'finalized');
          setRefreshCounter(refreshCounter + 1);
        }
      }
      buyCommit();
    },
    [wallet, connection, candyId, refreshCounter, setRefreshCounter],
  );

  return (
    <>
      {candyData.length > 0 && (
        <Candies
          id={'Buy'}
          candyData={candyData}
          candyId={candyId}
          setCandyId={setCandyId}
          onPrimaryAction={onBuy}
        />
      )}
    </>
  );
};

export const ListableCandiesContainer = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [candyData, setCandyData] = useState([]);
  const [candyId, setCandyId] = useRecoilState(listableCandyViewing);
  const [marketMeta, setMarketMeta] = useRecoilState(marketMetaCache);
  const [marketListings] = useRecoilState(marketListingsAtom);
  // refreshCounterAtom
  const [refreshCounter, setRefreshCounter] =
    useRecoilState(refreshCounterAtom);

  useEffect(() => {
    async function addSellerListings() {
      if (marketListings.length == 0 || !wallet) {
        return;
      }
      console.log('REFRESHINGGGGG', refreshCounter);
      setCandyId(String(0));

      console.log(marketListings, wallet.publicKey.toString());
      let _marketListings = marketListings
        .filter((listing) => listing.seller == wallet.publicKey.toString())
        .map((listing) => ({
          ...listing,
          enum: 'listed',
        }));
      setCandyData((_candyData: any) => [..._candyData, ..._marketListings]);
      console.log(candyData);
    }
    addSellerListings();
  }, [refreshCounter, wallet, marketListings, setCandyData, setCandyId]);

  useEffect(() => {
    async function fetchCandies() {
      if (!wallet) {
        return;
      }
      console.log('REFRESHINGGGGG', refreshCounter);
      setCandyId(String(0));

      let _marketListings = marketListings
        .filter((listing) => listing.seller == wallet.publicKey.toString())
        .map((listing) => ({
          ...listing,
          enum: 'listed',
        }));
      if (!marketMeta[MARKETUID.toString()]) {
        const marketMetaJSON = await getMarketMeta(
          ORACLE.toString(),
          MARKETUID.toString(),
        );
        const marketMeta = JSON.parse(String.fromCharCode(...marketMetaJSON));
        console.log(marketMeta);
        setMarketMeta((cache: any) => {
          let _cache = { ...cache };
          _cache[MARKETUID.toString()] = marketMeta;
          return _cache;
        });
      }
      if (wallet.publicKey) {
        const sellablesBytes = await sellables(
          wallet.publicKey.toString(),
          ORACLE.toString(),
        );
        let sellableNfts = JSON.parse(String.fromCharCode(...sellablesBytes));
        sellableNfts = sellableNfts.map((nft) => ({
          ...nft,
          enum: 'sellable',
        }));
        setCandyData([...sellableNfts, ..._marketListings]);
        console.log('REFRESHEDDDDD', candyData, [
          ...sellableNfts,
          ..._marketListings,
        ]);
      }
    }
    fetchCandies();
  }, [refreshCounter, wallet, marketListings, setCandyId]);

  const onList = useCallback(
    (candy: Object, price: string) => {
      async function buyCommit() {
        if (wallet) {
          // @ts-ignore
          switch (candy.enum) {
            case 'sellable': {
              console.log(price);
              const listIx = JSON.parse(
                String.fromCharCode(
                  ...(await marketListNft(
                    wallet.publicKey.toString(),
                    ORACLE.toString(),
                    MARKETUID.toString(),
                    // @ts-ignore
                    candy.mint,
                    price,
                  )),
                ),
              );

              let listTx = Transaction.populate(new Message(listIx.message));
              listTx.recentBlockhash = (
                await connection.getRecentBlockhash('finalized')
              ).blockhash;
              const signature = await wallet.sendTransaction(listTx, null);
              await connection.confirmTransaction(signature, 'finalized');
              setRefreshCounter(refreshCounter + 1);
              return signature;
            }
            case 'listed': {
              console.log(candy);
              const delistIx = JSON.parse(
                String.fromCharCode(
                  ...(await marketDelist(
                    wallet.publicKey.toString(),
                    ORACLE.toString(),
                    MARKETUID.toString(),
                    // @ts-ignore
                    String(candy.index),
                  )),
                ),
              );

              let delistTx = Transaction.populate(
                new Message(delistIx.message),
              );
              delistTx.recentBlockhash = (
                await connection.getRecentBlockhash('finalized')
              ).blockhash;
              const signature = await wallet.sendTransaction(delistTx, null);
              await connection.confirmTransaction(signature, 'finalized');
              setRefreshCounter(refreshCounter + 1);
              return signature;
            }
          }
        }
      }
      return buyCommit();
    },
    [wallet, connection, refreshCounter, setRefreshCounter],
  );

  return (
    <>
      {candyData.length > 0 && (
        <Candies
          id={'Manage'}
          candyData={candyData}
          candyId={candyId}
          setCandyId={setCandyId}
          onPrimaryAction={onList}
        />
      )}
    </>
  );
};
