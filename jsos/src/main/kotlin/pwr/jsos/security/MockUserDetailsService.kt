package pwr.jsos.security

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException

class MockUserDetailsService : UserDetailsService {

    companion object {
        val charToRole = mapOf(
            'a' to GrantedAuthority { "ADMIN" },
            's' to GrantedAuthority { "STUDENT" },
            'l' to GrantedAuthority { "LECTURER" },
            'd' to GrantedAuthority { "DEAN" },
            'c' to GrantedAuthority { "COORDINATOR" },
            'p' to GrantedAuthority { "PROGRAM_COMMITTEE_MEMBER" },
            'm' to GrantedAuthority { "DIPLOMA_SECTION_MEMBER" }
        )
    }

    override fun loadUserByUsername(username: String?): UserDetails {
        if (!isUsernameValid(username)) {
            throw UsernameNotFoundException("Username '${username}' does not match mocked user pattern")
        }

        val (roles, id) = username!!.split("_")

        val authorities = roles.toCharArray().map { charToRole[it]!! }.toMutableSet()

        return MockUserDetails(id, username, authorities)
    }

    private fun isUsernameValid(username: String?): Boolean {
        if (username.isNullOrBlank()) {
            return false
        }
        val parts = username.split('_')
        if (parts.size != 2) {
            return false
        }
        if (!parts[0].toCharArray().all { charToRole.containsKey(it) }) {
            return false
        }
        if (parts[1].toIntOrNull() == null) {
            return false
        }
        return true
    }
}