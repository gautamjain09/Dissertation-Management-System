package pwr.diplomaproject.security

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.web.servlet.invoke

@Configuration
class JwtSecurityConfig : WebSecurityConfigurerAdapter() {

    companion object {
        private val ADMIN = "ADMIN"
        private val STUDENT = "STUDENT"
        private val LECTURER = "LECTURER"
        private val DEAN = "DEAN"
        private val COORDINATOR = "COORDINATOR"
        private val PROGRAM_COMMITTEE_MEMBER = "PROGRAM_COMMITTEE_MEMBER"
        private val DIPLOMA_SECTION_MEMBER = "DIPLOMA_SECTION_MEMBER"
    }

    override fun configure(http: HttpSecurity?) {
        http!! {
            cors { disable() }
            authorizeRequests {
                authorize("/student/**", hasAnyRole(STUDENT))
                authorize("/lecturer/**", hasAnyRole(LECTURER))
                authorize("/dean/**", hasAnyRole(DEAN))
                authorize("/coordinator/**", hasAnyRole(COORDINATOR))
                authorize("/commission/**", hasAnyRole(PROGRAM_COMMITTEE_MEMBER))
                authorize("/graduation/**", hasAnyRole(DIPLOMA_SECTION_MEMBER))
                authorize("/admin/**", hasAnyRole(ADMIN))
                authorize("/swagger-ui.html", permitAll)
                authorize("/swagger-ui/**", permitAll)
                authorize("/v3/api-docs", permitAll)
                authorize(anyRequest, authenticated)
            }
        }
        http!!.oauth2ResourceServer { oauth2 -> oauth2.jwt() }
    }
}
