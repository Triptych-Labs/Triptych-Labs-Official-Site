import {
  Box,
  Container,
  Alert,
  Button,
  FormControl,
  TextField,
} from '@mui/material';
import React, { useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Keypair,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  PublicKey,
} from '@solana/web3.js';
import * as anc from '@project-serum/anchor';

type Props = {};

declare function register(
  pubKey: string,
  programKey: string,
  accessCode: string,
): Promise<Uint8Array>;

declare function getProgramID(programKey: string): Promise<Uint8Array>;

async function callRegister(
  pubKey: string,
  programKey: string,
  accessCode: string,
  sendTransaction: any,
) {
  const connection = new anc.web3.Connection(anc.web3.clusterApiUrl('devnet'));
  const resp = await register(pubKey, programKey, accessCode);
  const programID = await getProgramID(programKey);

  const registerIx = new TransactionInstruction({
    keys: [
      { pubkey: new PublicKey(pubKey), isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId: new PublicKey(programID),
    data: Buffer.from(resp.buffer),
  });

  console.log(registerIx);
  const sig = await sendTransaction(
    new Transaction().add(registerIx),
    connection,
  );

  await connection.confirmTransaction(sig);
  console.log('Made it');
}

const DAORegister: React.FC<Props> = (props) => {
  const { publicKey, sendTransaction } = useWallet();

  const [programKey, setProgramKey] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearState = () => {
    setErrorMessage(null);
  };

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

      callRegister(
        publicKey.toString(),
        programKey,
        accessCode,
        sendTransaction,
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
              Register
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

export default DAORegister;
