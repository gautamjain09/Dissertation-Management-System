package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.ScheduleDto
import pwr.diplomaproject.model.dto.factory.ScheduleDtoFactory
import pwr.diplomaproject.repository.ScheduleRepository

@Service
class ScheduleService @Autowired constructor(
    private val scheduleRepository: ScheduleRepository
){

    fun getSchedules(): List<ScheduleDto>  =
        scheduleRepository.findAll()
            .map { ScheduleDtoFactory.create(it) }

    fun getScheduleById(id: Long): ScheduleDto  =
        scheduleRepository.getById(id)
            .let { ScheduleDtoFactory.create(it) }
}