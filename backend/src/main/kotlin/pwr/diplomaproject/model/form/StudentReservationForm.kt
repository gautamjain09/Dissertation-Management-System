package pwr.diplomaproject.model.form

data class StudentReservationForm(
    val thesisId: Long,
    val studentIds: List<Long>
)
