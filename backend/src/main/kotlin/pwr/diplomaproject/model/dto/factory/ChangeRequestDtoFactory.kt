package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.ChangeRequestDto
import pwr.diplomaproject.model.entity.TopicChangeRequest

class ChangeRequestDtoFactory {

    companion object {

        fun create(request: TopicChangeRequest): ChangeRequestDto = ChangeRequestDto(
            request.id,
            request.requestDate,
            request.result,
            request.student.id,
            request.employee?.id,
            StudentDtoFactory.create(request.student),
            request.oldTopic.id,
            request.newTopic.id,
            SubjectDetailsDtoFactory.create(request.newTopic),
            SubjectDetailsDtoFactory.create(request.oldTopic)
        )
    }
}