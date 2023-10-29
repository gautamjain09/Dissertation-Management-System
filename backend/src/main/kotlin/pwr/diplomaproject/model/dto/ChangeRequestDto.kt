package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.RequestResult
import java.time.LocalDate

data class ChangeRequestDto(
    val id: Long,
    val submissionDate: LocalDate,
    val status: RequestResult,
    val studentId: Long,
    val employeeId: Long?,
    val student: StudentDto,
    val oldThesisId: Long,
    val newThesisId: Long,
    val newThesis: SubjectDetailsDto,
    val previousThesis: SubjectDetailsDto
)
