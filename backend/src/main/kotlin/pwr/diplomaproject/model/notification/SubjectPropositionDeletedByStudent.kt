package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.User
import pwr.diplomaproject.repository.NotificationRepository

class SubjectPropositionDeletedByStudent(
    recipients: List<User>,
    subject: Topic, studentUser: User,
    notificationRepository: NotificationRepository
) :
    NotificationAlert(
        recipients,
        constructContent(
            notificationRepository.findByLabel("SubjectPropositionDeletedByStudent").content, mapOf(
                ":TOPIC" to subject.topic,
                ":STUDENT" to studentUser.fullName(),
            )
        )
    )
