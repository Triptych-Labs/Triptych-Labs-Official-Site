import { createStyles, makeStyles } from '@mui/styles';
import { proposals } from 'src/content/pages/Apps/DAO/atoms/proposals';
import { styled } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import ProposalLayout from 'src/content/pages/Apps/DAO/components/ProposalLayout';
import { ChangeEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import { Container, Grid, Tab, Tabs } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import TeamOverview from './TeamOverview';
import TasksAnalytics from './TasksAnalytics';
import Performance from './Performance';
import Projects from './Projects';
import Checklist from './Checklist';
import Profile from './Profile';
import DAOProposals from 'src/content/pages/Apps/DAO/components/Proposals';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function DashboardTasks() {
  const [proposalsState, setProposals] = useRecoilState(proposals);
  const [currentTab, setCurrentTab] = useState<string>('analytics');

  const tabs = [
    { value: 'analytics', label: 'Governance Dashboard' },
    { value: 'taskSearch', label: 'Proposals' },
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    if (value === 'analytics') setProposals([]);
    setCurrentTab(value);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexGrow: 'inherit',
          alignItems: 'center',
          width: '100vw',
        }}
      >
        <div>
          <ProposalLayout />
        </div>
        <div style={{ flexGrow: 1 }}>
          <PageTitleWrapper>
            <PageHeader />
          </PageTitleWrapper>
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12}>
                <Tabs
                  onChange={handleTabsChange}
                  value={currentTab}
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>
              </Grid>
              {currentTab === 'analytics' && (
                <>
                  <Grid item xs={12} sm={6} md={8}>
                    <TasksAnalytics />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Performance />
                  </Grid>
                  <Grid item xs={12}>
                    <Projects />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Checklist />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Profile />
                  </Grid>
                </>
              )}
              {currentTab === 'taskSearch' && (
                <Grid item xs={12}>
                  <DAOProposals />
                </Grid>
              )}
            </Grid>
          </Container>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default DashboardTasks;
