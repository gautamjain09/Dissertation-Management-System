package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.EmployeeDto
import pwr.diplomaproject.model.enum.EmployeeType
import pwr.diplomaproject.service.UserService

@RestController
@RequestMapping("/employee")
class EmployeeController @Autowired constructor(
    private val userService: UserService
){

    @Operation(summary = "Zwraca pracownika według id")
    @GetMapping(params = ["id"])
    fun getEmployeeById(@RequestParam id: Long): EmployeeDto =
        userService.getEmployeeById(id)

    @Operation(summary = "Zwraca pracowników według typu i id dyplomowania")
    @GetMapping
    fun getEmployeesByRoleOrDiplomaSessionId(
        @RequestParam(required = false) role: EmployeeType?,
        @RequestParam(required = false) diplomaSessionId: Long?): List<EmployeeDto> =
        userService.getEmployeesByTypeOrGraduationId(role, diplomaSessionId)
}