/*
const logs = await connection.simulateTransaction(
  await wallet.signTransaction(doRngsTx),
);
console.log(JSON.stringify(logs.value.logs, null, 2));
*/

import { Metaplex } from '@metaplex-foundation/js-next';
import base64 from 'base64-js';
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
import { Transaction, Message } from '@solana/web3.js';

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
import { PublicKey } from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Connection, Keypair } from '@solana/web3.js';
import axios from 'axios';
// @ts-ignore
import { base58_to_binary } from 'base58-js';

const ORACLE = new PublicKey('8gvUXYSdqZ5dyGcN1fas5Q7qLRJgJNE693Bt7xgYZXBh');
declare function get_quests(oracle: String): Promise<any>;
declare function get_quested(oracle: String, holder: String): Promise<any>;
declare function enroll_questor(wallet_publicKey: String): Promise<any>;
declare function enroll_questees(
  wallet_publicKey: String,
  questees: String,
): Promise<any>;
declare function start_quests(
  wallet_publicKey: String,
  questees: String,
  oracle: String,
  questIndex: String,
): Promise<any>;
declare function end_quests(
  wallet_publicKey: String,
  questees: String,
  oracle: String,
  questIndex: String,
): Promise<any>;
declare function do_rngs(
  wallet_publicKey: String,
  questees: String,
  oracle: String,
  questIndex: String,
): Promise<any>;
declare function mint_rewards(
  wallet_publicKey: String,
  questees: String,
  oracle: String,
  questIndex: String,
): Promise<any>;
declare function get_rewards(
  wallet_publicKey: String,
  questees: String,
  oracle: String,
  questIndex: String,
): Promise<any>;

const resyncAtom = atom({
  key: 'resync',
  default: 0,
});
const nftsAtom = atom({
  key: 'nfts',
  default: [],
});

const nftsSelectionAtom = atom({
  key: 'nftsSelection',
  default: [],
});

const nftsQuestedAtom = atom({
  key: 'nftsQuested',
  default: [],
});
const nftsQuestedExhaustAtom = atom({
  key: 'nftsQuestedExhaust',
  default: [],
});

const questsAtom = atom({
  key: 'quests',
  default: {},
});

const questedAtom = atom({
  key: 'quested',
  default: {},
});

const questsSelectionAtom = atom({
  key: 'questsSelection',
  default: '',
});

const questsProgressionAtom = atom({
  key: 'questsProgression',
  default: 0,
});

const showCompletedAtom = atom({
  key: 'showCompleted',
  default: false,
});

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

export const Rewards = () => {
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

      const myNfts = await Metaplex.make(
        new Connection(
          'https://sparkling-dark-shadow.solana-devnet.quiknode.pro/0e9964e4d70fe7f856e7d03bc7e41dc6a2b84452/',
        ),
      )
        .nfts()
        .findAllByOwner(new PublicKey(wallet.publicKey.toBase58()));
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
          </Grid>
        </div>
      )}
    </>
  );
};

