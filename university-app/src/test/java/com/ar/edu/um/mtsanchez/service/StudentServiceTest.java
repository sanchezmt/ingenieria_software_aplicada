package com.ar.edu.um.mtsanchez.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

import com.ar.edu.um.mtsanchez.domain.Student;
import com.ar.edu.um.mtsanchez.repository.StudentRepository;
import com.ar.edu.um.mtsanchez.service.dto.StudentDTO;
import com.ar.edu.um.mtsanchez.service.impl.StudentServiceImpl;
import com.ar.edu.um.mtsanchez.service.mapper.StudentMapper;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private StudentMapper studentMapper;

    private StudentService studentService;

    @BeforeEach
    void setUp() {
        studentService = new StudentServiceImpl(studentRepository, studentMapper);
    }

    @Test
    void saveShouldPersistStudent() {
        StudentDTO dto = createDto(1L);
        Student entity = new Student().id(1L);

        when(studentMapper.toEntity(dto)).thenReturn(entity);
        when(studentRepository.save(entity)).thenReturn(entity);
        when(studentMapper.toDto(entity)).thenReturn(dto);

        StudentDTO result = studentService.save(dto);

        assertThat(result).isEqualTo(dto);
        verify(studentRepository).save(entity);
    }

    @Test
    void findOneShouldReturnStudent() {
        StudentDTO dto = createDto(1L);
        Student entity = new Student().id(1L);

        when(studentRepository.findById(1L)).thenReturn(Optional.of(entity));
        when(studentMapper.toDto(entity)).thenReturn(dto);

        Optional<StudentDTO> result = studentService.findOne(1L);

        assertThat(result).contains(dto);
    }

    @Test
    void findAllShouldReturnPageOfStudents() {
        Student entity = new Student().id(1L);
        StudentDTO dto = createDto(1L);
        Page<Student> page = new PageImpl<>(List.of(entity));
        Pageable pageable = PageRequest.of(0, 20);

        when(studentRepository.findAll(pageable)).thenReturn(page);
        when(studentMapper.toDto(entity)).thenReturn(dto);

        Page<StudentDTO> result = studentService.findAll(pageable);

        assertThat(result.getContent()).containsExactly(dto);
    }

    @Test
    void deleteShouldInvokeRepository() {
        studentService.delete(1L);
        verify(studentRepository).deleteById(1L);
    }

    @Test
    void partialUpdateShouldUpdateExistingStudent() {
        StudentDTO dto = createDto(1L);
        Student entity = new Student().id(1L);

        when(studentRepository.findById(1L)).thenReturn(Optional.of(entity));
        when(studentRepository.save(entity)).thenReturn(entity);
        when(studentMapper.toDto(entity)).thenReturn(dto);
        doNothing().when(studentMapper).partialUpdate(entity, dto);

        Optional<StudentDTO> result = studentService.partialUpdate(dto);

        assertThat(result).contains(dto);
        verify(studentRepository).findById(1L);
        verify(studentRepository).save(entity);
        verify(studentMapper).partialUpdate(entity, dto);
    }

    private static StudentDTO createDto(Long id) {
        StudentDTO dto = new StudentDTO();
        dto.setId(id);
        dto.setFirstName("First");
        dto.setLastName("Last");
        dto.setEmail("email@example.com");
        dto.setEnrollmentDate(LocalDate.now());
        return dto;
    }
}
