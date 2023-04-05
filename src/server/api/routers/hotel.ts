import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const hotelRouter = createTRPCRouter({
  getAllByCity: publicProcedure
    .input(z.object({ city: z.string() }))
    .query(async ({ input, ctx }) => {
      const hotels = await ctx.prisma.hotel.findMany({
        where: { city: input.city },
      });
      return hotels;
    }),
  getAllByDistrict: publicProcedure
    .input(z.object({ district: z.string().array() }))
    .query(async ({ input, ctx }) => {
      const hotels = await ctx.prisma.hotel.findMany({
        where: {
          district: { in: input.district },
        },
      });
      return hotels;
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.hotel.findUnique({
        where: { id: input.id },
      });
    }),
});
