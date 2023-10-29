package pwr.diplomaproject.model.entity

import javax.persistence.Entity
import javax.persistence.Id

@Entity
class Notification(
    @Id
    val label: String,
    var content: String,
)
