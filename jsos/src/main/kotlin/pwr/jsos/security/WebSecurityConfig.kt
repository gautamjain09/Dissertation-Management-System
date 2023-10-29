package pwr.jsos.security

import org.springframework.context.annotation.Bean
import org.springframework.core.annotation.Order
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.UserDetailsService
import java.security.KeyPair
import java.security.KeyPairGenerator

@EnableWebSecurity
@Order(2)
class WebSecurityConfig : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity?) {
        http?.cors()?.disable()
    }

    @Bean
    override fun userDetailsService(): UserDetailsService = MockUserDetailsService()

    @Bean
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }

    @Bean
    fun generateRsaKey(): KeyPair = with(KeyPairGenerator.getInstance("RSA")) {
        initialize(2048)
        generateKeyPair()
    }
}