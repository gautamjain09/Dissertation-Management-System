package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.RequestResult
import java.time.LocalDate
import javax.persistence.*

@Entity
data class TopicCorrectionRequest(
    @Id
    val id: Long,
    @ManyToOne
    val student: Student,
    @ManyToOne
    var employee: Employee?,
    @Enumerated(EnumType.STRING)
    var result: RequestResult,
    val requestDate: LocalDate,
    val newTopic: String,
    val newDescription: String
)