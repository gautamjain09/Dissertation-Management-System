package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.LecturerCourseOfStudyDto
import pwr.diplomaproject.service.LecturerCoursesOfStudyService
import pwr.diplomaproject.util.userId
import java.security.Principal

@RestController
@RequestMapping("/lecturer/courses-of-study")
class LecturerCoursesOfStudyController @Autowired constructor(
    private val lecturerCoursesOfStudyService: LecturerCoursesOfStudyService
){

    @Operation(summary = "Dostępne kierunki zalogowanego prowadzącego")
    @GetMapping
    fun getCoursesOfStudy(principal: Principal): List<LecturerCourseOfStudyDto> =
        lecturerCoursesOfStudyService.getCoursesOfStudy(principal.userId)
}