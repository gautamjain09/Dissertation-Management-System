package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.form.CoordinatorCommentForm
import pwr.diplomaproject.service.CoordinatorSubjectService

@RestController
@RequestMapping("/coordinator/subject")
class CoordinatorSubjectController @Autowired constructor(
    private val coordinatorSubjectService: CoordinatorSubjectService
) {

    @Operation(summary = "Do weryfikacji - zaproponowane tematy prac dyplomowych")
    @GetMapping("/to-verify")
    fun getSubjectsToVerify(): List<SubjectDto> =
        coordinatorSubjectService.getSubjectsToVerify()

    @Operation(summary = "Zweryfikowane - zaproponowane tematy")
    @GetMapping("/verified")
    fun getSubjectsVerified(): List<SubjectDto> =
        coordinatorSubjectService.getSubjectsVerified()

    @Operation(summary = "Szczegóły zaproponowanego tematu")
    @GetMapping("/{id}")
    fun getSubject(@PathVariable id: Long): SubjectDetailsDto =
        coordinatorSubjectService.getSubject(id)

    @Operation(summary = "Zaakceptowanie zaproponowanego tematu")
    @PostMapping("/accept", params = ["id"])
    fun acceptSubject(@RequestParam id: Long): SubjectDetailsDto =
        coordinatorSubjectService.acceptSubject(id)

    @Operation(summary = "Zgłoszenie uwag do zaproponowanego tematu")
    @PostMapping("/comment")
    fun commentSubject(@RequestBody form: CoordinatorCommentForm): SubjectDetailsDto =
        coordinatorSubjectService.commentSubject(form)

    @Operation(summary = "Odrzucenie zaproponowanego tematu")
    @PostMapping("/reject")
    fun rejectSubject(@RequestBody form: CoordinatorCommentForm): SubjectDetailsDto =
        coordinatorSubjectService.rejectSubject(form)
}
