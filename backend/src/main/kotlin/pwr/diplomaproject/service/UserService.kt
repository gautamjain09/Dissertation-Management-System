package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.EmployeeDto
import pwr.diplomaproject.model.dto.StudentDto
import pwr.diplomaproject.model.dto.UserDto
import pwr.diplomaproject.model.dto.factory.EmployeeDtoFactory
import pwr.diplomaproject.model.dto.factory.StudentDtoFactory
import pwr.diplomaproject.model.dto.factory.UserDtoFactory
import pwr.diplomaproject.model.enum.EmployeeType
import pwr.diplomaproject.repository.EmployeeRepository
import pwr.diplomaproject.repository.StudentRepository
import pwr.diplomaproject.repository.UserRepository

@Service
class UserService @Autowired constructor(
    private val userRepository: UserRepository,
    private val studentRepository: StudentRepository,
    private val employeeRepository: EmployeeRepository
){

    fun getUser(userId: Long): UserDto {
        val user = userRepository.getById(userId)
        val students = studentRepository.getStudentsByUserId(userId)
        val employees = employeeRepository.getEmployeesByUserId(userId)

        return UserDtoFactory.create(user, students, employees)
    }

    fun getStudentsByGraduationId(graduationId: Long?): List<StudentDto> =
        studentRepository.getStudentsByGraduationId(graduationId)
            .map { StudentDtoFactory.create(it) }

    fun getStudentById(studentId: Long): StudentDto =
        studentRepository.getById(studentId)
            .let { StudentDtoFactory.create(it) }

    fun getEmployeesByTypeOrGraduationId(type: EmployeeType?, graduationId: Long?): List<EmployeeDto> =
        employeeRepository.getEmployeeByTypeOrGraduationId(type, graduationId)
            .map { EmployeeDtoFactory.create(it) }

    fun getEmployeeById(employeeId: Long): EmployeeDto =
        employeeRepository.getById(employeeId)
            .let { EmployeeDtoFactory.create(it) }
}