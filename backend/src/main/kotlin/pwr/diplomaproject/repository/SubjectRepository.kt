package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.dto.LecturerSubjectReservationDto
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.TopicStatus

@Repository
interface SubjectRepository : JpaRepository<Topic, Long> {

    @Query(value = "select max(t.id) + 1 from Topic t")
    fun getNextId(): Long

    fun findAllByStatusIsIn(statuses: List<TopicStatus>): List<Topic>

    @Query("FROM Topic as t WHERE t.lecturer.id = :lecturerId AND t.createdByStudent = false")
    fun findAllLecturerProposedByLecturer(lecturerId: Long): List<Topic>

    @Query("FROM Topic as t WHERE t.lecturer.id = :lecturerId AND t.createdByStudent = true")
    fun findAllStudentProposedByLecturer(lecturerId: Long): List<Topic>

    fun findAllByLecturerIdAndStatus(lecturerId: Long, status: TopicStatus): List<Topic>

    @Query("FROM Topic as t WHERE t.lecturer.id = :lecturerId AND t.id = :subjectId")
    fun getByLecturerIdAndSubjectId(lecturerId: Long, subjectId: Long): Topic

    @Query("""
        SELECT new pwr.diplomaproject.model.dto.LecturerSubjectReservationDto(t.id, t.topic, t.studentCount, sum(case r.status when 'SUBMITTED' then 1 else 0 end))
        FROM Topic t
        LEFT JOIN Reservation r ON r.topic = t
        WHERE t.status = 'APPROVED_BY_COMMITTEE' AND t.lecturer.id = :lecturerId
        GROUP BY t
    """)
    fun getLecturerReservationDetails(lecturerId: Long): List<LecturerSubjectReservationDto>

    @Query("""
        SELECT t 
        FROM TopicCorrectionRequest tcr
        JOIN Student s ON tcr.student = s
        JOIN GroupMember g ON g.student = s
        JOIN Reservation r ON g.reservation = r
        JOIN Topic t ON r.topic = t
        WHERE r.status = 'CONFIRMED' AND tcr.id = :requestId
    """)
    fun getByCorrectionRequestId(requestId: Long): Topic

    @Query("""
        FROM Topic t
        WHERE (:status IS NULL OR t.status = :status)
        AND (:graduationId IS NULL OR t.graduation.id = :graduationId)
        AND (:studentId IS NULL OR (t.createdByStudent = true AND t.student.id = :studentId))
        AND (:supervisorId IS NULL OR t.lecturer.id = :supervisorId)
    """)
    fun findAllByParams(
        status: TopicStatus?,
        graduationId: Long?,
        studentId: Long?,
        supervisorId: Long?): List<Topic>
}