package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.MemberStatus

data class ReservationMemberDto(
    val id: Long,
    val studentId: Long,
    val reservationId: Long,
    val status: MemberStatus,
    val student: StudentDto
)
