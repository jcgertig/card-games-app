import config from '../tamagui.config';
import { NavigationProvider } from './navigation'; //mobile only
import { TamaguiProvider, TamaguiProviderProps } from '@my/ui';
import { AuthProvider } from './auth';
import { TRPCProvider } from './trpc'; //mobile only

export function Provider({
  children,
  pageProps,
  ...rest
}: Omit<TamaguiProviderProps, 'config'> & { pageProps: any }) {
  return (
    <AuthProvider pageProps={pageProps}>
      <TamaguiProvider
        config={config}
        disableInjectCSS
        defaultTheme="light"
        {...rest}
      >
        <NavigationProvider>
          <TRPCProvider>{children}</TRPCProvider>
        </NavigationProvider>
      </TamaguiProvider>
    </AuthProvider>
  );
}
