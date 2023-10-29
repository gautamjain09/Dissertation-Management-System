package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.factory.LecturerCourseOfStudyDtoFactory
import pwr.diplomaproject.model.enum.EmployeeType
import pwr.diplomaproject.repository.CourseOfStudyRepository
import pwr.diplomaproject.repository.EmployeeRepository

@Service
class LecturerCoursesOfStudyService @Autowired constructor(
    private val courseOfStudyRepository: CourseOfStudyRepository,
    private val employeeRepository: EmployeeRepository
){

    fun getCoursesOfStudy(userId: Long) =
       courseOfStudyRepository.findByEmployeeId(lecturerId(userId))
           .map { LecturerCourseOfStudyDtoFactory.create(it) }

    private fun lecturerId(userId: Long) =
        employeeRepository.getEmployeeIdByUserIdAndType(userId, EmployeeType.LECTURER)
}