package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.TopicChangeRequestDetailsDto
import pwr.diplomaproject.model.entity.TopicChangeRequest

class TopicChangeRequestDetailsDtoFactory {

    companion object {

        fun create(request: TopicChangeRequest): TopicChangeRequestDetailsDto = TopicChangeRequestDetailsDto(
            request.id,
            request.oldTopic.lecturer.fullName(),
            request.oldTopic.topic,
            request.oldTopic.description,
            request.newTopic.lecturer.fullName(),
            request.newTopic.topic,
            request.newTopic.description,
            request.result
        )
    }
}