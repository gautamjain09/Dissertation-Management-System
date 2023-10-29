package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.factory.SubjectDetailsDtoFactory
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.repository.SubjectRepository

@Service
class SubjectService @Autowired constructor(
    private val subjectRepository: SubjectRepository
) {

    fun findAllByStatuses(vararg statuses: TopicStatus): List<Topic> =
        subjectRepository.findAllByStatusIsIn(statuses.toList())

    fun getDetails(subjectId: Long): SubjectDetailsDto =
        SubjectDetailsDtoFactory.create(subjectRepository.getById(subjectId))

//    @Cacheable(
//        value = ["subjects"],
//        key = "{#status, #graduationId, #studentId}"
//    )
    fun getSubjects(status: TopicStatus?, graduationId: Long?, studentId: Long?, supervisorId: Long?): List<SubjectDetailsDto> =
        subjectRepository.findAllByParams(status, graduationId, studentId, supervisorId)
            .map { SubjectDetailsDtoFactory.create(it) }
}