package pwr.diplomaproject.model.dto

data class LecturerSubjectReservationDto(
    val subjectId: Long,
    val topic: String,
    val numberOfStudents: Int,
    val requireDecision: Long
)
