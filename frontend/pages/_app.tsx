import type { AppProps } from 'next/app';
import React from 'react';

interface MyAppProps extends AppProps {
  session: any; // Puedes ajustar el tipo de 'session' según tus necesidades específicas
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
      <Component {...pageProps} />
  );
}

export default MyApp;
