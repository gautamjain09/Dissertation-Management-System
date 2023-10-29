package pwr.diplomaproject.model.dto

import java.time.LocalDate

/**
 * `Timetable` on frontend
 */
data class ScheduleDto(
    val id: Long,
    val diplomaSessionId: Long,
    val submittingThesis: LocalDate,
    val approvingThesisByCoordinator: LocalDate,
    val approvingThesisByCommittee: LocalDate,
    val selectingThesis: LocalDate,
    val clarificationThesis: LocalDate,
    val changingThesis: LocalDate
)
