package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.ChangeRequestDto
import pwr.diplomaproject.model.dto.ClarificationRequestDto
import pwr.diplomaproject.model.dto.factory.ChangeRequestDtoFactory
import pwr.diplomaproject.model.dto.factory.ClarificationRequestDtoFactory
import pwr.diplomaproject.model.enum.RequestResult
import pwr.diplomaproject.repository.TopicChangeRequestRepository
import pwr.diplomaproject.repository.TopicCorrectionRequestRepository

@Service
class RequestService @Autowired constructor(
    private val topicCorrectionRequestRepository: TopicCorrectionRequestRepository,
    private val topicChangeRequestRepository: TopicChangeRequestRepository
){

    fun getClarificationRequestById(requestId: Long): ClarificationRequestDto =
        topicCorrectionRequestRepository.getRequestAndTopicById(requestId)
            .let { ClarificationRequestDtoFactory.create(it.first, it.second) }

    fun getClarificationRequestsByGraduationOrStudentOrEmployeeOrStatus(
        graduationId: Long?,
        studentId: Long?,
        employeeId: Long?,
        status: RequestResult?): List<ClarificationRequestDto> =
        topicCorrectionRequestRepository.findAllByGraduationOrStudentOrEmployeeOrStatus(graduationId, studentId, employeeId, status)
            .map { ClarificationRequestDtoFactory.create(it.first, it.second) }

    fun getChangeRequestById(requestId: Long): ChangeRequestDto =
        topicChangeRequestRepository.getById(requestId)
            .let { ChangeRequestDtoFactory.create(it) }

    fun getChangeRequestsByGraduationOrStudentOrEmployeeOrStatus(
        graduationId: Long?,
        studentId: Long?,
        employeeId: Long?,
        status: RequestResult?): List<ChangeRequestDto> =
        topicChangeRequestRepository.findAllByGraduationOrStudentOrEmployeeOrStatus(graduationId, studentId, employeeId, status)
            .map { ChangeRequestDtoFactory.create(it) }
}