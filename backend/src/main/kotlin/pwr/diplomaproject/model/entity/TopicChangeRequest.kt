package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.RequestResult
import java.time.LocalDate
import javax.persistence.*

@Entity
data class TopicChangeRequest(
    @Id
    val id: Long,
    @ManyToOne
    val student: Student,
    @ManyToOne
    var employee: Employee?,
    @ManyToOne
    val oldTopic: Topic,
    @ManyToOne
    val newTopic: Topic,
    @Enumerated(EnumType.STRING)
    var result: RequestResult,
    val requestDate: LocalDate,
)