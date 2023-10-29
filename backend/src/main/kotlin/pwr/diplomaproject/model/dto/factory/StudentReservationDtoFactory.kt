package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.StudentReservationDto
import pwr.diplomaproject.model.entity.Reservation

class StudentReservationDtoFactory {

    companion object {
        fun create(reservation: Reservation): StudentReservationDto {
            return StudentReservationDto(
                reservation.id,
                reservation.topic.topic,
                reservation.topic.lecturer.fullName(),
                reservation.status
            )
        }
    }

}