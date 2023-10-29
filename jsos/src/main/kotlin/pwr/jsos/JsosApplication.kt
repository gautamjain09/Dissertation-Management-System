package pwr.jsos

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer

@EnableAuthorizationServer
@SpringBootApplication
class JsosApplication

fun main(args: Array<String>) {
	runApplication<JsosApplication>(*args)
}
