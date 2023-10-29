package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.Employee
import pwr.diplomaproject.model.enum.EmployeeType

@Repository
interface EmployeeRepository : JpaRepository<Employee, Long> {

    fun getEmployeesByUserId(userId: Long): List<Employee>

    @Query("SELECT e.id FROM Employee as e WHERE e.user.id = :userId AND e.type = :employeeType")
    fun getEmployeeIdByUserIdAndType(userId: Long, employeeType: EmployeeType): Long

    @Query("SELECT e FROM Employee as e WHERE e.user.id = :userId AND e.type = :employeeType")
    fun getEmployeeByUserIdAndType(userId: Long, employeeType: EmployeeType): Employee

    @Query("""
        FROM Employee e
        JOIN CourseOfStudy c ON e.faculty = c.faculty
        LEFT JOIN Graduation g ON c = g.courseOfStudy
        WHERE (:employeeType IS NULL OR e.type = :employeeType)
        AND (:graduationId IS NULL OR g.id = :graduationId)
    """)
    fun getEmployeeByTypeOrGraduationId(employeeType: EmployeeType?, graduationId: Long?): List<Employee>
}