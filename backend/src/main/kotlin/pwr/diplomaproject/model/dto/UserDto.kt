package pwr.diplomaproject.model.dto

data class UserDto(
    val id: Long,
    val firstName: String,
    val lastName: String,
    val roles: List<UserRoleDto>
)
