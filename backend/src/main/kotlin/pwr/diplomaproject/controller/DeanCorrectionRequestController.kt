package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.RequestDto
import pwr.diplomaproject.model.dto.TopicCorrectionRequestDetailsDto
import pwr.diplomaproject.model.form.RequestIdForm
import pwr.diplomaproject.service.DeanCorrectionRequestService
import pwr.diplomaproject.util.userId
import java.security.Principal

@RestController
@RequestMapping("/dean/request/correction")
class DeanCorrectionRequestController @Autowired constructor(
    private val deanCorrectionRequestService: DeanCorrectionRequestService
) {

    @Operation(summary = "Do rozpatrzenia - wnioski o doprecyzowanie tematu")
    @GetMapping("/to-consider")
    fun getCorrectionRequestsToConsider(): List<RequestDto> =
        deanCorrectionRequestService.getCorrectionRequestsToConsider()

    @Operation(summary = "Rozpatrzone - wnioski o doprecyzowanie tematu")
    @GetMapping("/considered")
    fun getCorrectionRequestsConsidered(): List<RequestDto> =
        deanCorrectionRequestService.getCorrectionRequestsConsidered()

    @Operation(summary = "Szczegóły wniosku o doprecyzowanie tematu")
    @GetMapping("/{id}")
    fun getCorrectionRequest(@PathVariable id: Long): TopicCorrectionRequestDetailsDto =
        deanCorrectionRequestService.getCorrectionRequest(id)

    @Operation(summary = "Zaakceptowanie wniosku o doprecyzowanie tematu")
    @PostMapping("/accept")
    fun acceptCorrectionRequest(
        principal: Principal,
        @RequestBody form: RequestIdForm): Unit =
        deanCorrectionRequestService.acceptCorrectionRequest(principal.userId, form.requestId)

    @Operation(summary = "Odrzucenie wniosku o doprecyzowanie tematu")
    @PostMapping("/reject")
    fun rejectCorrectionRequest(
        principal: Principal,
        @RequestBody form: RequestIdForm): Unit =
        deanCorrectionRequestService.rejectCorrectionRequest(principal.userId, form.requestId)
}