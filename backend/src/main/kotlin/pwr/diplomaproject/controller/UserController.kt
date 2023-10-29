package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.UserDto
import pwr.diplomaproject.service.UserService
import pwr.diplomaproject.util.userId
import java.security.Principal

@RestController
@RequestMapping("/user")
class UserController @Autowired constructor(
    private val userService: UserService
) {

    @Operation(summary = "Zwraca listę ról użytkownika -  i employeeId z typem pracownika dostępnych pracowników")
    @GetMapping
    fun getUser(principal: Principal): UserDto =
        userService.getUser(principal.userId)
}