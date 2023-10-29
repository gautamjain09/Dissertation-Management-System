package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.GroupMember
import pwr.diplomaproject.model.entity.User
import pwr.diplomaproject.repository.NotificationRepository

class GroupMemberUpdatedByStudent(
    recipients: List<User>,
    groupMember: GroupMember,
    notificationRepository: NotificationRepository
) :
    NotificationAlert(
        recipients,
        constructContent(
            notificationRepository.findByLabel("GroupMemberUpdatedByStudent").content, mapOf(
                ":STUDENT" to groupMember.student.user.fullName(),
                ":TOPIC" to groupMember.reservation.topic.topic,
                ":GROUP_MEMBER_STATUS" to groupMember.status.toString(),
                ":RESERVATION_STATUS" to groupMember.reservation.status.toString(),
            )
        )
    )
