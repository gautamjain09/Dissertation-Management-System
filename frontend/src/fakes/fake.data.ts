import { Role } from '../app/base/models/dto/role.model';
import { AuthData } from '../app/base/models/auth-data.model';
import { User } from '../app/base/models/dto/user.model';
import { ApiLabel } from '../app/core/models/api-route.model';
import { Dictionary } from '../app/core/models/dictionary.model';
import { Thesis } from '../app/base/models/dto/thesis.model';
import { ThesisStatus } from '../app/base/models/dto/topic-status.model';
import { Reservation } from '../app/base/models/dto/reservation.model';
import { ReservationStatus } from '../app/base/models/dto/reservation-status.model';
import { ClarificationRequest } from '../app/base/models/dto/clarification-request.model';
import { RequestStatus } from '../app/base/models/dto/request-status.model';
import { ChangeRequest } from '../app/base/models/dto/change-request.model';
import { Timetable } from '../app/base/models/dto/timetable.model';
import { isNil } from 'lodash-es';
import { DiplomaSession } from '../app/base/models/dto/diploma-session.model';
import { Employee } from '../app/base/models/dto/employee.model';
import { EmployeeRole } from '../app/base/models/dto/employee-role.model';
import { IdType, WithId } from '../app/base/models/dto/id.model';
import { UserPerson } from '../app/base/models/dto/user-person.model';
import { FieldOfStudy } from '../app/base/models/dto/field-of-study.model';
import { StudyDegree } from '../app/base/models/dto/study-degree.model';
import { Student } from '../app/base/models/dto/student.model';
import { ReservationMember } from '../app/base/models/dto/reservation-member.model';
import { ReservationMemberStatus } from '../app/base/models/dto/reservation-member-status.model';
import { RequestParams } from '../app/core/models/request-param.model';
import { isNotNil } from '../app/core/tools/is-not-nil';
import { firstItem } from '../app/core/tools/first-item';
import { NotificationTemplate } from '../app/base/models/dto/notification.model';
import { NotificationType } from '../app/base/models/dto/notification-type.model';

const userId: IdType = '1';

const studentId: IdType = '1400';
const student2Id: IdType = '1491';

const adminId: IdType = '110';
const deanId: IdType = '63';
const lecturerId: IdType = '24';
const coordinatorId: IdType = '185';
const dsMemberId: IdType = '140';
const pcMemberId: IdType = '176';

const thesis1Id: IdType = '1';
const thesis2Id: IdType = '2';
const thesis3Id: IdType = '3';
const thesis4Id: IdType = '4';
const thesis5Id: IdType = '5';
const thesis6Id: IdType = '6';
const thesis7Id: IdType = '7';
const reservation1Id: IdType = '32';
const reservation2Id: IdType = '33';
const reservation3Id: IdType = '34';
const reservation4Id: IdType = '35';
const reservation5Id: IdType = '36';
const reservation6Id: IdType = '37';

const departmentId: IdType = '4';
const fieldOfStudyId: IdType = '2';
const fieldOfStudy2Id: IdType = '4';

const timetableId: IdType = '14';
const timetable2Id: IdType = '15';
const diplomaSessionId: IdType = '14';
const diplomaSession2Id: IdType = '15';


const chRequest1Id: IdType = '116';
const chRequest2Id: IdType = '117';
const chRequest3Id: IdType = '118';
const clRequest1Id: IdType = '583';
const clRequest2Id: IdType = '584';
const clRequest3Id: IdType = '585';


const userPerson: UserPerson = {
  id: userId,
  firstName: 'Jack',
  lastName: 'Daniels'
};

const user: User = {
  ...userPerson,
  roles: [
    { id: studentId, role: Role.STUDENT },
    { id: student2Id, role: Role.STUDENT },
    { id: adminId, role: Role.ADMIN },
    { id: deanId, role: Role.DEAN },
    { id: coordinatorId, role: Role.COORDINATOR },
    { id: lecturerId, role: Role.LECTURER },
    { id: dsMemberId, role: Role.DIPLOMA_SECTION_MEMBER },
    { id: pcMemberId, role: Role.PROGRAM_COMMITTEE_MEMBER }
  ]
};

const users: User[] = [user];

