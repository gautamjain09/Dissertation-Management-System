package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.RequestResult

data class StudentRequestDto(
    val id: Long,
    val newTopic: String,
    val supervisorName: String,
    val status: RequestResult
)
