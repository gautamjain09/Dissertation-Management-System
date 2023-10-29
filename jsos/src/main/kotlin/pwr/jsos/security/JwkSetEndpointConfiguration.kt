package pwr.jsos.security

import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerSecurityConfiguration
import pwr.jsos.security.JwkSetEndpoint.Companion.JWKS_PATH

@Configuration
@Order(1)
class JwkSetEndpointConfiguration : AuthorizationServerSecurityConfiguration() {

    override fun configure(http: HttpSecurity?) {
        http!!
            .cors().disable()
            .requestMatchers()
                .mvcMatchers(JWKS_PATH)
                .and()
            .authorizeRequests()
                .mvcMatchers(JWKS_PATH).permitAll()
    }
}