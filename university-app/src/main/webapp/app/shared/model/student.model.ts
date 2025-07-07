import dayjs from 'dayjs';

export interface IStudent {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  enrollmentDate?: dayjs.Dayjs;
}

export const defaultValue: Readonly<IStudent> = {};
