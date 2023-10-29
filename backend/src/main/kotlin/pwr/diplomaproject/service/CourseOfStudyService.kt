package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.FieldOfStudyDto
import pwr.diplomaproject.model.dto.factory.FieldOfStudyDtoFactory
import pwr.diplomaproject.repository.CourseOfStudyRepository

@Service
class CourseOfStudyService @Autowired constructor(
    private val courseOfStudyRepository: CourseOfStudyRepository
){

    fun getById(courseOfStudyId: Long): FieldOfStudyDto =
        courseOfStudyRepository.getById(courseOfStudyId)
            .let { FieldOfStudyDtoFactory.create(it) }

    fun getAll(): List<FieldOfStudyDto> =
        courseOfStudyRepository.findAll()
            .map { FieldOfStudyDtoFactory.create(it) }
}