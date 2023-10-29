package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.ReservationStatus

data class LecturerReservationDto(
    val id: Long,
    val students: List<StudentNameDto>,
    val status: ReservationStatus
)
