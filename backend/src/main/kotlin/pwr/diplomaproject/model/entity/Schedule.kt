package pwr.diplomaproject.model.entity

import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.OneToOne

@Entity
data class Schedule(
    @Id
    val id: Long,
    @OneToOne
    val graduation: Graduation,
    var topicRegistrationDeadline: LocalDate,
    var topicCoordinatorApprovalDeadline: LocalDate,
    var topicCommissionApprovalDeadline: LocalDate,
    var topicSelectionDeadline: LocalDate,
    var topicCorrectionDeadline: LocalDate,
    var topicChangeDeadline: LocalDate
)
