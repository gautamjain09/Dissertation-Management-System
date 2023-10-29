package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.Reservation

@Repository
interface ReservationRepository : JpaRepository<Reservation, Long> {
    @Query(value = "select max(r.id) + 1 from Reservation r")
    fun getNextId(): Long

    @Query("select g.reservation from GroupMember g where g.student.id = :studentId and g.reservation.id = :id")
    fun findAllByIndexAndStudent(id: Long, studentId: Long): Reservation

    @Query("from Reservation r where r.id = :reservationId and r.topic.lecturer.id = :lecturerId")
    fun getByIdAndLecturerId(reservationId: Long, lecturerId: Long): Reservation

    @Query("from Reservation r where r.topic.id = :subjectId and r.topic.lecturer.id = :lecturerId")
    fun findAllBySubjectIdAndLecturerId(subjectId: Long, lecturerId: Long): List<Reservation>

    @Query("from Reservation r where r.topic.id = :subjectId")
    fun findAllBySubjectId(subjectId: Long): List<Reservation>

    @Query("""
        SELECT DISTINCT r
        FROM Reservation r
        LEFT JOIN GroupMember g ON g.reservation = r
        WHERE (:studentId IS NULL OR g.student.id = :studentId)
        AND (:supervisorId IS NULL OR r.topic.lecturer.id = :supervisorId)
        AND (:graduationId IS NULL OR r.topic.graduation.id = :graduationId)
    """)
    fun findAllByStudentIdOrSupervisorIdOrGraduationId(studentId: Long?, supervisorId: Long?, graduationId: Long?): List<Reservation>
}
