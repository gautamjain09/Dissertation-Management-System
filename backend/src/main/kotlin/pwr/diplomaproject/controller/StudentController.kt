package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.StudentDto
import pwr.diplomaproject.service.UserService

@RestController
@RequestMapping("/student")
class StudentController @Autowired constructor(
    private val userService: UserService
){

    @Operation(summary = "Student według id")
    @GetMapping(params = ["id"])
    fun getStudentById(@RequestParam id: Long): StudentDto =
        userService.getStudentById(id)

    @Operation(summary = "Studenci według id dyplomowania")
    @GetMapping
    fun getStudentByDiplomaSessionId(@RequestParam(required = false) diplomaSessionId: Long?): List<StudentDto> =
        userService.getStudentsByGraduationId(diplomaSessionId)
}