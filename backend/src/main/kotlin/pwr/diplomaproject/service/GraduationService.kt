package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.DiplomaSessionDto
import pwr.diplomaproject.model.dto.factory.DiplomaSessionDtoFactory
import pwr.diplomaproject.repository.GraduationRepository

@Service
class GraduationService @Autowired constructor(
    private val graduationRepository: GraduationRepository
) {

    fun getById(graduationId: Long): DiplomaSessionDto =
        graduationRepository.getWithScheduleById(graduationId)
            .let { DiplomaSessionDtoFactory.create(it.first, it.second) }

    fun getByCourseOfStudyIdOrFacultyId(courseOfStudyId: Long?, facultyId: Long?): List<DiplomaSessionDto> =
        graduationRepository.findAllWithScheduleByCourseOfStudyIdOrFacultyId(courseOfStudyId, facultyId)
            .map { DiplomaSessionDtoFactory.create(it.first, it.second) }
}