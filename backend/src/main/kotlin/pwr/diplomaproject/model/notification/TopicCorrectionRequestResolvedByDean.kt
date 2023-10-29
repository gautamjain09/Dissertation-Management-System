package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.TopicCorrectionRequest
import pwr.diplomaproject.model.entity.User
import pwr.diplomaproject.repository.NotificationRepository

class TopicCorrectionRequestResolvedByDean(
    recipients: List<User>,
    topicCorrectionRequest: TopicCorrectionRequest,
    notificationRepository: NotificationRepository
) :
    NotificationAlert(
        recipients,
        constructContent(
            notificationRepository.findByLabel("TopicCorrectionRequestResolvedByDean").content, mapOf(
                ":NEW_TOPIC" to topicCorrectionRequest.newTopic,
                ":STATUS" to topicCorrectionRequest.result.toString(),
            )
        )
    )
