package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.EmployeeDto
import pwr.diplomaproject.model.entity.Employee

class EmployeeDtoFactory {

    companion object {

        fun create(employee: Employee): EmployeeDto = EmployeeDto(
            employee.id,
            employee.user.id,
            employee.faculty.id,
            employee.type,
            employee.title,
            UserPersonDtoFactory.create(employee.user)
        )
    }
}