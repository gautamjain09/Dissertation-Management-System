package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.LecturerSubjectToCorrectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.form.LecturerTopicCorrectionForm
import pwr.diplomaproject.service.LecturerSubjectService
import pwr.diplomaproject.util.userId
import java.security.Principal

@RestController
@RequestMapping("/lecturer/subject")
class LecturerSubjectController @Autowired constructor(
    private val lecturerSubjectService: LecturerSubjectService
){

    @Operation(summary = "Zgłoszone tematy przez prowadzącego")
    @GetMapping("/proposed")
    fun getProposedSubjects(principal: Principal): List<SubjectDto> =
        lecturerSubjectService.getProposedSubjects(principal.userId)

    @Operation(summary = "Szczegóły tematu zgłoszonego przez prowadzącego")
    @GetMapping("/proposed/{id}")
    fun getProposedSubject(@PathVariable id: Long): SubjectDetailsDto =
        lecturerSubjectService.getProposedSubject(id)

    @Operation(summary = "Propozycje studentów tematów z udziałem prowadzącego")
    @GetMapping("/student-propositions")
    fun getStudentProposedSubjects(principal: Principal): List<SubjectDto> =
        lecturerSubjectService.getStudentProposedSubjects(principal.userId)

    @Operation(summary = "Szczegóły propozycji tematu studentów")
    @GetMapping("/student-propositions/{id}")
    fun getStudentProposedSubject(@PathVariable id: Long): SubjectDetailsDto =
        lecturerSubjectService.getStudentProposedSubject(id)

    @Operation(summary = "Akceptacja tematu zaproponowanego przez studenta/ów")
    @PostMapping("/student-propositions/accept", params = ["id"])
    fun acceptProposedSubject(
        principal: Principal,
        @RequestParam id: Long): SubjectDetailsDto =
        lecturerSubjectService.acceptProposedSubject(principal.userId, id)

    @Operation(summary = "Odrzucenie tematu zaproponowanego przez studenta/ów")
    @PostMapping("/student-propositions/reject")
    fun rejectProposedSubject(
        principal: Principal,
        @RequestParam id: Long): SubjectDetailsDto =
        lecturerSubjectService.rejectProposedSubject(principal.userId, id)

    @Operation(summary = "Tematy do poprawy")
    @GetMapping("/to-correct")
    fun getSubjectsToCorrect(principal: Principal): List<SubjectDto> =
        lecturerSubjectService.getSubjectsToCorrect(principal.userId)

    @Operation(summary = "Szczegóły tematu do poprawy")
    @GetMapping("/to-correct/{id}")
    fun getSubjectToCorrect(
        principal: Principal,
        @PathVariable id: Long): LecturerSubjectToCorrectDetailsDto =
        lecturerSubjectService.getSubjectToCorrect(principal.userId, id)

    @Operation(summary = "Poprawienie tematu oznaczonego jako do poprawy")
    @PostMapping("/to-correct")
    fun correctSubject(
        principal: Principal,
        @RequestBody form: LecturerTopicCorrectionForm): SubjectDetailsDto =
        lecturerSubjectService.correctSubject(principal.userId, form)
}