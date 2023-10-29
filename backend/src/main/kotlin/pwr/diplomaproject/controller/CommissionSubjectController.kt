package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.form.ThesisIdForm
import pwr.diplomaproject.service.CommissionSubjectService

@RestController
@RequestMapping("/commission/subject")
class CommissionSubjectController @Autowired constructor(
    private val commissionSubjectService: CommissionSubjectService
){

    @Operation(summary = "Do weryfikacji - zgłoszone tematy")
    @GetMapping("/to-verify")
    fun getSubjectsToVerify(): List<SubjectDto> =
        commissionSubjectService.getSubjectsToVerify()

    @Operation(summary = "Zweryfikowane - zgłoszone tematy")
    @GetMapping("/verified")
    fun getSubjectVerified(): List<SubjectDto> =
        commissionSubjectService.getSubjectsVerified()

    @Operation(summary = "Szczegóły tematu do rozpatrzenia")
    @GetMapping("{id}")
    fun getSubject(@PathVariable id: Long): SubjectDetailsDto =
        commissionSubjectService.getSubject(id)

    @Operation(summary = "Zaakceptowanie zgłoszonego tematu")
    @PostMapping("/accept", params = ["id"])
    fun acceptSubject(@RequestParam id: Long): SubjectDetailsDto =
        commissionSubjectService.acceptSubject(id)

    @Operation(summary = "Odrzucenie zgłoszonego tematu")
    @PostMapping("/reject")
    fun rejectSubject(@RequestBody form: ThesisIdForm): SubjectDetailsDto =
        commissionSubjectService.rejectSubject(form.thesisId)
}