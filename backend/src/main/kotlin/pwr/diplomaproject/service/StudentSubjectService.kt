package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.StudentSubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.dto.factory.StudentSubjectDetailsDtoFactory
import pwr.diplomaproject.model.dto.factory.SubjectDetailsDtoFactory
import pwr.diplomaproject.model.dto.factory.SubjectDtoFactory
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.model.form.NewSubjectForm
import pwr.diplomaproject.model.notification.SubjectProposedByStudent
import pwr.diplomaproject.model.notification.SubjectPropositionDeletedByStudent
import pwr.diplomaproject.repository.*
import java.time.LocalDate

@Service
class StudentSubjectService @Autowired constructor(
    private val topicRepository: TopicRepository,
    private val subjectRepository: SubjectRepository,
    private val employeeRepository: EmployeeRepository,
    private val studentRepository: StudentRepository,
    private val graduationRepository: GraduationRepository,
    private val notificationRepository: NotificationRepository,
) {
    fun getAvailableSubjects(studentId: Long, graduationId: Long): List<SubjectDto> =
        topicRepository.findAllByGraduationAvailableForStudent(studentId, graduationId).map {
            SubjectDtoFactory.create(it)
        }

    fun getProposedSubjects(studentId: Long, graduationId: Long): List<SubjectDto> =
        topicRepository.findAllByStudentAndGraduation(studentId, graduationId).map {
            SubjectDtoFactory.create(it)
        }

    fun getSubject(id: Long): StudentSubjectDetailsDto =
        StudentSubjectDetailsDtoFactory.create(topicRepository.findByIdOrNull(id)!!)

    fun proposeSubject(form: NewSubjectForm): SubjectDetailsDto {
        val student = studentRepository.getById(form.authorStudentId!!)
        val employee = employeeRepository.getById(form.supervisorId)

        val newSubject = Topic(
            subjectRepository.getNextId(),
            employee,
            student,
            graduationRepository.getById(form.diplomaSessionId),
            form.topic,
            form.description,
            form.numberOfStudents,
            TopicStatus.PROPOSED_BY_STUDENT,
            null,
            true,
            LocalDate.now()
        )

        SubjectProposedByStudent(listOf(employee.user), newSubject, student.user, notificationRepository).send()

        return SubjectDetailsDtoFactory.create(subjectRepository.save(newSubject))
    }

    fun deleteProposedSubject(userId: Long, subjectId: Long) {
        val subject = topicRepository.getById(subjectId)
        if (subject.status == TopicStatus.PROPOSED_BY_STUDENT && subject.student!!.user.id == userId) {
            SubjectPropositionDeletedByStudent(
                listOf(subject.lecturer.user),
                subject,
                subject.student.user,
                notificationRepository
            ).send()
            topicRepository.delete(subject)
        }
    }
}