export const QuestsGallery = () => {
  const connection = new Connection('https://api.devnet.solana.com');

  const wallet = useWallet();
  const [resync, setResync] = useRecoilState(resyncAtom);
  const [nfts, setNfts] = useRecoilState(nftsAtom);
  const [quests, setQuests] = useRecoilState(questsAtom);
  const [, setQuested] = useRecoilState(questedAtom);
  const [questSelection, setQuestsSelection] =
    useRecoilState(questsSelectionAtom);
  const [nftsSelection, setNftsSelection] = useRecoilState(nftsSelectionAtom);
  const [nftsQuested] = useRecoilState(nftsQuestedAtom);
  const [nftsQuestedExhaust, setNftsQuestedExhaust] = useRecoilState(
    nftsQuestedExhaustAtom,
  );
  const [showCompleted, setShowCompleted] = useRecoilState(showCompletedAtom);
  const [questsProgression, setQuestsProgression] = useRecoilState(
    questsProgressionAtom,
  );

  const [activate, setActivate] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setResync(resync + 1);
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchQuests() {
      if (!wallet.publicKey) {
        return;
      }

      const questsJson = await get_quests(ORACLE.toString());
      const quests = JSON.parse(String.fromCharCode(...questsJson));
      setQuests(quests);
    }
    fetchQuests();
  }, [wallet, resync]);

  useEffect(() => {
    async function getQuested() {
      if (!wallet.publicKey) {
        return;
      }
      let quested = JSON.parse(
        String.fromCharCode(
          ...(await get_quested(
            ORACLE.toString(),
            wallet.publicKey.toString(),
          )),
        ),
      );

      let exhaustedMints = [];
      for (const questKey of Object.keys(quested)) {
        const rewardTickets = JSON.parse(
          String.fromCharCode(
            ...(await get_rewards(
              wallet.publicKey.toString(),
              JSON.stringify(
                quested[questKey]
                  .filter(({ QuestAccount }) => QuestAccount.Completed)
                  .map(({ QuestAccount }) => QuestAccount.DepositTokenMint),
              ),
              ORACLE.toString(),
              String(quested[questKey][0].QuestAccount.Index),
            )),
          ),
        );
        for (const mint of Object.keys(rewardTickets)) {
          if (
            rewardTickets[mint] !== null &&
            rewardTickets[mint].RewardTicket !== null &&
            rewardTickets[mint].RewardTicket.Amount === 0
          )
            exhaustedMints.push(mint);
        }
      }
      setNftsQuestedExhaust(exhaustedMints);

      setQuested(quested);
    }
    getQuested();
  }, [wallet, resync]);

  useEffect(() => {
    async function fetchNfts() {
      if (!wallet.publicKey) {
        return;
      }

      let myNfts = await Promise.all(
        (
          await Metaplex.make(
            new Connection(
              'https://sparkling-dark-shadow.solana-devnet.quiknode.pro/0e9964e4d70fe7f856e7d03bc7e41dc6a2b84452/',
            ),
          )
            .nfts()
            .findAllByOwner(new PublicKey(wallet.publicKey.toBase58()))
        )
          .map(async (nft) => {
            let offchainMetadata = {};
            try {
              // offchainMetadata = (await axios.get(nft.uri)).data;
            } catch (e) {
              console.log('fail');
            }
            return { ...nft, offchainMetadata };
          })
          .filter(
            async (nft) =>
              !nftsQuestedExhaust.includes((await nft).mint.toString()),
          ),
      );

      setNfts(myNfts);
      setNftsSelection(myNfts.map(() => false));
    }
    fetchNfts();
  }, [wallet, resync]);

  const onBack = useCallback(
    (_) => {
      if (questsProgression > 0) setQuestsProgression(questsProgression - 1);
      if (questsProgression < 0) setQuestsProgression(questsProgression + 1);
    },
    [questsProgression, setQuestsProgression],
  );
  const onNext = useCallback(
    (_) => {
      async function enrollQuestees() {
        const enrollQuesteesIx = JSON.parse(
          String.fromCharCode(
            ...(await enroll_questees(
              wallet.publicKey.toString(),
              JSON.stringify(
                nfts
                  .filter((_, nftIndex) => nftsSelection[nftIndex])
                  .map(({ mint }) => mint.toString()),
              ),
            )),
          ),
        );

        if (Object.keys(enrollQuesteesIx).length > 0) {
          const enrollQuesteesTx = Transaction.populate(
            new Message(enrollQuesteesIx.message),
          );
          enrollQuesteesTx.recentBlockhash = (
            await connection.getRecentBlockhash('finalized')
          ).blockhash;
          const signature = await wallet.sendTransaction(
            enrollQuesteesTx,
            connection,
          );
          console.log(signature);
          await connection.confirmTransaction(signature, 'confirmed');
        }
        setQuestsProgression(2);
      }

      async function doRngs() {
        const doRngsIx = JSON.parse(
          String.fromCharCode(
            ...(await do_rngs(
              wallet.publicKey.toString(),
              JSON.stringify(
                nftsQuested
                  .filter((_, nftIndex) => nftsSelection[nftIndex])
                  .map(({ mint }) => mint.toString()),
              ),
              ORACLE.toString(),
              String(quests[questSelection].Index),
            )),
          ),
        );

        if (Object.keys(doRngsIx).length > 0) {
          const doRngsTx = Transaction.populate(new Message(doRngsIx.message));
          doRngsTx.recentBlockhash = (
            await connection.getRecentBlockhash('finalized')
          ).blockhash;
          const signature = await wallet.sendTransaction(doRngsTx, connection);
          console.log(signature);
          await connection.confirmTransaction(signature, 'confirmed');
        }
        setQuestsProgression(-2);
        return;
      }

      async function executor() {
        if (showCompleted) {
          doRngs();
        } else {
          setQuestsProgression(-2);
        }
      }

      if (questsProgression > 0) enrollQuestees();
      if (questsProgression < 0) executor();
    },
    [
      questSelection,
      questsProgression,
      nfts,
      nftsSelection,
      setQuestsProgression,
    ],
  );
  const onManage = useCallback(
    (_, quest) => {
      setResync(resync + 1);
      setShowCompleted(false);
      setQuestsSelection(quest);
      setQuestsProgression(-1);
    },
    [resync, setQuestsProgression],
  );
  const onReward = useCallback(
    (_, quest) => {
      setQuestsSelection(quest);
      setShowCompleted(true);
      setResync(resync + 1);
      setQuestsProgression(-1);
    },
    [resync, questsProgression, setQuestsProgression],
  );
  const onQuestSelection = useCallback(
    (_, quest) => {
      async function enrollQuestor() {
        const enrollQuestorIx = JSON.parse(
          String.fromCharCode(
            ...(await enroll_questor(wallet.publicKey.toString())),
          ),
        );

        if (Object.keys(enrollQuestorIx).length > 0) {
          const enrollQuestorTx = Transaction.populate(
            new Message(enrollQuestorIx.message),
          );
          enrollQuestorTx.recentBlockhash = (
            await connection.getRecentBlockhash('finalized')
          ).blockhash;
          const signature = await wallet.sendTransaction(
            enrollQuestorTx,
            connection,
          );
          console.log(signature);
          await connection.confirmTransaction(signature, 'confirmed');
        }
        setShowCompleted(false);
        setResync(resync + 1);
        setQuestsSelection(quest);
        setQuestsProgression(1);
        setNftsSelection(nfts.map(() => false));
      }

      enrollQuestor();
    },
    [resync, nfts, wallet, setQuestsSelection, setQuestsProgression],
  );

  const onQuestStart = useCallback(
    (_, quest) => {
      async function startQuests() {
        const startQuestsIx = JSON.parse(
          String.fromCharCode(
            ...(await start_quests(
              wallet.publicKey.toString(),
              JSON.stringify(
                nfts
                  .filter((_, nftIndex) => nftsSelection[nftIndex])
                  .map(({ mint }) => mint.toString()),
              ),
              ORACLE.toString(),
              String(quests[quest].Index),
            )),
          ),
        );

        if (Object.keys(startQuestsIx).length > 0) {
          const startQuestsTx = Transaction.populate(
            new Message(startQuestsIx.message),
          );
          startQuestsTx.recentBlockhash = (
            await connection.getRecentBlockhash('finalized')
          ).blockhash;
          const signature = await wallet.sendTransaction(
            startQuestsTx,
            connection,
          );
          console.log(signature);
          await connection.confirmTransaction(signature, 'confirmed');
          setQuestsProgression(0);
        }
      }

      startQuests();
    },
    [
      quests,
      nfts,
      nftsSelection,
      wallet,
      setQuestsSelection,
      setQuestsProgression,
    ],
  );

  const onQuestAction = useCallback(
    (_, quest) => {
      async function makeClaims() {
        const makeClaimsTxs = JSON.parse(
          String.fromCharCode(
            ...(await mint_rewards(
              wallet.publicKey.toString(),
              JSON.stringify(
                nftsQuested
                  .filter((_, nftIndex) => nftsSelection[nftIndex])
                  .map(({ mint }) => mint.toString()),
              ),
              ORACLE.toString(),
              String(quests[quest].Index),
            )),
          ),
        );

        if (makeClaimsTxs.length > 0) {
          for (const mintTx of makeClaimsTxs) {
            let rewardTx = Transaction.populate(new Message(mintTx.message));
            rewardTx.recentBlockhash = (
              await connection.getRecentBlockhash('finalized')
            ).blockhash;
            const signature = await wallet.sendTransaction(
              rewardTx,
              connection,
            );
            console.log(signature);
            await connection.confirmTransaction(signature, 'confirmed');
          }
        }
      }

      async function endQuests() {
        const endQuestsIx = JSON.parse(
          String.fromCharCode(
            ...(await end_quests(
              wallet.publicKey.toString(),
              JSON.stringify(
                nftsQuested
                  .filter((_, nftIndex) => nftsSelection[nftIndex])
                  .map(({ mint }) => mint.toString()),
              ),
              ORACLE.toString(),
              String(quests[quest].Index),
            )),
          ),
        );

        if (Object.keys(endQuestsIx).length > 0) {
          const endQuestsTx = Transaction.populate(
            new Message(endQuestsIx.message),
          );
          endQuestsTx.recentBlockhash = (
            await connection.getRecentBlockhash('finalized')
          ).blockhash;
          const signature = await wallet.sendTransaction(
            endQuestsTx,
            connection,
          );
          console.log(signature);
          await connection.confirmTransaction(signature, 'confirmed');
          setQuestsProgression(0);
        }
      }

      if (showCompleted) {
        makeClaims();
      } else {
        endQuests();
      }
    },
    [showCompleted, quests, nfts, nftsQuested, nftsSelection, wallet],
  );

  const onNftSelection = useCallback(
    (_, nftIndex) => {
      setNftsSelection((currNftSelection) => {
        let nftSelectionClone = Object.assign([], currNftSelection);
        nftSelectionClone[nftIndex] = !currNftSelection[nftIndex];
        return nftSelectionClone;
      });
    },
    [setQuestsSelection, setQuestsProgression],
  );

  let body;
  switch (questsProgression) {
    case -2: {
      body = <QuestAction onSelection={onQuestAction} />;
      break;
    }
    case -1: {
      body = <QuestedGalleryItems onSelection={onNftSelection} />;
      break;
    }
    case 0: {
      body = (
        <QuestsGalleryItems
          onSelection={onQuestSelection}
          onManage={onManage}
          onReward={onReward}
        />
      );
      break;
    }
    case 1: {
      body = <NFTGalleryItems onSelection={onNftSelection} />;
      break;
    }
    case 2: {
      body = <QuestStart onSelection={onQuestStart} />;
      break;
    }
  }

  return (
    <>
      {questsProgression !== 0 && (
        <RoadPaper>
          <RoadPaper>
            <Button onClick={onBack}>Go Back</Button>
            {Math.abs(questsProgression) !== 2 &&
              nftsSelection.filter((selected) => selected === true).length >
                0 && <Button onClick={onNext}>Continue</Button>}
          </RoadPaper>
        </RoadPaper>
      )}
      {Object.values(quests).length > 0 && (
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
          {body}
        </div>
      )}
    </>
  );
};
export const QuestsGalleryItems = ({ onSelection, onManage, onReward }) => {
  const [quests] = useRecoilState(questsAtom);
  const [quested] = useRecoilState(questedAtom);
  const [nftsQuestedExhaust] = useRecoilState(nftsQuestedExhaustAtom);
  const questsKeys = Object.keys(quests);

  return (
    <Grid alignItems="center" container>
      {questsKeys.length > 0 &&
        questsKeys.map((quest) => {
          return (
            <Grid xs={4}>
              <Box textAlign="center">
                <FrameCorners>
                  <RoadPaper>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://www.arweave.net/GLeORZQuLxFzDFK0aBQKwhQUUF0-4eawXnrjdtmv5fg?ext=png"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {
                            //@ts-ignore
                            String(
                              'Debug: ' +
                                quests[quest].Index +
                                ' Name: ' +
                                quests[quest].Name,
                            )
                          }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          onClick={(event) => onSelection(event, quest)}
                          size="small"
                        >
                          Start
                        </Button>
                        {quested.hasOwnProperty(quest) &&
                          quested[quest].filter(
                            ({ QuestAccount }) => !QuestAccount.Completed,
                          ).length > 0 && (
                            <Button
                              onClick={(event) => onManage(event, quest)}
                              size="small"
                            >
                              Manage
                            </Button>
                          )}
                        {quested.hasOwnProperty(quest) &&
                          quested[quest]
                            .filter(
                              ({ QuestAccount }) => QuestAccount.Completed,
                            )
                            .filter(
                              ({ QuestAccount }) =>
                                !nftsQuestedExhaust
                                  .map((mint) => mint.toString())
                                  .includes(QuestAccount.DepositTokenMint),
                            ).length > 0 && (
                            <Button
                              onClick={(event) => onReward(event, quest)}
                              size="small"
                            >
                              Rewards
                            </Button>
                          )}
                      </CardActions>
                    </Card>
                  </RoadPaper>
                </FrameCorners>
              </Box>
            </Grid>
          );
        })}
    </Grid>
  );
};

