import { IProfessor } from 'app/shared/model/professor.model';

export interface ICourse {
  id?: number;
  title?: string;
  description?: string | null;
  credits?: number;
  professor?: IProfessor | null;
}

export const defaultValue: Readonly<ICourse> = {};
