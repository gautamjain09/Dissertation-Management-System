package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.StudentSubjectDetailsDto
import pwr.diplomaproject.model.entity.Topic

class StudentSubjectDetailsDtoFactory {
    companion object {
        fun create(topic: Topic): StudentSubjectDetailsDto = StudentSubjectDetailsDto(
            topic.id,
            topic.topic,
            topic.lecturer.fullName(),
            topic.studentCount,
            topic.description,
            topic.status,
//            topic.reservation.filter { it.status == ReservationStatus.CONFIRMED } // todo czy ta lista będzie potrzebna?
//                .flatMap { it.groupMembers }
//                .map { StudentNameDtoFactory.create(it.student) }
        )
    }
}