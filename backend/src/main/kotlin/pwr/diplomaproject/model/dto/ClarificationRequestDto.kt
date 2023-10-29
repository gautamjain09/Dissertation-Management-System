package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.RequestResult
import java.time.LocalDate

data class ClarificationRequestDto (
    val id: Long,
    val submissionDate: LocalDate,
    val status: RequestResult,
    val studentId: Long,
    val employeeId: Long?,
    val student: StudentDto,
    val thesisId: Long,
    val newTopic: String,
    val newDescription: String,
    val baseThesis: SubjectDetailsDto
)