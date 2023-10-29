package pwr.diplomaproject.model.dto

data class StudentDto (
    val id: Long,
    val userId: Long,
    val indexNumber: String,
    val fieldOfStudyId: Long,
    val user: UserPersonDto,
    val fieldOfStudy: FieldOfStudyDto
)