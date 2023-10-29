package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.RequestDto
import pwr.diplomaproject.model.dto.TopicCorrectionRequestDetailsDto
import pwr.diplomaproject.model.dto.factory.DeanRequestDtoFactory
import pwr.diplomaproject.model.entity.Employee
import pwr.diplomaproject.model.enum.EmployeeType
import pwr.diplomaproject.model.enum.RequestResult
import pwr.diplomaproject.model.notification.TopicCorrectionRequestResolvedByDean
import pwr.diplomaproject.repository.EmployeeRepository
import pwr.diplomaproject.repository.NotificationRepository
import pwr.diplomaproject.repository.SubjectRepository
import pwr.diplomaproject.repository.TopicCorrectionRequestRepository
import javax.transaction.Transactional

@Service
class DeanCorrectionRequestService @Autowired constructor(
    private val topicCorrectionRequestRepository: TopicCorrectionRequestRepository,
    private val subjectRepository: SubjectRepository,
    private val employeeRepository: EmployeeRepository,
    private val notificationRepository: NotificationRepository,
) {

    fun getCorrectionRequestsToConsider(): List<RequestDto> =
        topicCorrectionRequestRepository.findAllByResultIn(listOf(RequestResult.WAITING))
            .map { DeanRequestDtoFactory.create(it) }

    fun getCorrectionRequestsConsidered(): List<RequestDto> =
        topicCorrectionRequestRepository.findAllByResultIn(listOf(RequestResult.DISMISSED, RequestResult.APPROVED))
            .map { DeanRequestDtoFactory.create(it) }

    fun getCorrectionRequest(id: Long): TopicCorrectionRequestDetailsDto =
        topicCorrectionRequestRepository.getCorrectionRequestDetails(id)

    @Transactional
    fun acceptCorrectionRequest(userId: Long, id: Long): Unit =
        topicCorrectionRequestRepository.getById(id).let {
            it.result = RequestResult.APPROVED
            it.employee = dean(userId)

            subjectRepository.getByCorrectionRequestId(id).let { topic ->
                topic.topic = it.newTopic
                topic.description = it.newDescription
                subjectRepository.save(topic)
            }

            topicCorrectionRequestRepository.save(it)

            TopicCorrectionRequestResolvedByDean(listOf(it.student.user), it, notificationRepository)
        }

    fun rejectCorrectionRequest(userId: Long, id: Long): Unit =
        topicCorrectionRequestRepository.getById(id).let {
            it.result = RequestResult.DISMISSED
            it.employee = dean(userId)
            topicCorrectionRequestRepository.save(it)

            TopicCorrectionRequestResolvedByDean(listOf(it.student.user), it, notificationRepository)
        }

    private fun dean(userId: Long): Employee =
        employeeRepository.getEmployeeByUserIdAndType(userId, EmployeeType.DEAN)
}