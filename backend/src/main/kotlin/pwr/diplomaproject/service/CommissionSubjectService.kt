package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.dto.factory.SubjectDetailsDtoFactory
import pwr.diplomaproject.model.dto.factory.SubjectDtoFactory
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.repository.SubjectRepository

@Service
class CommissionSubjectService @Autowired constructor(
    private val subjectService: SubjectService,
    private val subjectRepository: SubjectRepository
){

    companion object {

        private val VERIFIED_STATUSES = arrayOf(
            TopicStatus.APPROVED_BY_COMMITTEE,
            TopicStatus.REJECTED_BY_COMMITTEE
        )
    }

    fun getSubjectsToVerify(): List<SubjectDto> =
        subjectService.findAllByStatuses(TopicStatus.APPROVED_BY_COORDINATOR)
            .map { SubjectDtoFactory.create(it) }

    fun getSubjectsVerified(): List<SubjectDto> =
        subjectService.findAllByStatuses(*VERIFIED_STATUSES)
            .map { SubjectDtoFactory.create(it) }

    fun getSubject(id: Long): SubjectDetailsDto =
        subjectService.getDetails(id)

    fun acceptSubject(id: Long): SubjectDetailsDto =
        subjectRepository.getById(id).let {
            it.status = TopicStatus.APPROVED_BY_COMMITTEE
            subjectRepository.save(it)
            SubjectDetailsDtoFactory.create(it)
        }

    fun rejectSubject(id: Long): SubjectDetailsDto =
        subjectRepository.getById(id).let {
            it.status = TopicStatus.REJECTED_BY_COMMITTEE
            subjectRepository.save(it)
            SubjectDetailsDtoFactory.create(it)
        }
}