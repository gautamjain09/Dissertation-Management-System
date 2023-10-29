package pwr.diplomaproject.model.enum

enum class Role {
    STUDENT,
    ADMIN,
    LECTURER,
    DEAN,
    COORDINATOR,
    PROGRAM_COMMITTEE_MEMBER,
    DIPLOMA_SECTION_MEMBER;

    companion object {

        fun convert(employeeType: EmployeeType): Role =
            when(employeeType) {
                EmployeeType.ADMIN -> ADMIN
                EmployeeType.DEAN -> DEAN
                EmployeeType.LECTURER -> LECTURER
                EmployeeType.COORDINATOR -> COORDINATOR
                EmployeeType.PROGRAM_COMMITTEE_MEMBER -> PROGRAM_COMMITTEE_MEMBER
                EmployeeType.DIPLOMA_SECTION_MEMBER -> DIPLOMA_SECTION_MEMBER
            }
    }
}