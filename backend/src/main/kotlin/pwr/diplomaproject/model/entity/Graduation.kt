package pwr.diplomaproject.model.entity

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne

@Entity
data class Graduation(
    @Id
    val id: Long,
    @ManyToOne
    val courseOfStudy: CourseOfStudy,
    val graduationYear: Int
)
