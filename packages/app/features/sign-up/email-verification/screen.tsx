/* this page is just one input for email verification */
import { useState } from 'react';
import { Button, Input, YStack } from '@my/ui';
import { useAuth, useSignUp } from 'app/utils/clerk';
import { useRouter } from 'solito/router';

export function EmailVerificationScreen() {
  const { push } = useRouter();
  const [verificationCode, setVerificationCode] = useState('');

  const { signUp, setSession } = useSignUp();

  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    push('/');
    return null;
  }

  if (!signUp) return null;

  const handleEmailVerificationOnPress = async () => {
    /* verify the email */
    try {
      const res = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      if (res.status === 'complete') {
        push('/');
        const { createdSessionId } = signUp;
        if (createdSessionId) {
          await setSession(createdSessionId);
        }
      } else alert('Invalid verification code');
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Input
        placeholder="Verification code"
        onChangeText={text => {
          setVerificationCode(text);
        }}
      />

      {/* button for submitting */}
      <Button
        onPress={() => {
          void handleEmailVerificationOnPress();
        }}
      >
        Submit
      </Button>
    </YStack>
  );
}
