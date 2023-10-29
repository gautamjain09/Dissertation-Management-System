package pwr.diplomaproject.model.dto

data class LecturerSubjectToCorrectDetailsDto(
    val id: Long,
    val topic: String,
    val numberOfStudents: Int,
    val description: String,
    val coordinatorComments: String
)
