import { HelmetProvider } from 'react-helmet-async';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ThemeProvider from '../src/theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { SidebarProvider } from '../src/contexts/SidebarContext';
import { RecoilRoot } from 'recoil';
import SuspenseLoader from '../src/components/SuspenseLoader';
import { Suspense, lazy } from 'react';
import Questing from '../src/content/pages/Questing';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Home = () => {
  return (
    <HelmetProvider>
      <SidebarProvider>
        <RecoilRoot>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              <Questing />
            </LocalizationProvider>
          </ThemeProvider>
        </RecoilRoot>
      </SidebarProvider>
    </HelmetProvider>
  );
};

export default Home;

