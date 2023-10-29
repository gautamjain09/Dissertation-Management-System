package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.User

@Repository
interface UserRepository : JpaRepository<User, Long>
