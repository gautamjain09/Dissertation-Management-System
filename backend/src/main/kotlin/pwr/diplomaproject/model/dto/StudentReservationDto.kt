package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.ReservationStatus

data class StudentReservationDto(
    val id: Long,
    val subjectTopic: String,
    val supervisorName: String,
    val status: ReservationStatus
)