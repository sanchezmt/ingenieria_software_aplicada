package com.ar.edu.um.mtsanchez.service.mapper;

import static com.ar.edu.um.mtsanchez.domain.ProfessorAsserts.*;
import static com.ar.edu.um.mtsanchez.domain.ProfessorTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ProfessorMapperTest {

    private ProfessorMapper professorMapper;

    @BeforeEach
    void setUp() {
        professorMapper = new ProfessorMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getProfessorSample1();
        var actual = professorMapper.toEntity(professorMapper.toDto(expected));
        assertProfessorAllPropertiesEquals(expected, actual);
    }
}
