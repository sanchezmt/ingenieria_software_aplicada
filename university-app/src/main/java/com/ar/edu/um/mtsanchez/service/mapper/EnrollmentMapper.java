package com.ar.edu.um.mtsanchez.service.mapper;

import com.ar.edu.um.mtsanchez.domain.Course;
import com.ar.edu.um.mtsanchez.domain.Enrollment;
import com.ar.edu.um.mtsanchez.domain.Student;
import com.ar.edu.um.mtsanchez.service.dto.CourseDTO;
import com.ar.edu.um.mtsanchez.service.dto.EnrollmentDTO;
import com.ar.edu.um.mtsanchez.service.dto.StudentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Enrollment} and its DTO {@link EnrollmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface EnrollmentMapper extends EntityMapper<EnrollmentDTO, Enrollment> {
    @Mapping(target = "student", source = "student", qualifiedByName = "studentFirstName")
    @Mapping(target = "course", source = "course", qualifiedByName = "courseTitle")
    EnrollmentDTO toDto(Enrollment s);

    @Named("studentFirstName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    StudentDTO toDtoStudentFirstName(Student student);

    @Named("courseTitle")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    CourseDTO toDtoCourseTitle(Course course);
}
