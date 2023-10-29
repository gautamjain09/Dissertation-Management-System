package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.ReservationDto
import pwr.diplomaproject.model.entity.Reservation

class ReservationDtoFactory {

    companion object {

        fun create(reservation: Reservation): ReservationDto = ReservationDto(
            reservation.id,
            reservation.topic.id,
            reservation.status,
            reservation.creationDate,
            SubjectDetailsDtoFactory.create(reservation.topic),
            reservation.groupMembers
                .map { ReservationMemberDtoFactory.create(it) }
        )
    }
}