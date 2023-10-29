package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.UserPersonDto
import pwr.diplomaproject.model.entity.User

class UserPersonDtoFactory {

    companion object {

        fun create(user: User): UserPersonDto = UserPersonDto(
            user.id,
            user.firstName,
            user.lastName
        )
    }
}