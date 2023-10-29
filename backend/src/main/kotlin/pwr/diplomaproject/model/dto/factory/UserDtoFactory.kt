package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.UserDto
import pwr.diplomaproject.model.dto.UserRoleDto
import pwr.diplomaproject.model.entity.Employee
import pwr.diplomaproject.model.entity.Student
import pwr.diplomaproject.model.entity.User
import pwr.diplomaproject.model.enum.Role

class UserDtoFactory {

    companion object {

        fun create(user: User, students: List<Student>, employees: List<Employee>) =
            UserDto(user.id,
            user.firstName,
            user.lastName,
            students.map { UserRoleDto(it.id, Role.STUDENT) } +
            employees.map { UserRoleDto(it.id, Role.convert(it.type)) })
    }
}