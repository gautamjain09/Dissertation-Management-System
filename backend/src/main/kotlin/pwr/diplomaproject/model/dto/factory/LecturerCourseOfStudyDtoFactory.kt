package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.LecturerCourseOfStudyDto
import pwr.diplomaproject.model.entity.CourseOfStudy

class LecturerCourseOfStudyDtoFactory {

    companion object {

        fun create(courseOfStudy: CourseOfStudy): LecturerCourseOfStudyDto = LecturerCourseOfStudyDto(
            courseOfStudy.id,
            courseOfStudy.faculty.name,
            courseOfStudy.name,
            courseOfStudy.studyType
        )
    }
}