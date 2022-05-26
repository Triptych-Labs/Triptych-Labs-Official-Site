import {
  Container,
  Paper,
  useTheme,
  Grid,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Divider,
} from '@mui/material';
import { useState, SyntheticEvent } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/styles';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabsDemo() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
        style={{ height: '100%' }}
      >
        <Grid item xs={12} style={{ height: '100%' }}>
          <Card
            style={{ background: 'rgba(112, 99, 192, 0.25)', height: '100%' }}
          >
            <CardContent>
              <Box sx={{ width: '100%' }}>
                <Grid container>
                  <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor={'primary'}
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    style={{
                      background: 'rgba(112,99,192,.25)',
                      width: '100%',
                      borderRadius: '5px',
                    }}
                  >
                    <Tab
                      label="Artifact DAO"
                      {...a11yProps(0)}
                      style={{ width: '25%' }}
                    />
                    <Tab
                      label="Gen #0"
                      {...a11yProps(1)}
                      style={{ width: '25%' }}
                    />
                    <Tab
                      label="Shitverse"
                      {...a11yProps(2)}
                      style={{ width: '25%' }}
                    />
                    <Tab
                      label="Open Source"
                      {...a11yProps(2)}
                      style={{ width: '25%' }}
                    />
                  </Tabs>
                </Grid>
                <TabPanel value={value} index={0}>
                  <Typography
                    variant="body2"
                    style={{ fontSize: '15px', textAlign: 'left' }}
                  >
                    <Grid container rowSpacing={2} columnSpacing={2}>
                      <Grid item xs={12} xl={12}>
                        <Paper style={{ background: 'none', padding: '20px' }}>
                          3 Factor Authentication to interact
                        </Paper>
                      </Grid>
                      <Grid item xs={12} xl={12}>
                        <Paper style={{ background: 'none', padding: '20px' }}>
                          NFT membership authentication
                        </Paper>
                      </Grid>
                      <Grid item xs={12} xl={12}>
                        <Paper style={{ background: 'none', padding: '20px' }}>
                          Proposals can initiate the transfer of DAO funds from
                          Smart Wallet
                        </Paper>
                      </Grid>
                      <Grid item xs={12} xl={12} style={{ height: '100%' }}>
                        <Paper
                          style={{
                            background: 'none',
                            padding: '20px',
                            height: '100%',
                          }}
                        >
                          On chain voting and consensus mechanisms
                        </Paper>
                      </Grid>
                    </Grid>
                  </Typography>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <Typography variant="body2" style={{ textAlign: 'left' }}>
                        <Paper
                          style={{
                            background: 'none',
                            margin: '15px',
                            padding: '15px',
                          }}
                        >
                          A place for us to be the degenerates we are! Link and
                          build fam.
                        </Paper>
                        <Paper
                          style={{
                            background: 'none',
                            margin: '15px',
                            padding: '15px',
                          }}
                        >
                          3d in game VR staking
                        </Paper>
                        <Paper
                          style={{
                            background: 'none',
                            margin: '15px',
                            padding: '15px',
                          }}
                        >
                          Earn fed coin!
                        </Paper>
                        <Paper
                          style={{
                            background: 'none',
                            margin: '15px',
                            padding: '15px',
                          }}
                        >
                          ruin your life!
                        </Paper>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <img
                        src="/static/images/4242.jpg"
                        alt=""
                        style={{
                          width: '300px',
                          borderRadius: '10px',
                          margin: '10px',
                        }}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <img
                        src="/static/images/123.png"
                        alt="asdf"
                        style={{ width: '250px' }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Typography variant="body2" style={{ textAlign: 'left' }}>
                        <Paper
                          style={{
                            background: 'none',
                            margin: '15px',
                            padding: '15px',
                          }}
                        >
                          3D Characters for our Shitverse
                        </Paper>
                        <Paper
                          style={{
                            background: 'none',
                            margin: '15px',
                            padding: '15px',
                          }}
                        >
                          gen #0 will have 420 mints.
                        </Paper>
                        <Paper
                          style={{
                            background: 'none',
                            margin: '15px',
                            padding: '15px',
                          }}
                        >
                          10 exclusive 1 of 1 characters.
                        </Paper>
                        <Paper
                          style={{
                            background: 'none',
                            margin: '15px',
                            padding: '15px',
                          }}
                        >
                          Metadata Easter Eggs.
                        </Paper>
                      </Typography>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Paper
                    style={{
                      background: 'none',
                      margin: '15px',
                      padding: '15px',
                      textAlign: 'left',
                    }}
                  >
                    When our journey started with Solana we realized the tooling
                    available was minimal but the network was beautiful. This
                    simple outlook has led us down the rabbit hole of Solana
                    development and we have learned alot. We carry an intense
                    philosophy of transparency in our communication and in our
                    code. Publishing our works to the public is in our best
                    interest and we wish to share and collab with all of you as
                    we develop the space. It started with our Loyalty Rewards
                    program to reward NFT holders with airdrops. Today we are
                    working on the consensus validation for proposals for our
                    DAO program. With about 30 years combined blockchain
                    experience, its getting lit!
                  </Paper>
                </TabPanel>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default TabsDemo;
