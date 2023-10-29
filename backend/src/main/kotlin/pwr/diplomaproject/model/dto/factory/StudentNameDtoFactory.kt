package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.StudentNameDto
import pwr.diplomaproject.model.entity.Student

class StudentNameDtoFactory {
    companion object {
        fun create(student: Student): StudentNameDto = StudentNameDto(
            "${student.user.firstName} ${student.user.lastName}",
            student.index
        )
    }
}
