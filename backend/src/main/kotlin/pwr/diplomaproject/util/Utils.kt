package pwr.diplomaproject.util

import java.security.Principal

val Principal.userId: Long
    get() = name.toLong()