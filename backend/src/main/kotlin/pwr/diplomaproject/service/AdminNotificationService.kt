package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.NotificationDto
import pwr.diplomaproject.model.dto.factory.NotificationDtoFactory
import pwr.diplomaproject.model.form.NotificationForm
import pwr.diplomaproject.repository.NotificationRepository

@Service
class AdminNotificationService @Autowired constructor(
    private val notificationRepository: NotificationRepository
) {
    fun getNotifications(): List<NotificationDto> =
        notificationRepository.findAll().map { NotificationDtoFactory.create(it) }

    fun updateNotification(form: NotificationForm) {
        val notification = notificationRepository.findByLabel(form.label)
        notification.content = form.content
        notificationRepository.save(notification)
    }
}