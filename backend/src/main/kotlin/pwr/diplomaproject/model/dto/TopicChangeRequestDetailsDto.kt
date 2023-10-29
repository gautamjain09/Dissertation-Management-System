package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.RequestResult

data class TopicChangeRequestDetailsDto(
    val id: Long,
    val oldLecturerName: String,
    val oldTopic: String,
    val oldDescription: String,
    val newLecturerName: String,
    val newTopic: String,
    val newDescription: String,
    val status: RequestResult
)
