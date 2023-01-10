/* eslint-disable node/no-extraneous-import */
import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { Provider } from 'app/provider';
import Head from 'next/head';
import * as React from 'react';
import type { SolitoAppProps } from 'solito';
import 'raf/polyfill';
import { trpc } from 'app/utils/trpc.web';

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Universal Example</title>
        <meta name="description" content="Tamagui, Solito, Expo & Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider pageProps={pageProps}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

function ThemeProvider({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  const [theme, setTheme] = useRootTheme();

  return (
    <NextThemeProvider onChangeTheme={setTheme}>
      <Provider
        pageProps={pageProps}
        disableRootThemeClass
        defaultTheme={theme}
      >
        {children}
      </Provider>
    </NextThemeProvider>
  );
}

export default trpc.withTRPC(MyApp);
