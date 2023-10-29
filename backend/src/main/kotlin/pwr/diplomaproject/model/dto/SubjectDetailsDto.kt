package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.TopicStatus
import java.time.LocalDate

/**
 * `Thesis` on frontend
 */
data class SubjectDetailsDto(
    val id: Long,
    val supervisorId: Long,
    val diplomaSessionId: Long,
    val authorStudentId: Long?,
    val topic: String,
    val description: String,
    val numberOfStudents: Int,
    val status: TopicStatus,
    val coordinatorComment: String?,
    val submissionDate: LocalDate,
    val reportedByStudent: Boolean,
    val supervisor: EmployeeDto
)
