import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </div>
  );
}

export default MyApp
