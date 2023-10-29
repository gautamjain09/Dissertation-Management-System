package pwr.jsos.security

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class MockUserDetails(
        val id: String,
        private val _username: String,
        private val _authorities: MutableCollection<GrantedAuthority>
) : UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> = _authorities

    override fun getPassword(): String = "{noop}password"

    override fun getUsername(): String = _username

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true

    override fun isCredentialsNonExpired(): Boolean = true

    override fun isEnabled(): Boolean = true
}