function createEmployee(id: IdType, departmentId: IdType, userPerson: UserPerson, role: EmployeeRole, title?: string): Employee {
  return {
    id: id,
    userId: userPerson.id,
    departmentId: departmentId,
    employeeRole: role,
    title: title ?? role,
    user: userPerson
  };
}

const admin = createEmployee(adminId, departmentId, userPerson, EmployeeRole.ADMIN, 'Admin');
const lecturer = createEmployee(lecturerId, departmentId, userPerson, EmployeeRole.LECTURER, 'Lecturer');
const dean = createEmployee(deanId, departmentId, userPerson, EmployeeRole.DEAN, 'Dean');
const coordinator = createEmployee(coordinatorId, departmentId, userPerson, EmployeeRole.COORDINATOR, 'Coordinator');
const committeeMember = createEmployee(pcMemberId, departmentId, userPerson, EmployeeRole.PROGRAM_COMMITTEE_MEMBER, 'Committee member');
const diplomaSectionMember = createEmployee(dsMemberId, departmentId, userPerson, EmployeeRole.DIPLOMA_SECTION_MEMBER, 'Diploma section member');

const employees = [dean, admin, lecturer, coordinator, committeeMember, diplomaSectionMember];


function createFieldOfStudy(id: IdType, departmentId: IdType, dsId: IdType, name: string): FieldOfStudy {
  return {
    id: id,
    departmentId: departmentId,
    degree: StudyDegree.MASTERS,
    name: name
  };
}

const fieldOfStudy: FieldOfStudy = createFieldOfStudy(fieldOfStudyId, departmentId, diplomaSessionId, 'Informatyka Stosowana');
const fieldOfStudy2: FieldOfStudy = createFieldOfStudy(fieldOfStudy2Id, departmentId, diplomaSession2Id, 'Matematyka Stosowana');

const fieldsOfStudy: FieldOfStudy[] = [fieldOfStudy, fieldOfStudy2];


function createTimetable(id: IdType, dsId: IdType, date: Date): Timetable {
  return {
    id: id,
    diplomaSessionId: dsId,
    selectingThesis: date,
    submittingThesis: date,
    changingThesis: date,
    clarificationThesis: date,
    approvingThesisByCommittee: date,
    approvingThesisByCoordinator: date
  };
}

const timetable: Timetable = createTimetable(timetableId, diplomaSessionId, new Date(2022, 1));
const timetable2: Timetable = createTimetable(timetable2Id, diplomaSession2Id, new Date(2023, 1));

const timetables: Timetable[] = [timetable, timetable2];

function createDiplomaSession(id: IdType, tt: Timetable, fos: FieldOfStudy, year: string): DiplomaSession {
  return {
    id: id,
    timetableId: tt.id,
    timetable: tt,
    fieldOfStudy: fos,
    year: year
  };
}

const diplomaSession: DiplomaSession = createDiplomaSession(diplomaSessionId, timetable, fieldOfStudy, '2021/2022');
const diplomaSession2: DiplomaSession = createDiplomaSession(diplomaSession2Id, timetable2, fieldOfStudy, '2022/2023');

const diplomaSessions: DiplomaSession[] = [
  diplomaSession,
  diplomaSession2
];


function createStudent(id: IdType, userPerson: UserPerson, fieldOfStudy: FieldOfStudy, idx: string): Student {
  return {
    id: id,
    userId: userPerson.id,
    fieldOfStudyId: fieldOfStudy.id,
    indexNumber: idx,
    fieldOfStudy: fieldOfStudy,
    user: userPerson
  };
}

const student: Student = createStudent(studentId, userPerson, fieldOfStudy, '249025');
const student2: Student = createStudent(student2Id, userPerson, fieldOfStudy, '249041');

const students: Student[] = [student, student2];


function createThesis(id: IdType, diplomaSession: DiplomaSession, status: ThesisStatus): Thesis {
  const dId = diplomaSession.fieldOfStudy.departmentId;
  const supervisor = employees.find(e => e.departmentId === dId && e.employeeRole === EmployeeRole.LECTURER)!;
  return {
    id: id,
    supervisorId: supervisor.id,
    diplomaSessionId: diplomaSession.id,
    topic: 'Predykcja zachowań ludzi podczas lockdownu',
    description: 'Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu',
    numberOfStudents: 3,
    authorStudentId: students.find(s => s.fieldOfStudyId === diplomaSession.fieldOfStudy.id)?.id,
    status: status,
    reportedByStudent: false,
    submissionDate: new Date(),
    coordinatorComment: 'Całość do poprawy',
    supervisor: supervisor
  };
}

