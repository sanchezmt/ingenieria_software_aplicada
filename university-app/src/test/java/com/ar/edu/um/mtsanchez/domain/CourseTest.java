package com.ar.edu.um.mtsanchez.domain;

import static com.ar.edu.um.mtsanchez.domain.CourseTestSamples.*;
import static com.ar.edu.um.mtsanchez.domain.ProfessorTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.ar.edu.um.mtsanchez.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CourseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Course.class);
        Course course1 = getCourseSample1();
        Course course2 = new Course();
        assertThat(course1).isNotEqualTo(course2);

        course2.setId(course1.getId());
        assertThat(course1).isEqualTo(course2);

        course2 = getCourseSample2();
        assertThat(course1).isNotEqualTo(course2);
    }

    @Test
    void professorTest() {
        Course course = getCourseRandomSampleGenerator();
        Professor professorBack = getProfessorRandomSampleGenerator();

        course.setProfessor(professorBack);
        assertThat(course.getProfessor()).isEqualTo(professorBack);

        course.professor(null);
        assertThat(course.getProfessor()).isNull();
    }
}
