import { MintApp } from './MintApp';
import React, { FC, ReactNode, useState, useEffect } from 'react';
import { Box } from '@mui/material';

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

function useScript(src) {
  // Keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = useState(src ? 'loading' : 'idle');
  useEffect(
    () => {
      if (!WebAssembly.instantiateStreaming) {
        // polyfill
        // @ts-ignore
        WebAssembly.instantiateStreaming = async (resp, importObject) => {
          return await WebAssembly.instantiate(resp, importObject);
        };
      }
      // @ts-ignore
      const go = new Go();
      // @ts-ignore
      let mod, inst;
      async function goInit() {
        try {
          const bytes = await fetch('/someplace.wasm');
          const result = await WebAssembly.instantiateStreaming(
            bytes,
            go.importObject,
          );
          mod = result.module;
          inst = result.instance;
          go.run(inst);
          setStatus('ready');
        } catch (err) {
          console.error(err);
          setStatus('error');
        }
      }

      goInit();
    },
    [src], // Only re-run effect if script src changes
  );
  return status;
}

function Artifacts() {
  const goWasm = useScript('https://triptychlabs.io:4445/wasm-load.js');

  return (
    <MainContent
      style={{
        backgroundImage: 'url(/static/images/1.png)',
        backgroundPosition: '-20% 15%',
        backgroundSize: '',
      }}
    >
      {goWasm === 'ready' && <MintApp />}
    </MainContent>
  );
}

export default Artifacts;
