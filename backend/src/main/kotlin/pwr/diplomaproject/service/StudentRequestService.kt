package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.ChangeRequestDto
import pwr.diplomaproject.model.dto.StudentRequestDto
import pwr.diplomaproject.model.dto.TopicChangeRequestDetailsDto
import pwr.diplomaproject.model.dto.TopicCorrectionRequestDetailsDto
import pwr.diplomaproject.model.dto.factory.ChangeRequestDtoFactory
import pwr.diplomaproject.model.dto.factory.StudentRequestDtoFactory
import pwr.diplomaproject.model.dto.factory.TopicChangeRequestDetailsDtoFactory
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.TopicChangeRequest
import pwr.diplomaproject.model.entity.TopicCorrectionRequest
import pwr.diplomaproject.model.enum.RequestResult
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.model.form.StudentTopicChangeRequestNewTopicForm
import pwr.diplomaproject.model.form.StudentTopicCorrectionRequestForm
import pwr.diplomaproject.model.notification.TopicCorrectionRequestCreatedByStudent
import pwr.diplomaproject.repository.*
import java.time.LocalDate
import javax.transaction.Transactional

@Service
class StudentRequestService @Autowired constructor(
    private val topicChangeRequestRepository: TopicChangeRequestRepository,
    private val topicRepository: TopicRepository,
    private val topicCorrectionRequestRepository: TopicCorrectionRequestRepository,
    private val studentRepository: StudentRepository,
    private val subjectRepository: SubjectRepository,
    private val employeeRepository: EmployeeRepository,
    private val notificationRepository: NotificationRepository,
) {

    fun getTopicChangeRequests(studentId: Long): List<StudentRequestDto> =
        topicChangeRequestRepository.findAllByStudentId(studentId)
            .map { StudentRequestDtoFactory.create(it) }

    fun getTopicChangeRequestDetails(id: Long): TopicChangeRequestDetailsDto =
        topicChangeRequestRepository.getById(id)
            .let { TopicChangeRequestDetailsDtoFactory.create(it) }

    fun getTopicCorrectionRequests(studentId: Long): List<StudentRequestDto> =
        topicCorrectionRequestRepository.findAllByStudentId(studentId)

    fun getTopicCorrectionRequestDetails(id: Long): TopicCorrectionRequestDetailsDto =
        topicCorrectionRequestRepository.getCorrectionRequestDetails(id)

    fun makeTopicChangeToExistingTopicRequest(studentId: Long, currentTopicId: Long, newTopicId: Long): ChangeRequestDto {
        val request = TopicChangeRequest(
            topicChangeRequestRepository.getNextId(),
            studentRepository.getById(studentId),
            null,
            subjectRepository.getById(currentTopicId),
            subjectRepository.getById(newTopicId),
            RequestResult.WAITING,
            LocalDate.now()
        )

        return ChangeRequestDtoFactory.create(topicChangeRequestRepository.save(request))
    }

    @Transactional
    fun makeTopicChangeToNewTopicRequest(
        studentId: Long,
        currentTopicId: Long,
        form: StudentTopicChangeRequestNewTopicForm
    ): ChangeRequestDto {
        val newSubject = Topic(
            subjectRepository.getNextId(),
            employeeRepository.getById(form.supervisorId),
            studentRepository.getById(studentId),
            subjectRepository.getById(currentTopicId).graduation,
            form.topic,
            form.description,
            1,
            TopicStatus.WAITING,
            null,
            true,
            LocalDate.now()
        )

        val savedSubject = subjectRepository.save(newSubject)

        val request = TopicChangeRequest(
            topicChangeRequestRepository.getNextId(),
            studentRepository.getById(studentId),
            null,
            subjectRepository.getById(currentTopicId),
            savedSubject,
            RequestResult.WAITING,
            LocalDate.now()
        )

        return ChangeRequestDtoFactory.create(topicChangeRequestRepository.save(request))
    }

    fun makeTopicCorrectionRequest(form: StudentTopicCorrectionRequestForm) {
        val student = studentRepository.getById(form.studentId)

        val oldTopic = topicRepository.getById(form.topicId)

        val request = TopicCorrectionRequest(
            topicCorrectionRequestRepository.getNextId(),
            student,
            null,
            RequestResult.WAITING,
            LocalDate.now(),
            form.newTopic,
            form.newDescription
        )

        topicCorrectionRequestRepository.save(request)
        TopicCorrectionRequestCreatedByStudent(
            listOf(oldTopic.lecturer.user),
            request,
            student.user,
            notificationRepository
        ).send()
    }

    fun cancelTopicChangeRequest(userId: Long, id: Long): Unit =
        topicChangeRequestRepository.getByStudentUserIdAndRequestId(userId, id).let {
            it.result = RequestResult.CANCELED_BY_STUDENT
            topicChangeRequestRepository.save(it)
        }

    fun cancelTopicCorrectionRequest(userId: Long, id: Long): Unit =
        topicCorrectionRequestRepository.getByStudentUserIdAndRequestId(userId, id).let {
            it.result = RequestResult.CANCELED_BY_STUDENT
            topicCorrectionRequestRepository.save(it)
        }
}