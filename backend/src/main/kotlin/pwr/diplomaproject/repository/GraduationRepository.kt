package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import pwr.diplomaproject.model.entity.Graduation
import pwr.diplomaproject.model.entity.Schedule

interface GraduationRepository : JpaRepository<Graduation, Long> {

    @Query("FROM Graduation g JOIN Schedule s ON g = s.graduation WHERE g.courseOfStudy.id = :courseOfStudyId AND current_date < s.topicRegistrationDeadline ORDER BY s.topicRegistrationDeadline ASC")
    fun findCurrentGraduationByCourseOfStudyId(courseOfStudyId: Long): Graduation?

    @Query("""
        SELECT new kotlin.Pair(g, s)
        FROM Graduation g
        JOIN Schedule s ON s.graduation = g 
    """)
    fun getWithScheduleById(graduationId: Long): Pair<Graduation, Schedule>

    @Query("""
        SELECT new kotlin.Pair(g, s)
        FROM Graduation g
        JOIN Schedule s ON s.graduation = g 
        WHERE (:courseOfStudyId IS NULL OR g.courseOfStudy.id = :courseOfStudyId)
        AND (:facultyId IS NULL OR g.courseOfStudy.faculty.id = :facultyId)
    """)
    fun findAllWithScheduleByCourseOfStudyIdOrFacultyId(courseOfStudyId: Long?, facultyId: Long?): List<Pair<Graduation, Schedule>>
}