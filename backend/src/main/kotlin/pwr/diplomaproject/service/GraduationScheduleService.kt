package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.GraduationScheduleDto
import pwr.diplomaproject.model.dto.ScheduleDto
import pwr.diplomaproject.model.dto.factory.GraduationScheduleDtoFactory
import pwr.diplomaproject.model.dto.factory.ScheduleDtoFactory
import pwr.diplomaproject.model.form.GraduationScheduleUpdateForm
import pwr.diplomaproject.repository.ScheduleRepository

@Service
class GraduationScheduleService @Autowired constructor(
    private val scheduleRepository: ScheduleRepository
) {

    fun getSchedule(scheduleId: Long): GraduationScheduleDto =
        GraduationScheduleDtoFactory.create(scheduleRepository.getById(scheduleId))

    fun updateSchedule(scheduleId: Long, form: GraduationScheduleUpdateForm): ScheduleDto {
        val schedule = scheduleRepository.getById(scheduleId)

        schedule.topicRegistrationDeadline = form.submittingThesis
        schedule.topicCoordinatorApprovalDeadline = form.approvingThesisByCoordinator
        schedule.topicCommissionApprovalDeadline = form.approvingThesisByCommittee
        schedule.topicSelectionDeadline = form.selectingThesis
        schedule.topicCorrectionDeadline = form.clarificationThesis
        schedule.topicChangeDeadline = form.changingThesis

        return ScheduleDtoFactory.create(scheduleRepository.save(schedule))
    }

}
