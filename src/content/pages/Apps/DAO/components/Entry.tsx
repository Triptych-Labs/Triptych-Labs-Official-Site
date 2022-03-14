import {
  Box,
  Container,
  Alert,
  Button,
  FormControl,
  TextField,
} from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Keypair,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  PublicKey,
} from '@solana/web3.js';
import * as anc from '@project-serum/anchor';
import { useRecoilState } from 'recoil';
import { login } from 'src/content/pages/Apps/DAO/atoms/login';
import { nfts } from 'src/content/pages/Apps/DAO/atoms/nfts';
import { session } from 'src/content/pages/Apps/DAO/atoms/session';

type Props = {};

declare function certify(
  pubKey: string,
  programKey: string,
  accessCode: string,
): Promise<boolean>;

declare function fetchNfts(pubKey: string): Promise<Uint8Array>;

async function callFetchNfts(
  pubKey: string,
  setNfts: any,
  setErrorMessage: any,
) {
  try {
    const nfts = JSON.parse(
      Buffer.from((await fetchNfts(pubKey)).buffer).toString(),
    );
    console.log(nfts);
    setNfts(nfts);
  } catch (e) {
    setErrorMessage('Unauthorized');
  }
}

async function callCertify(
  pubKey: string,
  programKey: string,
  accessCode: string,
  setEntry: any,
  setSession: any,
  setErrorMessage: any,
) {
  try {
    const resp = await certify(pubKey, programKey, accessCode);
    if (resp) {
      setEntry(true);
      setSession(programKey);
    } else {
      setErrorMessage('Unauthorized');
    }
  } catch (e) {
    setErrorMessage('Unauthorized');
  }

  console.log('Made it');
}

const DAOEntry: React.FC<Props> = (props) => {
  const { publicKey } = useWallet();

  const [, setEntry] = useRecoilState(login);
  const [, setNfts] = useRecoilState(nfts);
  const [, setSession] = useRecoilState(session);
  const [programKey, setProgramKey] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearState = () => {
    setEntry(false);
    setErrorMessage(null);
  };

  useEffect(() => {
    if (publicKey)
      callFetchNfts(publicKey.toString(), setNfts, setErrorMessage);
  }, [publicKey]);

  const on2FAChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setProgramKey(event.currentTarget.value);
    },
    [setProgramKey],
  );
  const onAccessChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setAccessCode(event.currentTarget.value);
    },
    [setAccessCode],
  );

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      clearState();
      if (accessCode === '') {
        setErrorMessage('Please input Access Code.');
        return;
      }
      if (programKey === '') {
        setErrorMessage('Please specify a passphrase.');
        return;
      }

      callCertify(
        publicKey.toString(),
        programKey,
        accessCode,
        setEntry,
        setSession,
        setErrorMessage,
      );
    },
    [accessCode, programKey],
  );

  return (
    <>
      <Container maxWidth="sm">
        <form onSubmit={onSubmit}>
          <FormControl variant="outlined" fullWidth={true}>
            <TextField
              id="twofa"
              name="twofa"
              label="Specify 2FA Code"
              margin="normal"
              variant="outlined"
              multiline={false}
              rows={1}
              onChange={on2FAChange}
            />
            <TextField
              id="access"
              name="access"
              label="Specify Access Code"
              margin="normal"
              variant="outlined"
              multiline={false}
              rows={1}
              onChange={onAccessChange}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth={false}
              color="primary"
            >
              Enter
            </Button>
          </FormControl>
        </form>
        <Box margin="0.5em 0">
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
      </Container>
    </>
  );
};

export default DAOEntry;
