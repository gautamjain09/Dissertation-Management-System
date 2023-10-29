package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.ScheduleDto
import pwr.diplomaproject.model.entity.Schedule

class ScheduleDtoFactory {

    companion object {

        fun create(schedule: Schedule): ScheduleDto = ScheduleDto(
            schedule.id,
            schedule.graduation.id,
            schedule.topicRegistrationDeadline,
            schedule.topicCoordinatorApprovalDeadline,
            schedule.topicCommissionApprovalDeadline,
            schedule.topicSelectionDeadline,
            schedule.topicCorrectionDeadline,
            schedule.topicChangeDeadline
        )
    }
}