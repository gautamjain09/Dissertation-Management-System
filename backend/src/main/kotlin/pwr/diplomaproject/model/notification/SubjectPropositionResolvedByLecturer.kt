package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.User
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.repository.NotificationRepository

class SubjectPropositionResolvedByLecturer(
    recipients: List<User>,
    subject: Topic,
    notificationRepository: NotificationRepository
) :
    NotificationAlert(
        recipients,
        constructContent(
            notificationRepository.findByLabel("SubjectPropositionResolvedByLecturer").content, mapOf(
                ":TOPIC" to subject.topic,
                ":RESULT" to if (subject.status == TopicStatus.REJECTED_BY_LECTURER) "negatywnie" else "pozytywnie",
            )
        )
    )
