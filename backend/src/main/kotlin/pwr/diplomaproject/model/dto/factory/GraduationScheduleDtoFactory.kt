package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.GraduationScheduleDto
import pwr.diplomaproject.model.entity.Schedule

class GraduationScheduleDtoFactory {

    companion object {
        fun create(schedule: Schedule): GraduationScheduleDto {
            return GraduationScheduleDto(
                schedule.id,
                schedule.graduation.courseOfStudy.name,
                schedule.graduation.graduationYear
            )
        }
    }

}