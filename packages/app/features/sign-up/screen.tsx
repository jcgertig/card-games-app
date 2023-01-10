import { YStack } from '@my/ui';
import { handleOAuthSignUp } from 'app/utils/auth';
import { useSignUp, useAuth } from 'app/utils/clerk';
import { OAuthStrategy } from '@clerk/types';
import { useRouter } from 'solito/router';
import { SignUpSignInComponent } from '@my/ui/src/components/SignUpSignIn';

export function SignUpScreen() {
  const { push } = useRouter();
  const { isLoaded, signUp, setSession } = useSignUp();

  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    push('/');
    return null;
  }

  if (!setSession) return null;
  if (!isLoaded) return null;

  const handleOAuthSignUpWithPress = async (strategy: OAuthStrategy) => {
    await handleOAuthSignUp(strategy, setSession, signUp);
    if (signUp.status == 'complete') {
      push('/');
    }
  };

  const handleEmailSignUpWithPress = async (emailAddress, password) => {
    await signUp.create({
      emailAddress,
      password,
    });

    await signUp.prepareEmailAddressVerification();
    push('/sign-up/email-verification');
  };

  return (
    <YStack f={1} jc="center" ai="center" space>
      <SignUpSignInComponent
        type="sign-up"
        handleOAuthWithPress={handleOAuthSignUpWithPress}
        handleEmailWithPress={handleEmailSignUpWithPress}
      />
    </YStack>
  );
}
