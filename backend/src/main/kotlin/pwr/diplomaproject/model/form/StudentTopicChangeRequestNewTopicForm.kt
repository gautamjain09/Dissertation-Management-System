package pwr.diplomaproject.model.form

data class StudentTopicChangeRequestNewTopicForm(
    val topic: String,
    val description: String,
    val supervisorId: Long
)
