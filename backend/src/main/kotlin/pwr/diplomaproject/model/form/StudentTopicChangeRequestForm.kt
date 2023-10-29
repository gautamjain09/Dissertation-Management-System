package pwr.diplomaproject.model.form

data class StudentTopicChangeRequestForm(
    val studentId: Long,
    val previousThesisId: Long,
    val newThesisId: Long?,
    val newThesis: StudentTopicChangeRequestNewTopicForm?
) {

    fun thesisExists(): Boolean = newThesis == null
}
