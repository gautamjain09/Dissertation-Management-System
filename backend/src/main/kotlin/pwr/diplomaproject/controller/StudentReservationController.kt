package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.ReservationDto
import pwr.diplomaproject.model.form.StudentReservationForm
import pwr.diplomaproject.service.StudentReservationService

@RestController
@RequestMapping("/student/reservation")
class StudentReservationController(
    private val studentReservationService: StudentReservationService
) {

    @Operation(summary = "Potwierdzenie rezerwacji przez studenta (wstępne lub ostateczne)")
    @PostMapping("/approve", params = ["studentId", "reservationId"])
    fun approveReservation(
        @RequestParam studentId: Long,
        @RequestParam reservationId: Long
    ): ReservationDto =
        studentReservationService.approveReservation(studentId, reservationId)!!

    @Operation(summary = "Odrzucenie rezerwacji")
    @PostMapping("/cancel", params = ["studentId", "reservationId"])
    fun cancelReservation(
        @RequestParam studentId: Long,
        @RequestParam reservationId: Long
    ): ReservationDto =
        studentReservationService.cancelReservation(studentId, reservationId)

    @Operation(summary = "Rezerwacja tematu (i zgłoszenie grupy)")
    @PostMapping(params = ["studentId"])
    fun makeReservation(
        @RequestParam studentId: Long,
        @RequestBody form: StudentReservationForm
    ): ReservationDto =
        studentReservationService.makeReservation(studentId, form)
}