const thesis1: Thesis = createThesis(thesis1Id, diplomaSession2, ThesisStatus.PROPOSED_BY_STUDENT);
const thesis2: Thesis = createThesis(thesis2Id, diplomaSession2, ThesisStatus.WAITING);
const thesis3: Thesis = createThesis(thesis3Id, diplomaSession2, ThesisStatus.APPROVED_BY_COORDINATOR);
const thesis4: Thesis = createThesis(thesis4Id, diplomaSession2, ThesisStatus.APPROVED_BY_COMMITTEE);
const thesis5: Thesis = createThesis(thesis5Id, diplomaSession2, ThesisStatus.TO_CORRECT);
const thesis6: Thesis = createThesis(thesis6Id, diplomaSession2, ThesisStatus.REJECTED_BY_COORDINATOR);
const thesis7: Thesis = createThesis(thesis7Id, diplomaSession2, ThesisStatus.REJECTED_BY_COMMITTEE);

const theses: Thesis[] = [thesis1, thesis2, thesis3, thesis4, thesis5, thesis6, thesis7];


function createReservationMember(resMemId: IdType, resId: IdType, student: Student, status: ReservationMemberStatus): ReservationMember {
  return {
    id: resMemId,
    reservationId: resId,
    studentId: student.id,
    student: student,
    status: status
  };
}

function createReservation(resId: IdType, thesis: Thesis, status: ReservationStatus): { reservation: Reservation, resMem: ReservationMember[] } {
  const ds = diplomaSessions.find(ds => ds.id === thesis.diplomaSessionId)!;
  const stud = students.filter(s => s.fieldOfStudyId === ds.fieldOfStudy.id).slice(0, thesis.numberOfStudents);
  const resMem = stud.map((s, i) => createReservationMember(resId + i, resId, stud[i], ReservationMemberStatus.WILLING));

  const res = {
    id: resId,
    creationDate: new Date(),
    status: status,
    thesisId: thesis.id,
    thesis: thesis,
    reservationMembers: resMem
  };
  return { reservation: res, resMem };
}

const { reservation: reservation1, resMem: reservationMembers1 } =
  createReservation(reservation1Id, thesis4, ReservationStatus.WAITING);
const { reservation: reservation2, resMem: reservationMembers2 } =
  createReservation(reservation2Id, thesis4, ReservationStatus.SUBMITTED);
const { reservation: reservation3, resMem: reservationMembers3 } =
  createReservation(reservation3Id, thesis4, ReservationStatus.ACCEPTED);
const { reservation: reservation4, resMem: reservationMembers4 } =
  createReservation(reservation4Id, thesis4, ReservationStatus.CONFIRMED);
const { reservation: reservation5, resMem: reservationMembers5 } =
  createReservation(reservation5Id, thesis4, ReservationStatus.REJECTED_BY_STUDENT);
const { reservation: reservation6, resMem: reservationMembers6 } =
  createReservation(reservation6Id, thesis4, ReservationStatus.REJECTED_BY_LECTURER);

const reservations: Reservation[] = [reservation1, reservation2, reservation3, reservation4, reservation5, reservation6];
const reservationMembers: ReservationMember[] = [
  ...reservationMembers1, ...reservationMembers2, ...reservationMembers3,
  ...reservationMembers4, ...reservationMembers5, ...reservationMembers6
];


function createClRequest(clRequestId: IdType, applicant: Student, thesis: Thesis, deanId: IdType, state: RequestStatus): ClarificationRequest {
  return {
    id: clRequestId,
    studentId: applicant.id,
    thesisId: thesis.id,
    employeeId: deanId,
    submissionDate: new Date(),
    status: state,
    newTopic: 'nowy temat pracy',
    newDescription: 'nowy opis pracy',
    baseThesis: thesis,
    student: applicant
  };
}

