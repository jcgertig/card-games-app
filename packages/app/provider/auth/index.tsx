import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from './cache';

const clerk_frontend_api = 'clerk.magnetic.tahr-3.lcl.dev';

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  return (
    <ClerkProvider frontendApi={clerk_frontend_api} tokenCache={tokenCache}>
      {children}
    </ClerkProvider>
  );
}
