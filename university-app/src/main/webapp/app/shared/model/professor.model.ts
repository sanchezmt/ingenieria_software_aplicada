import dayjs from 'dayjs';

export interface IProfessor {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  hireDate?: dayjs.Dayjs;
}

export const defaultValue: Readonly<IProfessor> = {};
