package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.service.StudentSubjectService
import pwr.diplomaproject.util.userId
import java.security.Principal

@RestController
@RequestMapping("/student/subject")
class StudentSubjectController(
    private val studentSubjectService: StudentSubjectService
) {

    @Operation(summary = "Dostępne tematy do zarezerwowania przez zalogowanego studenta w podanej sesji dyplomowania")
    @GetMapping("/available")
    fun getAvailableSubjects(
        @RequestParam studentId: Long,
        @RequestParam diplomaSessionId: Long,
    ): List<SubjectDto> =
        studentSubjectService.getAvailableSubjects(studentId, diplomaSessionId)

    @Operation(summary = "Propozycje tematów złożone przez zalogowanego studenta w podanej sesji dyplomowania")
    @GetMapping("/proposed")
    fun getProposedSubjects(
        @RequestParam studentId: Long,
        @RequestParam diplomaSessionId: Long,
    ): List<SubjectDto> =
        studentSubjectService.getProposedSubjects(studentId, diplomaSessionId)

    @Operation(summary = "Usunięcie propozycji tematu studenta")
    @PostMapping("/delete", params = ["id"])
    fun deleteProposedSubject(
        principal: Principal,
        @RequestParam id: Long): Unit =
        studentSubjectService.deleteProposedSubject(principal.userId, id)
}