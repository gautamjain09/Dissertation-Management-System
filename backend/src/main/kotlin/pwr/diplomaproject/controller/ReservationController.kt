package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.ReservationDto
import pwr.diplomaproject.service.StudentReservationService

@RestController
@RequestMapping("/reservation")
class ReservationController @Autowired constructor(
    private val studentReservationService: StudentReservationService
) {

    @Operation(summary = "Rezerwacje wg studenta, promotora lub sesji dyplomowania")
    @GetMapping
    fun getReservations(
        @RequestParam(required = false) studentId: Long?,
        @RequestParam(required = false) supervisorId: Long?,
        @RequestParam(required = false) diplomaSessionId: Long?
    ): List<ReservationDto> =
        studentReservationService.getReservations(studentId, supervisorId, diplomaSessionId)

    @Operation(summary = "Dane rezerwacji studenta")
    @GetMapping(params = ["id"])
    fun getReservation(
        @RequestParam id: Long
    ): ReservationDto =
        studentReservationService.getReservationById(id)
}