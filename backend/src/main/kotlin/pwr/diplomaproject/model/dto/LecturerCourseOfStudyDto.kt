package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.StudyType

data class LecturerCourseOfStudyDto(
    val id: Long,
    val faculty: String,
    val courseOfStudy: String,
    val studyType: StudyType
)