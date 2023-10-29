package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.Notification

@Repository
interface NotificationRepository : JpaRepository<Notification, Long> {
    @Query("select n from Notification n where n.label = :label")
    fun findByLabel(label: String): Notification
}
