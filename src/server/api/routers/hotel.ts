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
          include: { images: true, facilities: true },
        });
        return hotels;
      }
      const hotels = await ctx.prisma.hotel.findMany({
        where: { city: input.city },
        include: { images: true, facilities: true },
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
        include: { images: true, facilities: true },
      });
      return hotels;
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.hotel.findUnique({
        where: { id: input.id },
        include: { images: true, facilities: true },
      });
    }),
  getImagesByHotelId: publicProcedure
    .input(z.object({ hotelId: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.images.findMany({
        where: { hotelId: input.hotelId },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const hotels = await ctx.prisma.hotel.findMany({ take: 25 });
    return hotels;
  }),
  getHotelPriceListById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const priceList = await ctx.prisma.hotel.findFirst({
        where: { id: input.id },
        select: {
          nonACOgPrice: true,
          nonACPrice: true,
          generalPrice: true,
          originalPrice: true,
          fourHourPrice: true,
          eightHourPrice: true,
          singleOccupancyNonAcPrice: true,
          singleOccupancyAcPrice: true,
          hotelGst: true,
          platformGst: true,
          platformFee: true,
        },
      });
      return priceList;
    }),
});
