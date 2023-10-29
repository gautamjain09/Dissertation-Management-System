package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.GroupMember

@Repository
interface GroupMemberRepository : JpaRepository<GroupMember, Long> {
    @Query(value = "select max(g.id) + 1 from GroupMember g")
    fun getNextId(): Long
}
