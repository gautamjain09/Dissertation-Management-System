package pwr.diplomaproject.service

import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.ReservationDto
import pwr.diplomaproject.model.dto.factory.ReservationDtoFactory
import pwr.diplomaproject.model.entity.GroupMember
import pwr.diplomaproject.model.entity.Reservation
import pwr.diplomaproject.model.entity.Student
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.MemberStatus
import pwr.diplomaproject.model.enum.ReservationStatus
import pwr.diplomaproject.model.form.StudentReservationForm
import pwr.diplomaproject.model.notification.GroupMemberUpdatedByStudent
import pwr.diplomaproject.model.notification.ReservationCreatedByStudent
import pwr.diplomaproject.repository.*
import java.time.LocalDate

@Service
class StudentReservationService(
    private val reservationRepository: ReservationRepository,
    private val groupMemberRepository: GroupMemberRepository,
    private val studentRepository: StudentRepository,
    private val topicRepository: TopicRepository,
    private val notificationRepository: NotificationRepository,
) {
    fun getReservations(studentId: Long?, supervisorId: Long?, graduationId: Long?): List<ReservationDto> =
        reservationRepository.findAllByStudentIdOrSupervisorIdOrGraduationId(studentId, supervisorId, graduationId)
            .map { ReservationDtoFactory.create(it) }

    fun getReservationById(id: Long): ReservationDto =
        ReservationDtoFactory.create(reservationRepository.getById(id))

    fun approveReservation(studentId: Long, id: Long): ReservationDto? {
        val reservation: Reservation = reservationRepository.findAllByIndexAndStudent(id, studentId)

        val groupMember: GroupMember? = reservation.groupMembers.firstOrNull {
            it.student.id == studentId
        }

        if (groupMember != null && groupMember.status != MemberStatus.CONFIRMED) {

            // SUGGESTED -> WILLING
            if (groupMember.status == MemberStatus.SUGGESTED) {
                if (reservation.status != ReservationStatus.WAITING) {
                    return null
                }
                groupMember.status = MemberStatus.WILLING
            }

            // WILLING -> CONFIRMED
            else if (groupMember.status == MemberStatus.WILLING) {
                if (reservation.status != ReservationStatus.ACCEPTED) {
                    return null
                }
                groupMember.status = MemberStatus.CONFIRMED
            }

            val memberStatusList = reservation.groupMembers.map { it.status }

            // all MemberStatus.WILLING  =>  ReservationStatus.SUBMITTED
            if (memberStatusList.all { it == MemberStatus.WILLING }) {
                reservation.status = ReservationStatus.SUBMITTED
            }

            // all MemberStatus.CONFIRMED  =>  ReservationStatus.CONFIRMED
            else if (memberStatusList.all { it == MemberStatus.CONFIRMED }) {
                reservation.status = ReservationStatus.CONFIRMED
            }

            groupMemberRepository.save(groupMember)
            reservationRepository.save(reservation)

            GroupMemberUpdatedByStudent(
                listOf(reservation.topic.lecturer.user) + reservation.groupMembers.map { gm -> gm.student.user },
                groupMember,
                notificationRepository
            ).send()
        }
        return ReservationDtoFactory.create(reservation)
    }

    fun cancelReservation(studentId: Long, id: Long): ReservationDto {
        val reservation: Reservation = reservationRepository.findAllByIndexAndStudent(id, studentId)
        val groupMember: GroupMember? = reservation.groupMembers.firstOrNull {
            it.student.id == studentId
        }

        if (groupMember != null
            && reservation.status != ReservationStatus.CONFIRMED
            && groupMember.status != MemberStatus.CONFIRMED
        ) {
            groupMember.status = MemberStatus.REJECTED
            reservation.status = ReservationStatus.REJECTED_BY_STUDENT
            groupMemberRepository.save(groupMember)
            reservationRepository.save(reservation)

            GroupMemberUpdatedByStudent(
                listOf(reservation.topic.lecturer.user) + reservation.groupMembers.map { gm -> gm.student.user },
                groupMember,
                notificationRepository
            ).send()
        }
        return ReservationDtoFactory.create(reservation)
    }

    fun makeReservation(studentId: Long, form: StudentReservationForm): ReservationDto {
        val topic: Topic = topicRepository.getById(form.thesisId)
        val student: Student = studentRepository.getById(studentId)

        val newReservation = Reservation(
            id = reservationRepository.getNextId(),
            topic = topic,
            status = if (form.studentIds.size == 1) ReservationStatus.SUBMITTED else ReservationStatus.WAITING,
            creationDate = LocalDate.now(),
        )

        val newGroupMembers = mutableListOf<GroupMember>()

        var nextGroupMemberId = groupMemberRepository.getNextId()
        for (suggestedStudentId in form.studentIds) {
            val suggestedStudent = studentRepository.getById(suggestedStudentId)
            val newGroupMember = GroupMember(
                id = nextGroupMemberId++,
                reservation = newReservation,
                student = suggestedStudent,
                status = if (suggestedStudent.id == studentId) MemberStatus.WILLING else MemberStatus.SUGGESTED
            )
            newGroupMembers.add(newGroupMember)
        }

        val savedReservation = reservationRepository.save(newReservation)
        for (newGroupMember in newGroupMembers) {
            groupMemberRepository.save(newGroupMember)
        }

        ReservationCreatedByStudent(
            listOf(topic.lecturer.user),
            newReservation,
            student.user,
            newGroupMembers.size,
            notificationRepository
        ).send()

        return ReservationDtoFactory.create(savedReservation)
    }
}