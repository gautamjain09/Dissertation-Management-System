package pwr.diplomaproject.model.form

data class StudentTopicChangeRequestExistingTopicForm(
    val currentTopicId: Long,
    val newTopicId: Long
)
