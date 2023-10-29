package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.StudentDto
import pwr.diplomaproject.model.entity.Student

class StudentDtoFactory {

    companion object {

        fun create(student: Student): StudentDto = StudentDto(
            student.id,
            student.user.id,
            student.index,
            student.courseOfStudy.id,
            UserPersonDtoFactory.create(student.user),
            FieldOfStudyDtoFactory.create(student.courseOfStudy)
        )
    }
}