const clarification1Request: ClarificationRequest = createClRequest(clRequest1Id, student, thesis4, deanId, RequestStatus.WAITING);
const clarification2Request: ClarificationRequest = createClRequest(clRequest2Id, student, thesis4, deanId, RequestStatus.APPROVED);
const clarification3Request: ClarificationRequest = createClRequest(clRequest3Id, student, thesis4, deanId, RequestStatus.DISMISSED);

const clarificationRequests: ClarificationRequest[] = [clarification1Request, clarification2Request, clarification3Request];


function createChRequest(chRequestId: IdType, applicant: Student, oldThesis: Thesis, newThesis: Thesis, pcmId: IdType, state: RequestStatus): ChangeRequest {
  return {
    id: chRequestId,
    studentId: applicant.id,
    employeeId: pcmId,
    submissionDate: new Date(),
    status: state,
    newThesisId: newThesis.id,
    newThesis: newThesis,
    oldThesisId: oldThesis.id,
    previousThesis: oldThesis,
    student: applicant
  };
}

const changeRequest1: ChangeRequest = createChRequest(chRequest1Id, student, thesis4, thesis1, pcMemberId, RequestStatus.WAITING);
const changeRequest2: ChangeRequest = createChRequest(chRequest2Id, student, thesis4, thesis1, pcMemberId, RequestStatus.APPROVED);
const changeRequest3: ChangeRequest = createChRequest(chRequest3Id, student, thesis4, thesis1, pcMemberId, RequestStatus.DISMISSED);

const changeRequests: ChangeRequest[] = [changeRequest1, changeRequest2, changeRequest3];

function createNotification(type: NotificationType, content: string): NotificationTemplate {
  return { label: type, content: content };
}

const notification1 = createNotification(NotificationType.GROUP_MEMBER_UPDATED_BY_STUDENT, 'Bla Bla Bla');
const notification2 = createNotification(NotificationType.RESERVATION_CREATED_BY_STUDENT, 'Bla Bla Bla');
const notification3 = createNotification(NotificationType.RESERVATION_RESOLVED_BY_LECTURER, 'Bla Bla Bla');
const notification4 = createNotification(NotificationType.SUBJECT_PROPOSED_BY_STUDENT, 'Bla Bla Bla');
const notification6 = createNotification(NotificationType.SUBJECT_PROPOSITION_RESOLVED_BY_LECTURER, 'Bla Bla Bla');
const notification7 = createNotification(NotificationType.SUBJECT_RESOLVED_BY_COORDINATOR, 'Bla Bla Bla');
const notification8 = createNotification(NotificationType.TOPIC_CORRECTION_REQUEST_RESOLVED_BY_DEAN, 'Bla Bla Bla');
const notification9 = createNotification(NotificationType.TOPIC_CORRECTION_REQUEST_CREATED_BY_STUDENT, 'Bla Bla Bla');


const notifications: NotificationTemplate[] = [notification1, notification2, notification3,
  notification4, notification6, notification7, notification8, notification9];


const responseByApiKey: Dictionary<any> = {
  [ApiLabel.MODIFY_TIMETABLE]: firstItem(timetables),
  [ApiLabel.ACCEPT_THESIS_WITH_LECTURER]: firstItem(theses),
  [ApiLabel.DELETE_THESIS_WITH_STUDENT]: firstItem(theses),
  [ApiLabel.CORRECT_THESIS_WITH_LECTURER]: firstItem(theses),
  [ApiLabel.REJECT_THESIS_WITH_LECTURER]: firstItem(theses),
  [ApiLabel.ABANDON_MEMBER_RESERVATION]: firstItem(reservationMembers),
  [ApiLabel.APPROVE_CHANGE_REQUEST]: firstItem(changeRequests),
  [ApiLabel.APPROVE_CLARIFICATION_REQUEST]: firstItem(clarificationRequests),
  [ApiLabel.APPROVE_THESIS_WITH_COORDINATOR]: firstItem(theses),
  [ApiLabel.APPROVE_THESIS_WITH_COMMITTEE_MEMBER]: firstItem(theses),
  [ApiLabel.CONFIRM_MEMBER_RESERVATION]: firstItem(reservationMembers),
  [ApiLabel.CONFIRM_PARTICIPATION_IN_RESERVATION]: firstItem(reservationMembers),
  [ApiLabel.CREATE_CLARIFICATION_REQUEST]: firstItem(clarificationRequests),
  [ApiLabel.REJECT_RESERVATION]: firstItem(reservations),
  [ApiLabel.ACCEPT_RESERVATION]: firstItem(reservations),
  [ApiLabel.CREATE_CHANGE_REQUEST]: firstItem(changeRequests),
  [ApiLabel.CREATE_THESIS]: firstItem(theses),
  [ApiLabel.CREATE_RESERVATION]: firstItem(reservations),
  [ApiLabel.GET_USER]: user,
  [ApiLabel.GET_STUDENTS]: students,
  [ApiLabel.GET_NOTIFICATIONS]: notifications,
  [ApiLabel.MODIFY_NOTIFICATION]: firstItem(notifications),
  [ApiLabel.REJECT_CLARIFICATION_REQUEST]: firstItem(clarificationRequests),
  [ApiLabel.REJECT_THESIS_WITH_COMMITTEE_MEMBER]: firstItem(clarificationRequests),
  [ApiLabel.REJECT_CHANGE_REQUEST]: firstItem(changeRequests),
  [ApiLabel.REJECT_THESIS_WITH_COORDINATOR]: firstItem(theses),
  [ApiLabel.REQUEST_THESIS_CORRECTIONS]: firstItem(theses)
};

