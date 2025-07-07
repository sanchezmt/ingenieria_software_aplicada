package com.ar.edu.um.mtsanchez.service.mapper;

import com.ar.edu.um.mtsanchez.domain.Professor;
import com.ar.edu.um.mtsanchez.service.dto.ProfessorDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Professor} and its DTO {@link ProfessorDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProfessorMapper extends EntityMapper<ProfessorDTO, Professor> {}
