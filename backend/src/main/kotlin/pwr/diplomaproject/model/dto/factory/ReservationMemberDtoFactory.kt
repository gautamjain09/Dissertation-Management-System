package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.ReservationMemberDto
import pwr.diplomaproject.model.entity.GroupMember

class ReservationMemberDtoFactory {

    companion object {

        fun create(groupMember: GroupMember): ReservationMemberDto = ReservationMemberDto(
            groupMember.id,
            groupMember.student.id,
            groupMember.reservation.id,
            groupMember.status,
            StudentDtoFactory.create(groupMember.student)
        )
    }
}