import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { clerkClient } from '@clerk/nextjs/server';

export const userRouter = router({
  search: protectedProcedure.input(z.string()).query(({ input }) => {
    return clerkClient.users.getUserList({ query: input, limit: 10 });
  }),
});
