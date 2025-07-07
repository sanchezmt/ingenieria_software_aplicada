package com.ar.edu.um.mtsanchez.service.mapper;

import com.ar.edu.um.mtsanchez.domain.Course;
import com.ar.edu.um.mtsanchez.domain.Professor;
import com.ar.edu.um.mtsanchez.service.dto.CourseDTO;
import com.ar.edu.um.mtsanchez.service.dto.ProfessorDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Course} and its DTO {@link CourseDTO}.
 */
@Mapper(componentModel = "spring")
public interface CourseMapper extends EntityMapper<CourseDTO, Course> {
    @Mapping(target = "professor", source = "professor", qualifiedByName = "professorFirstName")
    CourseDTO toDto(Course s);

    @Named("professorFirstName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    ProfessorDTO toDtoProfessorFirstName(Professor professor);
}
