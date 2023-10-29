package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.TopicStatus
import java.time.LocalDate

data class SubjectDto (
    val id: Long,
    val topic: String,
    val lecturerName: String,
    val creationDate: LocalDate,
    val numberOfStudents: Int,
    val status: TopicStatus
)