package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.LecturerReservationDto
import pwr.diplomaproject.model.entity.Reservation

class LecturerReservationDtoFactory {

    companion object {

        fun create(reservation: Reservation): LecturerReservationDto = LecturerReservationDto(
            reservation.id,
            reservation.groupMembers.map { StudentNameDtoFactory.create(it.student) },
            reservation.status
        )
    }
}