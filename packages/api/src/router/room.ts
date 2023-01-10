/* create user */
//grab the images for the corresponding user
// publicProcedure
import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const roomRouter = router({
  get: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.room.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      //create user and link it to the user
      return ctx.prisma.room.create({
        data: {
          name: input.name,
          createdByUserId: ctx.user.id,
        },
      });
    }),
});
