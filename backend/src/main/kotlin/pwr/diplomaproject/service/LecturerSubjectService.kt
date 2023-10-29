package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.LecturerSubjectToCorrectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.dto.factory.LecturerSubjectToCorrectDetailsDtoFactory
import pwr.diplomaproject.model.dto.factory.SubjectDetailsDtoFactory
import pwr.diplomaproject.model.dto.factory.SubjectDtoFactory
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.EmployeeType
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.model.form.LecturerTopicCorrectionForm
import pwr.diplomaproject.model.form.NewSubjectForm
import pwr.diplomaproject.model.notification.SubjectPropositionResolvedByLecturer
import pwr.diplomaproject.repository.EmployeeRepository
import pwr.diplomaproject.repository.GraduationRepository
import pwr.diplomaproject.repository.NotificationRepository
import pwr.diplomaproject.repository.SubjectRepository
import java.time.LocalDate

@Service
class LecturerSubjectService @Autowired constructor(
    private val subjectService: SubjectService,
    private val subjectRepository: SubjectRepository,
    private val employeeRepository: EmployeeRepository,
    private val graduationRepository: GraduationRepository,
    private val notificationRepository: NotificationRepository,
) {

    fun getProposedSubjects(userId: Long): List<SubjectDto> =
        subjectRepository.findAllLecturerProposedByLecturer(lecturerId(userId))
            .map { SubjectDtoFactory.create(it) }

    fun getProposedSubject(subjectId: Long): SubjectDetailsDto =
        subjectService.getDetails(subjectId)

    fun proposeSubject(form: NewSubjectForm): SubjectDetailsDto {
        val newSubject = Topic(
            subjectRepository.getNextId(),
            employeeRepository.getById(form.supervisorId),
            null,
            graduationRepository.getById(form.diplomaSessionId),
            form.topic,
            form.description,
            form.numberOfStudents,
            TopicStatus.WAITING,
            null,
            false,
            LocalDate.now()
        )

        return SubjectDetailsDtoFactory.create(subjectRepository.save(newSubject))
    }

    fun getStudentProposedSubjects(userId: Long): List<SubjectDto> =
        subjectRepository.findAllStudentProposedByLecturer(lecturerId(userId))
            .map { SubjectDtoFactory.create(it) }

    fun getStudentProposedSubject(subjectId: Long): SubjectDetailsDto =
        subjectService.getDetails(subjectId)

    fun acceptProposedSubject(userId: Long, subjectId: Long): SubjectDetailsDto =
        subjectRepository.getByLecturerIdAndSubjectId(lecturerId(userId), subjectId).let {
            it.status = TopicStatus.WAITING
            subjectRepository.save(it)
            if (it.student != null)
                SubjectPropositionResolvedByLecturer(listOf(it.student.user), it, notificationRepository).send()
            SubjectDetailsDtoFactory.create(it)
        }

    fun rejectProposedSubject(userId: Long, subjectId: Long): SubjectDetailsDto =
        subjectRepository.getByLecturerIdAndSubjectId(lecturerId(userId), subjectId).let {
            it.status = TopicStatus.REJECTED_BY_LECTURER
            subjectRepository.save(it)
            if (it.student != null)
                SubjectPropositionResolvedByLecturer(listOf(it.student.user), it, notificationRepository).send()
            SubjectDetailsDtoFactory.create(it)
        }

    fun getSubjectsToCorrect(userId: Long): List<SubjectDto> =
        subjectRepository.findAllByLecturerIdAndStatus(lecturerId(userId), TopicStatus.TO_CORRECT)
            .map { SubjectDtoFactory.create(it) }

    fun getSubjectToCorrect(userId: Long, subjectId: Long): LecturerSubjectToCorrectDetailsDto =
        subjectRepository.getByLecturerIdAndSubjectId(lecturerId(userId), subjectId)
            .let { LecturerSubjectToCorrectDetailsDtoFactory.create(it) }

    fun correctSubject(userId: Long, form: LecturerTopicCorrectionForm): SubjectDetailsDto =
        subjectRepository.getByLecturerIdAndSubjectId(lecturerId(userId), form.thesisId).let {
            it.topic = form.changes.topic
            it.description = form.changes.description
            it.studentCount = form.changes.numberOfStudents
            it.status = TopicStatus.WAITING

            subjectRepository.save(it)
            SubjectDetailsDtoFactory.create(it)
        }

    private fun lecturerId(userId: Long) =
        employeeRepository.getEmployeeIdByUserIdAndType(userId, EmployeeType.LECTURER)
}