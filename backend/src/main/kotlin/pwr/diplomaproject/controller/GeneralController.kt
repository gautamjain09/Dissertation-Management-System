package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.DepartmentDto
import pwr.diplomaproject.model.dto.DiplomaSessionDto
import pwr.diplomaproject.model.dto.FieldOfStudyDto
import pwr.diplomaproject.model.dto.ScheduleDto
import pwr.diplomaproject.service.CourseOfStudyService
import pwr.diplomaproject.service.FacultyService
import pwr.diplomaproject.service.GraduationService
import pwr.diplomaproject.service.ScheduleService

@RestController
@RequestMapping("/general")
class GeneralController @Autowired constructor(
    private val scheduleService: ScheduleService,
    private val courseOfStudyService: CourseOfStudyService,
    private val graduationService: GraduationService,
    private val facultyService: FacultyService
){

    @Operation(summary = "Zwraca wszystkie harmonogramy")
    @GetMapping("/schedule")
    fun getSchedules(): List<ScheduleDto> =
        scheduleService.getSchedules()

    @Operation(summary = "Zwraca harmonogram według id")
    @GetMapping("/schedule", params = ["id"])
    fun getSchedule(@RequestParam id: Long): ScheduleDto =
        scheduleService.getScheduleById(id)

    @Operation(summary = "Zwraca wszystkie kierunki")
    @GetMapping("/field-of-study")
    fun getFieldsOfStudy(): List<FieldOfStudyDto> =
        courseOfStudyService.getAll()

    @Operation(summary = "Zwraca kierunek według id")
    @GetMapping("/field-of-study", params = ["id"])
    fun getFieldOfStudyById(@RequestParam id: Long): FieldOfStudyDto =
        courseOfStudyService.getById(id)

    @Operation(summary = "Zwraca wszystkie dyplomowania według kierunku lub wydziału")
    @GetMapping("/diploma-session")
    fun getDiplomaSessions(
        @RequestParam(required = false) fieldOfStudyId: Long?,
        @RequestParam(required = false) departmentId: Long?): List<DiplomaSessionDto> =
        graduationService.getByCourseOfStudyIdOrFacultyId(fieldOfStudyId, departmentId)

    @Operation(summary = "Zwraca dyplomowanie według id")
    @GetMapping("/diploma-session", params = ["id"])
    fun getDiplomaSession(@RequestParam id: Long): DiplomaSessionDto =
        graduationService.getById(id)

    @Operation(summary = "Zwraca wszystkie wydziały")
    @GetMapping("/department")
    fun getDepartments(): List<DepartmentDto> =
        facultyService.getAll()

    @Operation(summary = "Zwraca wydział według id")
    @GetMapping("department", params = ["id"])
    fun getDepartment(@RequestParam id: Long): DepartmentDto =
        facultyService.getById(id)
}