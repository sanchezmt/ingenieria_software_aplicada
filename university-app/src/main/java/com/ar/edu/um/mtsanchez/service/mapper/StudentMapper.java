package com.ar.edu.um.mtsanchez.service.mapper;

import com.ar.edu.um.mtsanchez.domain.Student;
import com.ar.edu.um.mtsanchez.service.dto.StudentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Student} and its DTO {@link StudentDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {}
