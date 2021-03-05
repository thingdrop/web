import { formatDistance } from 'date-fns';

export const getTimeAgo = (dateTime: string): string => {
  return formatDistance(new Date(parseInt(dateTime, 10)), Date.now(), {
    addSuffix: true,
  });
};