function generateAuthData(): AuthData {
  return {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiresIn: new Date().getTime() + 5 * 1000 // 5 min
  };
}

function getQueryParam(key: string, query?: RequestParams): string | undefined {
  return query?.getAll().find(p => p.key === key)?.value;
}

function notNilFilter<T, R>(condition: (value: T) => boolean, demandedValue?: R): (value: T) => boolean {
  return (value: T) => isNil(demandedValue) ? true : condition(value);
}

function notNilEqualFilter<T, R>(selector: (value: T) => R | undefined, demandedValue?: R): (value: T) => boolean {
  return notNilFilter(value => selector(value) === demandedValue, demandedValue);
}

// LoadEmployeesActionOptions
function getEmployees(query?: RequestParams): Employee[] {
  const role = getQueryParam('role', query);
  const dsId = getQueryParam('diplomaSessionId', query);

  const ds = diplomaSessions.find(d => d.id === dsId);
  return employees
    .filter(notNilEqualFilter(f => f.employeeRole, role))
    .filter(notNilEqualFilter(f => f.departmentId, ds?.fieldOfStudy.departmentId));
}

// LoadFieldsOfStudyActionOptions
function getFieldsOfStudy(query?: RequestParams): FieldOfStudy[] {
  const departmentId = getQueryParam('departmentId', query);

  return fieldsOfStudy.filter(notNilEqualFilter(f => f.departmentId, departmentId));
}

// LoadDiplomaSessionsActionOptions
function getDiplomaSessions(query?: RequestParams): DiplomaSession[] {
  const departmentId = getQueryParam('departmentId', query);
  const fieldOfStudyId = getQueryParam('fieldOfStudyId', query);

  return diplomaSessions
    .filter(notNilEqualFilter(f => f.fieldOfStudy.departmentId, departmentId))
    .filter(notNilEqualFilter(f => f.fieldOfStudy.id, fieldOfStudyId));
}

// LoadThesesActionOptions
function getTheses(query?: RequestParams): Thesis[] {
  const proposedByStudentId = getQueryParam('proposedByStudentId', query);
  const diplomaSessionId = getQueryParam('diplomaSessionId', query);
  const supervisorId = getQueryParam('supervisorId', query);
  const status = getQueryParam('status', query);

  return theses
    .filter(notNilEqualFilter(f => f.authorStudentId, proposedByStudentId))
    .filter(notNilEqualFilter(f => f.diplomaSessionId, diplomaSessionId))
    .filter(notNilEqualFilter(f => f.supervisorId, supervisorId))
    .filter(notNilEqualFilter(f => f.status, status));
}

// LoadReservationsActionOptions
function getReservations(query?: RequestParams): Reservation[] {
  const studentId = getQueryParam('studentId', query);
  const supervisorId = getQueryParam('supervisorId', query);
  const diplomaSessionId = getQueryParam('diplomaSessionId', query);

  return reservations
    .filter(notNilFilter(f => f.reservationMembers.some(rm => rm.studentId === studentId), studentId))
    .filter(notNilEqualFilter(f => f.thesis.diplomaSessionId, diplomaSessionId))
    .filter(notNilEqualFilter(f => f.thesis.supervisorId, supervisorId));
}

