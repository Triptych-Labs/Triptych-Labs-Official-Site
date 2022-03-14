import { MintApp } from './MintApp';
import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import {
  Box,
} from '@mui/material';

import { styled } from '@mui/material/styles';

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:${theme.colors.alpha.black}
`,
);


function Artifacts() {
  return (
    <MainContent
      style={{
        backgroundImage: 'url(/static/images/1.png)',
        backgroundPosition: '-20% 15%',
        backgroundSize: '',
      }}
    >
      <MintApp />
    </MainContent>
  );
}

export default Artifacts;
