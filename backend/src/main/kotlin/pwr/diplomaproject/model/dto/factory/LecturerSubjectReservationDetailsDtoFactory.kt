package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.LecturerSubjectReservationDetailsDto
import pwr.diplomaproject.model.entity.Reservation
import pwr.diplomaproject.model.entity.Topic

class LecturerSubjectReservationDetailsDtoFactory {

    companion object {

        fun create(topic: Topic, reservations: List<Reservation>): LecturerSubjectReservationDetailsDto = LecturerSubjectReservationDetailsDto(
            topic.id,
            topic.topic,
            topic.studentCount,
            topic.description,
            reservations.map { LecturerReservationDtoFactory.create(it) }
        )
    }
}