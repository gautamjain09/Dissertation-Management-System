package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.StudentRequestDto
import pwr.diplomaproject.model.entity.TopicChangeRequest

class StudentRequestDtoFactory {

    companion object {

        fun create(request: TopicChangeRequest): StudentRequestDto = StudentRequestDto(
            request.id,
            request.newTopic.topic,
            request.newTopic.lecturer.fullName(),
            request.result
        )
    }
}