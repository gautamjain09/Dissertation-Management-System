package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.ClarificationRequestDto
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.TopicCorrectionRequest

class ClarificationRequestDtoFactory {

    companion object {

        fun create(request: TopicCorrectionRequest, subject: Topic): ClarificationRequestDto = ClarificationRequestDto(
            request.id,
            request.requestDate,
            request.result,
            request.student.id,
            request.employee?.id,
            StudentDtoFactory.create(request.student),
            subject.id,
            request.newTopic,
            request.newDescription,
            SubjectDetailsDtoFactory.create(subject)
        )
    }
}