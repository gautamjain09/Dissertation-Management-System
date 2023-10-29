package pwr.diplomaproject.security

import com.nimbusds.jose.shaded.json.JSONArray
import org.springframework.core.convert.converter.Converter
import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter
import org.springframework.stereotype.Service

@Service
class MockUserJwtAuthenticationConverter : JwtAuthenticationConverter() {

    init {
        setPrincipalClaimName("user_id")
    }

    override fun extractAuthorities(jwt: Jwt?): MutableCollection<GrantedAuthority> {
        return (jwt?.claims?.get("authorities") as JSONArray?)?.toArray()?.map { GrantedAuthority { "ROLE_${it}" } }?.toMutableSet()
                ?: mutableSetOf()
    }
}