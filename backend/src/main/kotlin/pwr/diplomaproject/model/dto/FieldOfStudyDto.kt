package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.StudyType

data class FieldOfStudyDto(
    val id: Long,
    val departmentId: Long,
    val name: String,
    val degree: StudyType
)
