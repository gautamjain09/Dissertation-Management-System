package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.StudyType
import javax.persistence.*

@Entity
data class CourseOfStudy(
    @Id
    val id: Long,
    @ManyToOne
    val faculty: Faculty,
    val name: String,
    @Enumerated(EnumType.STRING)
    val studyType: StudyType
)
