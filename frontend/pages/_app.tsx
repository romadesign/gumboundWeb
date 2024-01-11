import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface MyAppProps extends AppProps {
  session: any; // Puedes ajustar el tipo de 'session' según tus necesidades específicas
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