// LoadClarificationRequestsActionOptions;
function getClarificationRequests(query?: RequestParams): ClarificationRequest[] {
  const status = getQueryParam('status', query);
  const studentId = getQueryParam('studentId', query);
  const diplomaSessionId = getQueryParam('diplomaSessionId', query);
  const reviewedByEmployeeId = getQueryParam('reviewedByEmployeeId', query);

  return clarificationRequests
    .filter(notNilEqualFilter(f => f.baseThesis.diplomaSessionId, diplomaSessionId))
    .filter(notNilEqualFilter(f => f.employeeId, reviewedByEmployeeId))
    .filter(notNilEqualFilter(f => f.studentId, studentId))
    .filter(notNilEqualFilter(f => f.status, status));
}

// LoadChangeRequestsActionOptions
function getChangeRequests(query?: RequestParams): ChangeRequest[] {
  const status = getQueryParam('status', query);
  const studentId = getQueryParam('studentId', query);
  const diplomaSessionId = getQueryParam('diplomaSessionId', query);
  const reviewedByEmployeeId = getQueryParam('reviewedByEmployeeId', query);

  return changeRequests
    .filter(notNilEqualFilter(f => f.newThesis.diplomaSessionId, diplomaSessionId))
    .filter(notNilEqualFilter(f => f.employeeId, reviewedByEmployeeId))
    .filter(notNilEqualFilter(f => f.studentId, studentId))
    .filter(notNilEqualFilter(f => f.status, status));
}

function getForId<T extends WithId>(resource: T[], query: RequestParams): T {
  const id = getQueryParam('id', query);
  return resource.find(e => e.id === id)!;
}

const resByApi: Dictionary<any[]> = {
  [ApiLabel.GET_CLARIFICATION_REQUEST]: clarificationRequests,
  [ApiLabel.GET_CHANGE_REQUEST]: changeRequests,
  [ApiLabel.GET_DIPLOMA_SESSION]: diplomaSessions,
  [ApiLabel.GET_FIELD_OF_STUDY]: fieldsOfStudy,
  [ApiLabel.GET_RESERVATION]: reservations,
  [ApiLabel.GET_TIMETABLE]: timetables,
  [ApiLabel.GET_THESIS]: theses,
  [ApiLabel.GET_STUDENT]: students,
  [ApiLabel.GET_EMPLOYEE]: employees
};


function handleLabel(apiLabel: ApiLabel, query?: RequestParams): NonNullable<any> {
  switch (true) {
    case ApiLabel.LOGIN === apiLabel:
    case ApiLabel.REFRESH === apiLabel:
      return generateAuthData();
    case isNotNil(resByApi[apiLabel]):
      return getForId(resByApi[apiLabel], query!);
    case ApiLabel.GET_EMPLOYEES === apiLabel:
      return getEmployees(query);
    case ApiLabel.GET_FIELDS_OF_STUDY === apiLabel:
      return getFieldsOfStudy(query);
    case ApiLabel.GET_DIPLOMA_SESSIONS === apiLabel:
      return getDiplomaSessions(query);
    case ApiLabel.GET_THESES === apiLabel:
      return getTheses(query);
    case ApiLabel.GET_RESERVATIONS === apiLabel:
      return getReservations(query);
    case ApiLabel.GET_CLARIFICATION_REQUESTS === apiLabel:
      return getClarificationRequests(query);
    case ApiLabel.GET_CHANGE_REQUESTS === apiLabel:
      return getChangeRequests(query);
    default:
      return responseByApiKey[apiLabel];
  }
}

export const FakeData = {
  handleApiLabel(apiLabel: ApiLabel, query?: RequestParams): NonNullable<any> {
    // console.log(apiLabel, query);
    const response = handleLabel(apiLabel, query);
    // console.log(response);
    if (isNil(response)) {
      throw new Error('FAKES: Unhandled Api Label: ' + apiLabel);
    }
    return response;
  },
  thesis: thesis1
};
