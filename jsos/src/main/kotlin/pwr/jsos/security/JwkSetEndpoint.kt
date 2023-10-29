package pwr.jsos.security

import com.nimbusds.jose.jwk.JWKSet
import com.nimbusds.jose.jwk.RSAKey
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.oauth2.provider.endpoint.FrameworkEndpoint
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody
import java.security.KeyPair
import java.security.interfaces.RSAPublicKey

@FrameworkEndpoint
class JwkSetEndpoint @Autowired constructor(
        private val keyPair: KeyPair
) {

    companion object {
        const val JWKS_PATH = "/.well-known/jwks.json"
    }

    @GetMapping(JWKS_PATH)
    @ResponseBody
    fun getKey(): Map<String, Any> {
        val key = RSAKey.Builder(keyPair.public as RSAPublicKey).build()
        return JWKSet(key).toJSONObject()
    }
}