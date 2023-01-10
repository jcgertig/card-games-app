import { router } from '../trpc';
import { gameRouter } from './game';
import { authRouter } from './auth';
import { roomRouter } from './room';
import { userRouter } from './user';

export const appRouter = router({
  game: gameRouter,
  room: roomRouter,
  auth: authRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
