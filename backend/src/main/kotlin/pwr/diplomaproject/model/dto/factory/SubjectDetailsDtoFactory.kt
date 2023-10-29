package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.entity.Topic

class SubjectDetailsDtoFactory {

    companion object {

        fun create(topic: Topic): SubjectDetailsDto = SubjectDetailsDto(
            topic.id,
            topic.lecturer.id,
            topic.graduation.id,
            topic.student?.id,
            topic.topic,
            topic.description,
            topic.studentCount,
            topic.status,
            topic.coordinatorComments,
            topic.creationDate,
            topic.createdByStudent,
            EmployeeDtoFactory.create(topic.lecturer)
        )
    }
}