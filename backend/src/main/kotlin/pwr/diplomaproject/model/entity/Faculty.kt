package pwr.diplomaproject.model.entity

import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class Faculty(
    @Id
    val id: Long,
    val number: String,
    val name: String
)