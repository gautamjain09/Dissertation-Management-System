package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.TopicCorrectionRequest
import pwr.diplomaproject.model.entity.User
import pwr.diplomaproject.repository.NotificationRepository

class TopicCorrectionRequestCreatedByStudent(
    recipients: List<User>,
    topicCorrectionRequest: TopicCorrectionRequest,
    studentUser: User,
    notificationRepository: NotificationRepository
) :
    NotificationAlert(
        recipients,
        constructContent(
            notificationRepository.findByLabel("TopicCorrectionRequestCreatedByStudent").content, mapOf(
                ":STUDENT" to studentUser.fullName(),
                ":NEW_TOPIC" to topicCorrectionRequest.newTopic,
            )
        )
    )
