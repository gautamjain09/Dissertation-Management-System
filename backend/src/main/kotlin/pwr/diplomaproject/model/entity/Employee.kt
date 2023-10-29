package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.EmployeeType
import javax.persistence.*

@Entity
data class Employee(
    @Id
    val id: Long,
    @ManyToOne
    val user: User,
    @ManyToOne
    val faculty: Faculty,
    @Enumerated(EnumType.STRING)
    val type: EmployeeType,
    val title: String
) {

    fun fullName(): String = "$title ${user.firstName} ${user.lastName}"
}