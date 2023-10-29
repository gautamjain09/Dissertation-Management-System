package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.ChangeRequestDto
import pwr.diplomaproject.model.dto.RequestDto
import pwr.diplomaproject.model.dto.TopicChangeRequestDetailsDto
import pwr.diplomaproject.model.form.RequestIdForm
import pwr.diplomaproject.service.CommissionChangeRequestService
import pwr.diplomaproject.util.userId
import java.security.Principal

@RestController
@RequestMapping("/commission/request/change")
class CommissionChangeRequestController @Autowired constructor(
    private val commissionChangeRequestService: CommissionChangeRequestService
){

    @Operation(summary = "Do rozpatrzenia - wnioski o zmianę tematu")
    @GetMapping("/to-consider")
    fun getChangeRequestsToConsider(): List<RequestDto> =
        commissionChangeRequestService.getChangeRequestsConsidered()

    @Operation(summary = "Rozpatrzone - wnioski o zmianę tematu")
    @GetMapping("/considered")
    fun getChangeRequestsConsidered(): List<RequestDto> =
        commissionChangeRequestService.getChangeRequestsToConsider()

    @Operation(summary = "Szczegóły wniosku o zmianę tematu")
    @GetMapping("/{id}")
    fun getChangeRequest(@PathVariable id: Long): TopicChangeRequestDetailsDto =
        commissionChangeRequestService.getChangeRequest(id)

    @Operation(summary = "Zaakceptowanie wniosku o zmianę tematu")
    @PostMapping("/accept")
    fun acceptChangeRequest(
        principal: Principal,
        @RequestBody form: RequestIdForm): ChangeRequestDto =
        commissionChangeRequestService.acceptChangeRequest(principal.userId, form.requestId)

    @Operation(summary = "Odrzucenie wniosku o zmianę tematu")
    @PostMapping("/reject")
    fun rejectChangeRequest(
        principal: Principal,
        @RequestBody form: RequestIdForm): ChangeRequestDto =
        commissionChangeRequestService.rejectChangeRequest(principal.userId, form.requestId)
}