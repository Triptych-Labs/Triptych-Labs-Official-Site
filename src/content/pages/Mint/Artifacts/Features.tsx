import React, { useState, useEffect, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Divider,
  Typography,
  Paper,
  Container,
  useTheme,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import './index.css';
import Tabs from '../../Components/Tabs';
import Accordions from '../../Components/Accordions';
import Carousel from 'react-material-ui-carousel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Artifacts = () => {
  const theme = useTheme();

  const RoadPaper = styled(Paper)(
    ({ theme }) => `
    height:8vw;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:10px;
    background:rgba(0,0,0,0.5)
`,
  );
  return (
    <Grid item columnSpacing={3} xs={12} sm={12} md={12} lg={12} xl={6}>
      <Accordions />
    </Grid>
  );
};

const TripCarousel = () => {
  {
    var items = [
      {
        name: 'Artifact DAO',
        description: 'On-Chain Dao Voting and Smart wallet funds release',
        url: '/static/images/48.jpg',
      },
      {
        name: 'The Shitverse',
        description: 'the flyest most degenerate web3 metaverse',
        url: '/static/images/4242.jpg',
      },
      {
        name: 'Gen 0 NFT Drop',
        description: 'Playable characters in our Shitverse',
        url: '/static/images/240.png',
      },
    ];

    return (
      <Carousel IndicatorIcon={<></>}>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    );
  }
};

const Item = (props: any) => {
  const theme = useTheme();

  const CustomPaper = styled(Paper)(
    ({ theme }) => `
    display:flex;
    justify-content:center;
    align-items:center;
    margin:10px;
    background-color:rgba(0,0,0,0.5);
    height:100%;
    color:white;
    
    font-weight:700
`,
  );
  {
    return (
      <>
        <Typography variant="subtitle2" style={{ width: '100%' }}>
          in the works:
        </Typography>
        <CustomPaper
          style={{
            backgroundImage: 'url(' + props.item.url + ')',
            backgroundSize: '150%',
            padding: '3vw',
          }}
        >
          <Box style={{ width: '60%', borderRadius: '8px' }}>
            {props.item.name}
          </Box>
        </CustomPaper>
        <Typography variant="body1">{props.item.description}</Typography>
      </>
    );
  }
};

export const Features = () => {
  const theme = useTheme();

  return (
    <Container maxWidth={'xl'} className={'cssanimation hu__hu__1'}>
      <Grid container rowSpacing={5} columnSpacing={3} alignItems="stretch">
        <Grid item xs={12} xl={12}>
          <Container maxWidth={'lg'}>
            <TripCarousel />
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            style={{
              background: 'rgba(112, 99, 192, 0.25)',
              maxWidth: '500px',
              margin: 'auto',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h3" style={{ textAlign: 'center' }}>
                Timeline
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={4}>
                  <Card
                    style={{
                      background: 'none',
                      margin: '15px',
                      padding: '15px',
                    }}
                  >
                    <Typography variant="body2">Artifact DAO</Typography>
                    <Typography variant="subtitle2">3/21/22</Typography>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card
                    style={{
                      background: 'none',
                      margin: '15px',
                      padding: '15px',
                    }}
                  >
                    <Typography variant="body2">Gen #0 Drop</Typography>
                    <Typography variant="subtitle2">4/20/22</Typography>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card
                    style={{
                      background: 'none',
                      margin: '15px',
                      padding: '15px',
                    }}
                  >
                    <Typography variant="body2">Shitverse</Typography>
                    <Typography variant="subtitle2">05/01/22</Typography>
                  </Card>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item columnSpacing={3} xs={12} sm={12} md={12} lg={12} xl={6}>
          <Tabs />
        </Grid>
        <Artifacts />
        <Divider />
        <Grid item xs={12} xl={12}>
          <Typography>
            <Grid
              container
              columnSpacing={2}
              rowSpacing={1}
              style={{ width: '100%' }}
            >
              <Grid item xs={12}></Grid>
              <Grid item xs={12} xl={4} style={{ width: '100%' }}>
                <Paper className={'paper-img'}>
                  <NavLink to="/github/steakhouse">
                    SteakHouse: Staking Contract + L2
                  </NavLink>
                </Paper>
              </Grid>
              <Grid item xs={12} xl={4}>
                <Paper className={'paper-img'}>
                  <NavLink to="/github/nftloyalty">NFT Loyalty Rewards</NavLink>
                </Paper>
              </Grid>
              <Grid item xs={12} xl={4}>
                <Paper className={'paper-img'}>
                  <NavLink to="/github/cardpacks">
                    Card Pack like Metadata Preperation for Candy Machine
                  </NavLink>
                </Paper>
              </Grid>
            </Grid>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Features;
