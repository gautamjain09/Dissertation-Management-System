package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.NotificationDto
import pwr.diplomaproject.model.form.NotificationForm
import pwr.diplomaproject.service.AdminNotificationService

@RestController
@RequestMapping("/admin/notification")
class AdminNotificationController @Autowired constructor(
    private val adminNotificationService: AdminNotificationService
) {

    @Operation(summary = "Zwraca listę powiadomień")
    @GetMapping
    fun getNotifications(): List<NotificationDto> =
        adminNotificationService.getNotifications()

    @Operation(summary = "Uaktualnia powiadomienie")
    @PostMapping
    fun updateNotification(
        @RequestBody form: NotificationForm
    ): Unit =
        adminNotificationService.updateNotification(form)
}