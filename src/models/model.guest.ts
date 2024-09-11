import { Guests } from '@prisma/client';
import { db } from '../lib/db';
import { DEFAULT_PAGE_SIZE } from '../lib/pagination';

export const getAllGuests = async () => {
  return await db.guests.findMany({});
};

export const getTotalGuest = async (start: Date | null, end: Date | null) => {
  const whereClause: any = {};

  if (start && end) {
    whereClause.createdAt = {
      gte: start,
      lt: end
    };
  } else if (start) {
    whereClause.createdAt = {
      gte: start
    };
  } else if (end) {
    whereClause.createdAt = {
      lt: end
    };
  }
  return await db.guests.count({
    where: whereClause
  });
};

export const getPaginatedGuests = async (page: number = 0) => {
  const [data, total] = await Promise.all([
    db.guests.findMany({
      skip: page * DEFAULT_PAGE_SIZE,
      take: DEFAULT_PAGE_SIZE,
      orderBy: {
        createdAt: 'desc'
      }
    }),
    db.guests.count()
  ]);

  return { data, total };
};

export const getFilteredGuests = async (
  name: string,
  start: Date | null,
  end: Date | null,
  page: number
) => {
  const whereClause: any = {};

  if (name) {
    whereClause.name = {
      contains: name
    };
  }

  if (start && end) {
    whereClause.createdAt = {
      gte: start,
      lt: end
    };
  } else if (start) {
    whereClause.createdAt = {
      gte: start
    };
  } else if (end) {
    whereClause.createdAt = {
      lt: end
    };
  }

  const [data, total] = await Promise.all([
    db.guests.findMany({
      where: whereClause,
      skip: page * 10,
      take: 10,
      orderBy: {
        createdAt: 'desc'
      }
    }),
    db.guests.count()
  ]);

  return { data, total };
};

export const getGuestById = async (id: string) => {
  return await db.guests.findUnique({
    where: {
      id: id
    }
  });
};

export const createGuest = async (data: Guests) => {
  return await db.guests.create({
    data: data
  });
};

export const updateGuest = async (id: string, data: Guests) => {
  return await db.guests.update({
    where: {
      id: id
    },
    data: data
  });
};

export const deleteGuest = async (id: string) => {
  return await db.guests.delete({
    where: {
      id: id
    }
  });
};
