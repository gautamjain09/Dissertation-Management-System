package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.Reservation
import pwr.diplomaproject.model.entity.User
import pwr.diplomaproject.repository.NotificationRepository

class ReservationCreatedByStudent(
    recipients: List<User>,
    reservation: Reservation,
    studentUser: User,
    memberCount: Int,
    notificationRepository: NotificationRepository
) :
    NotificationAlert(
        recipients,
        constructContent(
            notificationRepository.findByLabel("ReservationCreatedByStudent").content, mapOf(
                ":STUDENT" to studentUser.fullName(),
                ":TOPIC" to reservation.topic.topic,
                ":MEMBER_COUNT" to memberCount.toString(),
            )
        )
    )