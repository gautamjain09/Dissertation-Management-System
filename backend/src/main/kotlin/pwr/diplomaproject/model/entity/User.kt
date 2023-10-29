package pwr.diplomaproject.model.entity

import javax.persistence.Entity
import javax.persistence.Id

@Entity(name = "AppUser")
data class User(
    @Id
    val id: Long,
    val email: String,
    val firstName: String,
    val lastName: String
) {
    fun fullName(): String = "$firstName $lastName"
}