package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.DiplomaSessionDto
import pwr.diplomaproject.model.entity.Graduation
import pwr.diplomaproject.model.entity.Schedule

class DiplomaSessionDtoFactory {

    companion object {

        fun create(graduation: Graduation, schedule: Schedule): DiplomaSessionDto = DiplomaSessionDto(
            graduation.id,
            schedule.id,
            graduation.graduationYear.toString(),
            FieldOfStudyDtoFactory.create(graduation.courseOfStudy),
            ScheduleDtoFactory.create(schedule)
        )
    }
}