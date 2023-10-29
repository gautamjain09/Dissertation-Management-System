package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.RequestResult
import java.time.LocalDate

data class RequestDto (
    val id: Long,
    val student: StudentNameDto,
    val creationDate: LocalDate,
    val status: RequestResult?
)