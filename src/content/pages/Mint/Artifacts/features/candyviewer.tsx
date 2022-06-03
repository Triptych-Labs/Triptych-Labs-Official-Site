import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  List,
  Grid,
  Divider,
  Paper,
  Container,
  useTheme,
} from '@mui/material';
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

// declare function fetch_candies(T: string): Promise<any>;
const candyCache = atom({
  key: 'CandyCache',
  default: {},
});
const candyViewing = atom({
  key: 'CandyViewing',
  default: '0',
});

const RoadPaper = styled(Paper)(
  ({ theme }) => `
  display:flex;
  justify-content:center;
  align-items:center;
  margin:10px;
  background: rgba(112, 99, 192, 0.25)
`,
);

export const Candy = ({ candyData }) => {
  const [candyId] = useRecoilState(candyViewing);
  const [candyCaches, setCandyCaches] = useRecoilState(candyCache);
  const [candyMeta, setCandyMeta] = useState({});

  useEffect(() => {
    async function fetchMetadata() {
      if (!candyCaches[candyId]) {
        setCandyMeta({});
        const data = await axios.get(candyData[Number(candyId)].uri);
        setCandyCaches((cache: any) => {
          let _cache = { ...cache };
          _cache[candyId] = data.data;
          return _cache;
        });
        setCandyMeta(data.data);
      } else {
        setCandyMeta(candyCaches[candyId]);
      }
    }
    fetchMetadata();
  }, [candyId, setCandyCaches]);

  return (
    <>
      {Object.keys(candyMeta).length > 0 && (
        <RoadPaper>
          <Card sx={{ all: 'revert' }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="200"
              image={
                Object.keys(candyMeta).indexOf('image') !== -1 &&
                //@ts-ignore
                candyMeta.image
              }
            />
            <div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {candyData[Number(candyId)].name}
                </Typography>
                <Typography
                  variant="h5"
                  align="right"
                  gutterBottom
                  component="div"
                >
                  ◎ 1
                </Typography>
              </CardContent>
            </div>
          </Card>
        </RoadPaper>
      )}
    </>
  );
};

export const Candies = ({ candyData }) => {
  const [candyId, setCandyId] = useRecoilState(candyViewing);
  const onChange = useCallback(({ id }) => {
    setCandyId(id);
  }, []);
  const data = candyData.map(({ name }, index) => ({
    id: String(index),
    value: name,
  }));
  return (
    <RoadPaper>
      <div>
        <AccordionSummary
          sx={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3">Browse Artifacts</Typography>
        </AccordionSummary>
        <div style={{ all: 'revert', overflow: 'hidden' }}>
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
        </div>
      </div>
      <div
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          width: '500px',
        }}
      >
        <Candy candyData={candyData} />
      </div>
    </RoadPaper>
  );
};

export const CandiesContainer = () => {
  const [candyData, setCandyData] = useState([]);

  /*
  useEffect(() => {
    async function fetchCandies() {
      const data = await fetch_candies(
        'AKQJEFQ6SeTWNMRPhg716rLTWQ33ECGPdhLGwzqsZKN3',
      );
      setCandyData(JSON.parse(data));
    }
    fetchCandies();
  }, []);
  */

  return <>{candyData.length > 0 && <Candies candyData={candyData} />}</>;
};

