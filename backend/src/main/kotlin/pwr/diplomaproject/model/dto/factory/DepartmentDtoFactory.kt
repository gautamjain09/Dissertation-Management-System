package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.DepartmentDto
import pwr.diplomaproject.model.entity.Faculty

class DepartmentDtoFactory {

    companion object {

        fun create(faculty: Faculty): DepartmentDto = DepartmentDto(
            faculty.id,
            faculty.name,
            faculty.number
        )
    }
}