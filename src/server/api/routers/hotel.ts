import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { HOURLY_HOTEL } from "@/utils/constants";

export const hotelRouter = createTRPCRouter({
  getAllByCity: publicProcedure
    .input(z.object({ city: z.string(), hotelType: z.string() }))
    .query(async ({ input, ctx }) => {
      if (input.hotelType === HOURLY_HOTEL) {
        const hotels = await ctx.prisma.hotel.findMany({
          where: { city: input.city, hotelType: input.hotelType },
          include: { images: true },
        });
        return hotels;
      }
      const hotels = await ctx.prisma.hotel.findMany({
        where: { city: input.city },
        include: { images: true },
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
        include: { images: true },
      });
      return hotels;
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.hotel.findUnique({
        where: { id: input.id },
        include: { images: true, roomType: true },
      });
    }),
  getImagesByHotelId: publicProcedure
    .input(z.object({ hotelId: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.images.findMany({
        where: { hotelId: input.hotelId },
      });
    }),
});
