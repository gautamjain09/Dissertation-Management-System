package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.LecturerSubjectToCorrectDetailsDto
import pwr.diplomaproject.model.entity.Topic

class LecturerSubjectToCorrectDetailsDtoFactory {

    companion object {

        fun create(topic: Topic): LecturerSubjectToCorrectDetailsDto = LecturerSubjectToCorrectDetailsDto(
            topic.id,
            topic.topic,
            topic.studentCount,
            topic.description,
            topic.coordinatorComments ?: ""
        )
    }
}