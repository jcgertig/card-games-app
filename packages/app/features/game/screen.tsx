import { Button, Paragraph, YStack } from '@my/ui';
import { ChevronLeft } from '@tamagui/lucide-icons';
import * as React from 'react';
import { createParam } from 'solito';
import { useLink } from 'solito/link';

const { useParam } = createParam<{ roomId: string; gameId: string }>();

export function GameScreen() {
  const [roomId] = useParam('roomId');
  const [gameId] = useParam('gameId');
  const linkProps = useLink({ href: '/' });

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="800">{`Room ID: ${roomId || ''} & Game ID: ${
        gameId || ''
      }`}</Paragraph>
      <Button {...linkProps} icon={ChevronLeft} theme="gray">
        Go Home
      </Button>
    </YStack>
  );
}
