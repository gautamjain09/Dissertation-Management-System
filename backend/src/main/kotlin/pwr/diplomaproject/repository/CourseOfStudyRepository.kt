package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import pwr.diplomaproject.model.entity.CourseOfStudy

interface CourseOfStudyRepository : JpaRepository<CourseOfStudy, Long> {

    @Query("SELECT c FROM CourseOfStudy c JOIN Faculty f on c.faculty = f JOIN Employee e on f = e.faculty WHERE e.id = :employeeId")
    fun findByEmployeeId(employeeId: Long): List<CourseOfStudy>
}