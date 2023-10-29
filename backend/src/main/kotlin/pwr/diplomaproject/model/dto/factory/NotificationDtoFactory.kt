package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.NotificationDto
import pwr.diplomaproject.model.entity.Notification

class NotificationDtoFactory {

    companion object {

        fun create(notification: Notification): NotificationDto = NotificationDto(
            notification.label,
            notification.content,
        )
    }
}