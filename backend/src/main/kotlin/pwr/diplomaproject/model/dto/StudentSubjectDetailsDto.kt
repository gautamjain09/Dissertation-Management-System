package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.TopicStatus

data class StudentSubjectDetailsDto(
    val id: Long,
    val topic: String,
    val supervisorName: String,
    val numberOfStudents: Int,
    val description: String,
    val status: TopicStatus,
//    val students: List<StudentNameDto>
)
