package pwr.diplomaproject.model.form

import java.time.LocalDate

data class GraduationScheduleUpdateForm(
    val id: Long,
    val diplomaSessionId: Long,
    val submittingThesis: LocalDate,
    val approvingThesisByCoordinator: LocalDate,
    val approvingThesisByCommittee: LocalDate,
    val selectingThesis: LocalDate,
    val clarificationThesis: LocalDate,
    val changingThesis: LocalDate
)
