package pwr.diplomaproject.model.dto

data class LecturerSubjectReservationDetailsDto (
    val topicId: Long,
    val topic: String,
    val numberOfStudents: Int,
    val description: String,
    val reservations: List<LecturerReservationDto>
)