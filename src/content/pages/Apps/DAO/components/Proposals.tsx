import {
  Button,
  Card,
  Alert,
  Grid,
  Box,
  CardContent,
  FormControl,
  CardActions,
  Typography,
  Avatar,
  Divider,
  Link,
  Rating,
  InputLabel,
  OutlinedInput,
  Chip,
  Tooltip,
  AvatarGroup,
  Pagination,
  InputAdornment,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import type ProposalsT from 'src/content/pages/Apps/DAO/structs/proposals';
import { styled } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import { session } from 'src/content/pages/Apps/DAO/atoms/session';
import { proposals } from 'src/content/pages/Apps/DAO/atoms/proposals';

type Props = {};

declare function fetchProposals(programKey: string): Promise<string>;

async function callFetchProposals(
  programKey: string,
  setProposals: any,
  setErrorMessage: any,
) {
  try {
    const resp = await fetchProposals(programKey);
    setProposals(JSON.parse(resp));
  } catch (e) {
    console.log(e);
    console.log(programKey);
    setErrorMessage('Unauthorized');
  }

  console.log('Made it');
}

const VoteButton = styled(Button)(
  ({ theme }) => `
    margin: 10px;
    width: 90%;
    `,
);

const ProposalCard = ({ proposal }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [yayVote, setYayVote] = useState<number>(0);
  const [nayVote, setNayVote] = useState<number>(0);

  const changeYayVote = (event) => {
    setYayVote(event.target.value);
  };
  const changeNayVote = (event) => {
    setNayVote(event.target.value);
  };

  return (
    <Grid item xs={12} md={12}>
      <Card>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Link href="#" variant="h3" color="text.primary" underline="hover">
            Proposal #{proposal.proposalNum}
          </Link>
          <Box sx={{ py: 2 }}>
            <Chip
              sx={{ mr: 0.5 }}
              size="small"
              label={proposal.proposalType}
              color="secondary"
            />
          </Box>
          <Typography sx={{ pb: 2 }} color="text.secondary">
            {proposal.proposalDescription}
          </Typography>
          <Divider sx={{ my: 4 }}>Votes - 10 Remaining</Divider>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={() => {}}>
              <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FormControl>
                    <Grid item>
                      <InputLabel htmlFor="component-outlined">Yay</InputLabel>
                      <OutlinedInput
                        sx={{ borderColor: 'green' }}
                        id="component-outlined"
                        label="Yay"
                        onChange={changeYayVote}
                        endAdornment={
                          <InputAdornment position="end">Votes</InputAdornment>
                        }
                        value={yayVote}
                      />
                    </Grid>
                  </FormControl>
                  <br />
                  <FormControl>
                    <Grid item>
                      <InputLabel htmlFor="component-outlined">Nay</InputLabel>
                      <OutlinedInput
                        sx={{ borderColor: 'red' }}
                        id="component-outlined"
                        label="Nay"
                        onChange={changeNayVote}
                        endAdornment={
                          <InputAdornment position="end">Votes</InputAdornment>
                        }
                        value={nayVote}
                      />
                    </Grid>
                  </FormControl>
                </Box>
                <Grid container>
                  <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <VoteButton size="small" variant="contained">
                      Vote
                    </VoteButton>
                  </Grid>
                </Grid>
              </Grid>
            </form>
            <Box margin="0.5em 0">
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography display="flex" alignItems="center" variant="subtitle2">
            <TodayTwoToneIcon sx={{ mr: 1 }} />6 Days 3 Hrs left
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
};

const DAOProposals: React.FC<Props> = (props) => {
  const [sessionKey] = useRecoilState(session);
  const [proposalsState, setProposals] = useRecoilState(proposals);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    callFetchProposals(sessionKey, setProposals, setErrorMessage);
  }, []);

  return (
    <div>
      <Box margin="0.5em 0">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
      <div>
        <div style={{ display: 'flex' }}>
          <div>
            {proposalsState.length > 0 && (
              <ProposalCard proposal={proposalsState[0]} />
            )}
          </div>
        </div>
        {proposalsState.length === 0 && <div> no proposals :( </div>}
      </div>
    </div>
  );
};

export default DAOProposals;
