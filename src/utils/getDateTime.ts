import { format } from 'date-fns';

export const getDateTime = (dateTime: string): string =>
  format(new Date(parseInt(dateTime, 10)), 'yyyy-MM-dd');
