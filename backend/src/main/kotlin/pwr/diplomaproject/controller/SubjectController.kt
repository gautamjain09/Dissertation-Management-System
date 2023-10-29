package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.model.form.NewSubjectForm
import pwr.diplomaproject.service.LecturerSubjectService
import pwr.diplomaproject.service.StudentSubjectService
import pwr.diplomaproject.service.SubjectService

@RestController
@RequestMapping("/subject")
class SubjectController @Autowired constructor(
    private val subjectService: SubjectService,
    private val studentSubjectService: StudentSubjectService,
    private val lecturerSubjectService: LecturerSubjectService
){

    @Operation(summary = "Tematy według statusu, dyplomowania, proponującego studenta lub prowadzącego")
    @GetMapping
    fun getSubjects(
        @RequestParam(required = false) status: TopicStatus?,
        @RequestParam(required = false) diplomaSessionId: Long?,
        @RequestParam(required = false) proposedByStudentId: Long?,
        @RequestParam(required = false) supervisorId: Long?): List<SubjectDetailsDto> =
        subjectService.getSubjects(status, diplomaSessionId, proposedByStudentId, supervisorId)

    @Operation(summary = "Szczegóły tematu")
    @GetMapping(params = ["id"])
    fun getSubject(@RequestParam id: Long): SubjectDetailsDto =
        subjectService.getDetails(id)

    @Operation(summary = "Dodanie nowego tematu")
    @PostMapping
    fun addSubject(@RequestBody form: NewSubjectForm): SubjectDetailsDto {
        return if (form.reportedByStudent)
            studentSubjectService.proposeSubject(form)
        else
            lecturerSubjectService.proposeSubject(form)
    }
}