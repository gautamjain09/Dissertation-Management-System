package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.MemberStatus
import javax.persistence.*

@Entity
class GroupMember(
    @Id
    val id: Long,
    @ManyToOne
    val reservation: Reservation,
    @ManyToOne
    val student: Student,
    @Enumerated(EnumType.STRING)
    var status: MemberStatus
)