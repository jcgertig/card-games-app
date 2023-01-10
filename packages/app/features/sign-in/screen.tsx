import { YStack } from '@my/ui';
import { useAuth, useSignIn } from 'app/utils/clerk';
import { OAuthStrategy } from '@clerk/types';
import { useRouter } from 'solito/router';
import { SignUpSignInComponent } from '@my/ui/src/components/SignUpSignIn';
import { handleOAuthSignIn } from 'app/utils/auth';

export function SignInScreen() {
  const { push } = useRouter();

  const { isLoaded, signIn, setSession } = useSignIn();

  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    push('/');
    return null;
  }

  if (!setSession) return null;
  if (!isLoaded) return null;

  const redirectIfSignedIn = () => {
    if (signIn.status == 'complete') {
      push('/');
    }
  };

  const handleOAuthSignInWithPress = async (strategy: OAuthStrategy) => {
    await handleOAuthSignIn(strategy, setSession, signIn);
    redirectIfSignedIn();
  };

  const handleEmailSignInWithPress = async (
    identifier: string,
    password: string
  ) => {
    await signIn.create({ identifier, password });
    redirectIfSignedIn();
  };

  return (
    <YStack f={1} jc="center" ai="center" space>
      <SignUpSignInComponent
        type="sign-in"
        handleOAuthWithPress={handleOAuthSignInWithPress}
        handleEmailWithPress={handleEmailSignInWithPress}
      />
    </YStack>
  );
}
