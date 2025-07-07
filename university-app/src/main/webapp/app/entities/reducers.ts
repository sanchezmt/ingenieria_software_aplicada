import student from 'app/entities/student/student.reducer';
import professor from 'app/entities/professor/professor.reducer';
import course from 'app/entities/course/course.reducer';
import enrollment from 'app/entities/enrollment/enrollment.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  student,
  professor,
  course,
  enrollment,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
