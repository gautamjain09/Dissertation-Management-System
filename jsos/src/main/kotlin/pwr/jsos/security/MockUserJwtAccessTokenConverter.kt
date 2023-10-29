package pwr.jsos.security

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken
import org.springframework.security.oauth2.common.OAuth2AccessToken
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter

class MockUserJwtAccessTokenConverter : JwtAccessTokenConverter() {

    override fun enhance(accessToken: OAuth2AccessToken?, authentication: OAuth2Authentication?): OAuth2AccessToken {
        val user = authentication!!.principal as MockUserDetails
        (accessToken!! as DefaultOAuth2AccessToken).additionalInformation = mapOf("user_id" to user.id)
        return super.enhance(accessToken, authentication)
    }
}