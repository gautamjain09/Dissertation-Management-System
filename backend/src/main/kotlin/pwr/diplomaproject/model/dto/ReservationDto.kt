package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.ReservationStatus
import java.time.LocalDate

data class ReservationDto(
    val id: Long,
    val thesisId: Long,
    val status: ReservationStatus,
    val creationDate: LocalDate,
    val thesis: SubjectDetailsDto,
    val reservationMembers: List<ReservationMemberDto>
)
