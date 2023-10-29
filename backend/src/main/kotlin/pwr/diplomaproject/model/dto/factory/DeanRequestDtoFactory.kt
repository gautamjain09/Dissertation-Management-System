package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.RequestDto
import pwr.diplomaproject.model.entity.TopicChangeRequest
import pwr.diplomaproject.model.entity.TopicCorrectionRequest

class DeanRequestDtoFactory {

    companion object {

        fun create(request: TopicCorrectionRequest): RequestDto = RequestDto(
            request.id,
            StudentNameDtoFactory.create(request.student),
            request.requestDate,
            request.result
        )

        fun create(request: TopicChangeRequest): RequestDto = RequestDto(
            request.id,
            StudentNameDtoFactory.create(request.student),
            request.requestDate,
            request.result
        )
    }
}