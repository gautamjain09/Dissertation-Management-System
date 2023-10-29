package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import pwr.diplomaproject.model.entity.Schedule

interface ScheduleRepository : JpaRepository<Schedule, Long>