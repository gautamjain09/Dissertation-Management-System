package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.User

abstract class NotificationAlert(private val recipients: List<User>, private val content: String) {
    fun send() {
        println("************************************")
        println("Notification to: ${recipients.map { it.fullName() + " (${it.email})" }}")
        println(content)
        println("************************************")
    }

    companion object {
        fun constructContent(content: String, params: Map<String, String>): String {
            var editableContent: String = content
            for ((key, value) in params) {
                editableContent = editableContent.replace(key, value)
            }
            return editableContent
        }
    }
}