export const NFTGalleryItems = ({ onSelection }) => {
  const wallet = useWallet();
  const [nfts, setNfts] = useRecoilState(nftsAtom);
  const [nftsSelection, setNftsSelection] = useRecoilState(nftsSelectionAtom);

  return (
    <Grid alignItems="center" container>
      {nfts.map((nft, nftIndex) => (
        <Grid xs={4}>
          <Box textAlign="center">
            <FrameCorners>
              <RoadPaper>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      nft.offchainMetadata.hasOwnProperty('image')
                        ? nft.offchainMetadata.image
                        : 'https://www.arweave.net/GLeORZQuLxFzDFK0aBQKwhQUUF0-4eawXnrjdtmv5fg?ext=png'
                    }
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {nft.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={(event) => onSelection(event, nftIndex)}
                      size="small"
                    >
                      {!nftsSelection[nftIndex] ? 'Enroll' : 'Withdraw'}
                    </Button>
                  </CardActions>
                </Card>
              </RoadPaper>
            </FrameCorners>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export const QuestStart = ({ onSelection }) => {
  const [nfts] = useRecoilState(nftsAtom);
  const [nftsSelection] = useRecoilState(nftsSelectionAtom);
  const [questSelection] = useRecoilState(questsSelectionAtom);
  return (
    <>
      <RoadPaper>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {
                //@ts-ignore
                questSelection.Name
              }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
            <CardActions
              style={{
                display: 'block',
                textAlign: 'center',
                alignItems: 'center',
                margin: 'auto',
              }}
            >
              <Button
                onClick={(event) => onSelection(event, questSelection)}
                size="small"
              >
                Start Quest
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </RoadPaper>
      <Grid alignItems="center" container>
        {nfts
          .filter((_, nftIndex) => nftsSelection[nftIndex])
          .map((nft) => (
            <Grid xs={4}>
              <Box textAlign="center">
                <FrameCorners>
                  <RoadPaper>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={
                          nft.offchainMetadata.hasOwnProperty('image')
                            ? nft.offchainMetadata.image
                            : 'https://www.arweave.net/GLeORZQuLxFzDFK0aBQKwhQUUF0-4eawXnrjdtmv5fg?ext=png'
                        }
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {nft.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography>
                      </CardContent>
                    </Card>
                  </RoadPaper>
                </FrameCorners>
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export const QuestedGalleryItems = ({ onSelection }) => {
  const wallet = useWallet();
  const [nftsQuested, setNftsQuested] = useRecoilState(nftsQuestedAtom);
  const [quests] = useRecoilState(questsAtom);
  const [quested] = useRecoilState(questedAtom);
  const [nftsQuestedExhaust] = useRecoilState(nftsQuestedExhaustAtom);
  const [showCompleted] = useRecoilState(showCompletedAtom);
  const [questSelection] = useRecoilState(questsSelectionAtom);
  const [, setNftsSelection] = useRecoilState(nftsSelectionAtom);
  useEffect(() => {
    async function normalizeQuested() {
      const nfts = await Promise.all(
        (
          await Metaplex.make(
            new Connection(
              'https://sparkling-dark-shadow.solana-devnet.quiknode.pro/0e9964e4d70fe7f856e7d03bc7e41dc6a2b84452/',
            ),
          )
            .nfts()
            .findAllByMintList(
              quested[questSelection]
                .filter(
                  ({ QuestAccount }) =>
                    QuestAccount.Completed === showCompleted,
                )
                .filter(
                  ({ QuestAccount }) =>
                    !nftsQuestedExhaust
                      .map((mint) => mint.toString())
                      .includes(QuestAccount.DepositTokenMint),
                )
                .map(
                  ({ QuestAccount }) =>
                    new PublicKey(QuestAccount.DepositTokenMint),
                ),
            )
        ).map(async (nft) => {
          let metadata = {};
          try {
            // metadata = (await axios.get(nft.uri)).data;
          } catch (e) {}
          return { ...nft, offchainMetadata: metadata };
        }),
      );
      setNftsQuested(nfts);
      setNftsSelection(nfts.map(() => false));
    }
    normalizeQuested();
  }, [nftsQuestedExhaust, quested, showCompleted, quests, questSelection]);

  const [buttonState, setButtonState] = useState(false);
  let buttonText;
  if (showCompleted) {
    switch (buttonState) {
      case false: {
        buttonText = 'Claim';
        break;
      }
      case true: {
        buttonText = 'Claiming';
        break;
      }
    }
  } else {
    switch (buttonState) {
      case false: {
        buttonText = 'Withdraw';
        break;
      }
      case true: {
        buttonText = 'Withdrawing';
        break;
      }
    }
  }

  return (
    <Grid alignItems="center" container>
      {nftsQuested.map((nft, nftIndex) => (
        <Grid xs={4}>
          <Box textAlign="center">
            <FrameCorners>
              <RoadPaper>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      nft.offchainMetadata.hasOwnProperty('image')
                        ? nft.offchainMetadata.image
                        : 'https://www.arweave.net/GLeORZQuLxFzDFK0aBQKwhQUUF0-4eawXnrjdtmv5fg?ext=png'
                    }
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {nft.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={(event) => {
                        setButtonState(!buttonState);
                        onSelection(event, nftIndex);
                      }}
                      size="small"
                    >
                      {buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </RoadPaper>
            </FrameCorners>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export const QuestAction = ({ onSelection }) => {
  const [nftsQuested] = useRecoilState(nftsQuestedAtom);
  const [nftsSelection] = useRecoilState(nftsSelectionAtom);
  const [questSelection] = useRecoilState(questsSelectionAtom);
  const [showCompleted] = useRecoilState(showCompletedAtom);

  let buttonText = '';
  switch (showCompleted) {
    case true: {
      buttonText = 'Claim Reward(s)';
      break;
    }
    case false: {
      buttonText = 'End Quest';
      break;
    }
  }

  return (
    <>
      <RoadPaper>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {
                //@ts-ignore
                questSelection.Name
              }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              For the many rewards you could receive - you will be prompted many
              transactions over time to generate randomness and mint reward(s).
              You may stop at any time to resume claiming your remaining
              rewards.
            </Typography>
            <CardActions
              style={{
                display: 'block',
                textAlign: 'center',
                alignItems: 'center',
                margin: 'auto',
              }}
            >
              <Button
                onClick={(event) => onSelection(event, questSelection)}
                size="small"
              >
                {buttonText}
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </RoadPaper>
      <Grid alignItems="center" container>
        {nftsQuested
          .filter((_, nftIndex) => nftsSelection[nftIndex])
          .map((nft) => (
            <Grid xs={4}>
              <Box textAlign="center">
                <FrameCorners>
                  <RoadPaper>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={
                          nft.offchainMetadata.hasOwnProperty('image')
                            ? nft.offchainMetadata.image
                            : 'https://www.arweave.net/GLeORZQuLxFzDFK0aBQKwhQUUF0-4eawXnrjdtmv5fg?ext=png'
                        }
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {nft.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography>
                      </CardContent>
                    </Card>
                  </RoadPaper>
                </FrameCorners>
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

