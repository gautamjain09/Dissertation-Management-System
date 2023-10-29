package pwr.jsos.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerEndpointsConfiguration
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter
import org.springframework.security.oauth2.provider.token.TokenStore
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore
import java.security.KeyPair

@EnableAuthorizationServer
@Import(AuthorizationServerEndpointsConfiguration::class)
@Configuration
class JwkSetConfiguration @Autowired constructor(
        private val authenticationManager: AuthenticationManager,
        private val keyPair: KeyPair
) : AuthorizationServerConfigurerAdapter() {

    override fun configure(endpoints: AuthorizationServerEndpointsConfigurer?) {
        with(endpoints!!) {
            authenticationManager(authenticationManager)
            tokenStore(tokenStore())
            accessTokenConverter(accessTokenConverter())
        }
    }

    override fun configure(clients: ClientDetailsServiceConfigurer?) {
        clients!!.inMemory()
                .withClient("public")
                .authorizedGrantTypes("password", "refresh_token")
                .scopes("*")
                .secret("{noop}")
    }

    private fun tokenStore(): TokenStore = JwtTokenStore(accessTokenConverter())

    private fun accessTokenConverter(): JwtAccessTokenConverter {
        val converter = MockUserJwtAccessTokenConverter()
        converter.setKeyPair(keyPair)
        return converter
    }
}