package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.User
import pwr.diplomaproject.repository.NotificationRepository

class SubjectResolvedByCoordinator(
    recipients: List<User>,
    subject: Topic,
    notificationRepository: NotificationRepository
) :
    NotificationAlert(
        recipients,
        constructContent(
            notificationRepository.findByLabel("SubjectResolvedByCoordinator").content, mapOf(
                ":TOPIC" to subject.topic,
                ":TOPIC_STATUS" to subject.status.toString(),
                ":COORDINATOR_COMMENTS" to (subject.coordinatorComments ?: "brak uwag")
            )
        )
    )
