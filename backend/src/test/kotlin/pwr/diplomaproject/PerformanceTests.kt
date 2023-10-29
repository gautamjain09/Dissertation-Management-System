package pwr.diplomaproject

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.util.StopWatch
import pwr.diplomaproject.controller.SubjectController
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.EmployeeType
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.repository.EmployeeRepository
import pwr.diplomaproject.repository.GraduationRepository
import pwr.diplomaproject.repository.SubjectRepository
import java.time.LocalDate

@SpringBootTest
class PerformanceTests {

    companion object {
        private val SUBJECT_COUNT = 1000
        private val QUERY_COUNT = 2000
    }

    @Autowired
    private lateinit var subjectController: SubjectController
    @Autowired
    private lateinit var employeeRepository: EmployeeRepository
    @Autowired
    private lateinit var graduationRepository: GraduationRepository
    @Autowired
    private lateinit var subjectRepository: SubjectRepository

    @Test
    fun testPerformance() {
        val stopWatch = StopWatch()

        prepareDatabase()
        stopWatch.start()
        test()
        stopWatch.stop()

        println("${SUBJECT_COUNT} subjects x ${QUERY_COUNT} queries took ${stopWatch.totalTimeSeconds} seconds")
    }

    private fun prepareDatabase() {

        val graduation = graduationRepository.findAll()[0]!!
        val employee = employeeRepository.findAll().find { it.type == EmployeeType.LECTURER }!!

        repeat(SUBJECT_COUNT) {
            subjectRepository.save(Topic(subjectRepository.getNextId(), employee, null, graduation, "topic", "description", 2, TopicStatus.APPROVED_BY_COMMITTEE, "comments", false, LocalDate.now()))
        }
    }

    private fun test() {
        repeat(QUERY_COUNT) {
            subjectController.getSubjects(TopicStatus.APPROVED_BY_COMMITTEE, null, null)
        }
    }
}