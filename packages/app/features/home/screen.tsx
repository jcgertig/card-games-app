import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  XStack,
  YStack,
} from '@my/ui';
import React, { useEffect } from 'react';
import { useLink } from 'solito/link';
import { trpc } from '../../utils/trpc';
import { SignedIn, SignedOut, useAuth } from '../../utils/clerk';
import { H3 } from 'tamagui'; // or @tamagui/card

export function HomeScreen() {
  const { signOut, userId } = useAuth();
  const userLinkProps = useLink({
    href: `/user/${userId || 'jcgertig'}`,
  });
  const signInLinkProps = useLink({
    href: '/sign-in',
  });
  const signUpLinkProps = useLink({
    href: '/sign-up',
  });

  const { data, isLoading, error } = trpc.game.all.useQuery();

  useEffect(() => {
    console.log(data);
  }, [isLoading]);
  /* 
  if (isLoading) {
    return <Paragraph>Loading...</Paragraph>
  } */

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600} px={'$3'}>
        <H1 ta="center">create-universal-app</H1>
        <Paragraph textAlign="left">
          This is a demo for create-universal-app. To read more about the
          philosophy behind it, visit{' '}
          <Anchor
            color="$color12"
            href="https://github.com/chen-rn/create-universal-app"
            target="_blank"
          >
            https://github.com/chen-rn/create-universal-app
          </Anchor>{' '}
          (give it a ⭐️ if you like it!)
        </Paragraph>
        <Paragraph>
          This template uses Expo, Next, Solito, tRPC, Tamagui, Clerk, and
          Prisma. If you're a beginner and is a little overwhelmed, I've also
          made a{' '}
          <Anchor
            color="$color12"
            href="https://youtu.be/aTEv0-ZBbWk"
            target="_blank"
          >
            video
          </Anchor>{' '}
          explanation on how this template works and how to get started!
        </Paragraph>
        <Separator />
      </YStack>

      <H3 ta="center">Some Demos</H3>
      <YStack p={'$2'}>
        <Paragraph>tRPC Query Demo</Paragraph>
        {data?.map(entry => (
          <Paragraph opacity={0.5} key={entry.id}>
            {entry.id}
          </Paragraph>
        ))}
      </YStack>

      <XStack space>
        <Button {...userLinkProps} theme={'gray'}>
          User Page(Routing)
        </Button>
      </XStack>

      <SignedOut>
        <XStack space ai="center">
          <Button {...signInLinkProps} theme={'gray'}>
            Sign In(Clerk)
          </Button>
          <Button {...signUpLinkProps} theme={'gray'}>
            Sign Up(Clerk)
          </Button>
        </XStack>
      </SignedOut>

      <SignedIn>
        <Button
          onPress={() => {
            void signOut();
          }}
          theme={'red'}
        >
          Sign Out
        </Button>
      </SignedIn>
    </YStack>
  );
}
