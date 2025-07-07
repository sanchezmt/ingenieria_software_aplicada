import dayjs from 'dayjs';
import { IStudent } from 'app/shared/model/student.model';
import { ICourse } from 'app/shared/model/course.model';

export interface IEnrollment {
  id?: number;
  enrollmentDate?: dayjs.Dayjs;
  grade?: number | null;
  student?: IStudent | null;
  course?: ICourse | null;
}

export const defaultValue: Readonly<IEnrollment> = {};
