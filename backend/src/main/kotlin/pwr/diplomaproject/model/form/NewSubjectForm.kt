package pwr.diplomaproject.model.form

data class NewSubjectForm(
    val supervisorId: Long,
    val topic: String,
    val description: String,
    val numberOfStudents: Int,
    val diplomaSessionId: Long,
    val reportedByStudent: Boolean,
    val authorStudentId: Long?
)
