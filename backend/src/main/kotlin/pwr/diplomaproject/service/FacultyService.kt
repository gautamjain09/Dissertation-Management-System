package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.DepartmentDto
import pwr.diplomaproject.model.dto.factory.DepartmentDtoFactory
import pwr.diplomaproject.repository.FacultyRepository

@Service
class FacultyService @Autowired constructor(
    private val facultyRepository: FacultyRepository
) {

    fun getById(facultyId: Long): DepartmentDto =
        facultyRepository.getById(facultyId)
            .let { DepartmentDtoFactory.create(it) }

    fun getAll(): List<DepartmentDto> =
        facultyRepository.findAll()
            .map { DepartmentDtoFactory.create(it) }
}