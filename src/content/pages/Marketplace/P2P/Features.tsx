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
import Tabs from '../../Components/Tabs';
import Accordions from '../../Components/Accordions';
import Carousel from 'react-material-ui-carousel';
import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  return (
    <Container maxWidth={'xl'}>
      <Grid container rowSpacing={5} columnSpacing={3} alignItems="stretch">
        <Grid item xs={12} xl={12}>
          <Container maxWidth={'lg'}>
            <TripCarousel />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Features;
