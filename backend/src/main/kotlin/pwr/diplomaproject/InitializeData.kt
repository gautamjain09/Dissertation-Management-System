package pwr.diplomaproject

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.core.io.ClassPathResource
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator
import org.springframework.stereotype.Component
import javax.sql.DataSource


@Component
class InitializeData {
    @Autowired
    private val dataSource: DataSource? = null

    @EventListener(ApplicationReadyEvent::class)
    fun loadData() {
        val resourceDatabasePopulator = ResourceDatabasePopulator(false, false, "UTF-8", ClassPathResource("data.sql"))
        resourceDatabasePopulator.execute(dataSource!!)
    }
}
