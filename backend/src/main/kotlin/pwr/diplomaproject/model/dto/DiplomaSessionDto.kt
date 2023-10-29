package pwr.diplomaproject.model.dto

data class DiplomaSessionDto (
    val id: Long,
    val timetableId: Long,
    val year: String,
    val fieldOfStudy: FieldOfStudyDto,
    val timetable: ScheduleDto
)