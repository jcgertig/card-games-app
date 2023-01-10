//grab the images for the corresponding user
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const gameRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        gameType: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      //create game and link it to the user
      return ctx.prisma.game.create({
        data: {
          roomId: input.roomId,
          createdByUserId: ctx.user.id,
          gameType: input.gameType,
        },
      });
    }),
});
