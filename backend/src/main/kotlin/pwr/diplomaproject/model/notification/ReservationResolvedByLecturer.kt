package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.Reservation
import pwr.diplomaproject.model.entity.User
import pwr.diplomaproject.repository.NotificationRepository

class ReservationResolvedByLecturer(
    recipients: List<User>,
    reservation: Reservation,
    notificationRepository: NotificationRepository
) :
    NotificationAlert(
        recipients,
        constructContent(
            notificationRepository.findByLabel("ReservationResolvedByLecturer").content, mapOf(
                ":LECTURER" to reservation.topic.lecturer.fullName(),
                ":TOPIC" to reservation.topic.topic,
                ":RESERVATION_STATUS" to reservation.status.toString(),
            )
        )
    )