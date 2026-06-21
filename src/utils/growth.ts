import { format } from "date-fns";

export const getYearEntries = (user: any, year: string) => {
  if (!user?.data?.[year]) {
    return [];
  }

  return Object.entries(user.data[year])
    .map(([id, value]: any) => ({
      id,
      ...value,
    }))
    .sort((a: any, b: any) => a.createdAt.seconds - b.createdAt.seconds);
};

export const getMonthName = (timestamp: any) => {
  return format(timestamp.toDate(), "MMMM yyyy");
};
