package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.FieldOfStudyDto
import pwr.diplomaproject.model.entity.CourseOfStudy

class FieldOfStudyDtoFactory {

    companion object {

        fun create(courseOfStudy: CourseOfStudy): FieldOfStudyDto = FieldOfStudyDto(
            courseOfStudy.id,
            courseOfStudy.faculty.id,
            courseOfStudy.name,
            courseOfStudy.studyType
        )
    }
}