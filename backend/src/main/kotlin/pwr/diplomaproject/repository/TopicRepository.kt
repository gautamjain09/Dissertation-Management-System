package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.Topic

@Repository
interface TopicRepository : JpaRepository<Topic, Long> {
    @Query(
        """
        SELECT t
        FROM Topic t
        LEFT JOIN Reservation r ON r.topic = t
        LEFT JOIN GroupMember g ON g.reservation = r
        LEFT JOIN Student s ON g.student = s
        WHERE t.status = 'APPROVED_BY_COMMITTEE' and s.id <> :studentId and t.graduation.id = :graduationId
        GROUP BY t
        HAVING sum(case r.status when 'CONFIRMED' then 1 else 0 end) = 0
    """
    )
    fun findAllByGraduationAvailableForStudent(studentId: Long, graduationId: Long): List<Topic>

    @Query(
        """
        FROM Topic t
        WHERE t.createdByStudent = true and t.student.id = :studentId and t.graduation.id = :graduationId 
    """
    )
    fun findAllByStudentAndGraduation(studentId: Long, graduationId: Long): List<Topic>

    @Query(
        """
        FROM Topic t
        WHERE t.id = :id and t.createdByStudent = true and t.student.id = :studentId
    """
    )
    fun findByIndexAndStudent(id: Long, studentId: Long): Topic
}
