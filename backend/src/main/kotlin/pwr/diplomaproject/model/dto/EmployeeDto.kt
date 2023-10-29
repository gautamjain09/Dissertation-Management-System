package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.EmployeeType

data class EmployeeDto(
    val id: Long,
    val userId: Long,
    val departmentId: Long,
    val employeeRole: EmployeeType,
    val title: String,
    val user: UserPersonDto
)
