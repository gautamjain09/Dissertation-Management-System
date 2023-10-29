package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.Role

data class UserRoleDto (
    val id: Long,
    val role: Role
)