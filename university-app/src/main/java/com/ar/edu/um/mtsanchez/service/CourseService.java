package com.ar.edu.um.mtsanchez.service;

import com.ar.edu.um.mtsanchez.service.dto.CourseDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ar.edu.um.mtsanchez.domain.Course}.
 */
public interface CourseService {
    /**
     * Save a course.
     *
     * @param courseDTO the entity to save.
     * @return the persisted entity.
     */
    CourseDTO save(CourseDTO courseDTO);

    /**
     * Updates a course.
     *
     * @param courseDTO the entity to update.
     * @return the persisted entity.
     */
    CourseDTO update(CourseDTO courseDTO);

    /**
     * Partially updates a course.
     *
     * @param courseDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CourseDTO> partialUpdate(CourseDTO courseDTO);

    /**
     * Get all the courses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CourseDTO> findAll(Pageable pageable);

    /**
     * Get all the courses with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CourseDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" course.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CourseDTO> findOne(Long id);

    /**
     * Delete the "id" course.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
