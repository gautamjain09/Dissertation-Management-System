package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.TopicStatus
import java.time.LocalDate
import javax.persistence.*

@Entity
data class Topic(
    @Id
    val id: Long,
    @ManyToOne
    val lecturer: Employee,
    @ManyToOne
    val student: Student?,
    @ManyToOne
    val graduation: Graduation,
    var topic: String,
    var description: String,
    var studentCount: Int,
    @Enumerated(EnumType.STRING)
    var status: TopicStatus,
    var coordinatorComments: String?,
    val createdByStudent: Boolean,
    val creationDate: LocalDate,

    @OneToMany(mappedBy = "topic")
    var reservation: List<Reservation> = emptyList()
)
