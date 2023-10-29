import { ApiLabel } from '../app/core/models/api-route.model';
import { AppLanguage } from '../app/core/models/app-language.model';

export const baseEnvironment = {
  fakeApi: {
    enabled: false,
    delayTime: 500
  },
  defaultLanguage: AppLanguage.POLISH,
  serverConfig: {
    authBase: '/auth',
    base: '/api',
    api: {
      [ApiLabel.LOGIN]: '/oauth/token',
      [ApiLabel.REFRESH]: 'TODO REFRESH',
      [ApiLabel.MODIFY_TIMETABLE]: '/graduation/schedule',
      [ApiLabel.ACCEPT_THESIS_WITH_LECTURER]: '/lecturer/subject/student-propositions/accept',
      [ApiLabel.CORRECT_THESIS_WITH_LECTURER]: '/lecturer/subject/to-correct',
      [ApiLabel.REJECT_THESIS_WITH_LECTURER]: '/lecturer/subject/student-propositions/reject',
      [ApiLabel.ABANDON_MEMBER_RESERVATION]: '/student/reservation/cancel',
      [ApiLabel.APPROVE_CLARIFICATION_REQUEST]: '/dean/request/correction/accept',
      [ApiLabel.APPROVE_CHANGE_REQUEST]: '/commission/request/change/accept',
      [ApiLabel.APPROVE_THESIS_WITH_COORDINATOR]: '/coordinator/subject/accept',
      [ApiLabel.APPROVE_THESIS_WITH_COMMITTEE_MEMBER]: '/commission/subject/accept',
      [ApiLabel.CONFIRM_MEMBER_RESERVATION]: '/student/reservation/approve',
      [ApiLabel.CONFIRM_PARTICIPATION_IN_RESERVATION]: '/student/reservation/approve',
      [ApiLabel.CREATE_CLARIFICATION_REQUEST]: '/student/request/topic-correction',
      [ApiLabel.CREATE_CHANGE_REQUEST]: '/student/request/topic-change',
      [ApiLabel.DELETE_THESIS_WITH_STUDENT]: '/student/subject/delete',
      [ApiLabel.CREATE_THESIS]: '/subject',
      [ApiLabel.CREATE_RESERVATION]: '/student/reservation',
      [ApiLabel.REJECT_RESERVATION]: '/lecturer/reservation/reject',
      [ApiLabel.ACCEPT_RESERVATION]: '/lecturer/reservation/accept',
      [ApiLabel.GET_CHANGE_REQUEST]: '/request/change',
      [ApiLabel.GET_CHANGE_REQUESTS]: '/request/change',
      [ApiLabel.GET_CLARIFICATION_REQUEST]: '/request/clarification',
      [ApiLabel.GET_CLARIFICATION_REQUESTS]: '/request/clarification',
      [ApiLabel.GET_DEPARTMENT]: '/general/department',
      [ApiLabel.GET_DEPARTMENTS]: '/general/department',
      [ApiLabel.GET_DIPLOMA_SESSION]: '/general/diploma-session',
      [ApiLabel.GET_DIPLOMA_SESSIONS]: '/general/diploma-session',
      [ApiLabel.GET_EMPLOYEE]: '/employee',
      [ApiLabel.GET_EMPLOYEES]: '/employee',
      [ApiLabel.GET_FIELD_OF_STUDY]: '/general/field-of-study',
      [ApiLabel.GET_FIELDS_OF_STUDY]: '/general/field-of-study',
      [ApiLabel.GET_RESERVATION]: '/reservation',
      [ApiLabel.GET_RESERVATIONS]: '/reservation',
      [ApiLabel.GET_STUDENT]: '/student',
      [ApiLabel.GET_STUDENTS]: '/student',
      [ApiLabel.GET_THESES]: '/subject',
      [ApiLabel.GET_THESIS]: '/subject',
      [ApiLabel.GET_TIMETABLE]: '/general/schedule',
      [ApiLabel.GET_TIMETABLES]: '/general/schedule',
      [ApiLabel.GET_USER]: '/user',
      [ApiLabel.GET_USER]: '/user',
      [ApiLabel.GET_NOTIFICATIONS]: '/admin/notification',
      [ApiLabel.MODIFY_NOTIFICATION]: '/admin/notification',
      [ApiLabel.REJECT_CLARIFICATION_REQUEST]: '/dean/request/correction/reject',
      [ApiLabel.REJECT_CHANGE_REQUEST]: '/commission/request/change/reject',
      [ApiLabel.REJECT_THESIS_WITH_COORDINATOR]: '/coordinator/subject/reject',
      [ApiLabel.REJECT_THESIS_WITH_COMMITTEE_MEMBER]: '/commission/subject/reject',
      [ApiLabel.REQUEST_THESIS_CORRECTIONS]: '/coordinator/subject/comment'
    }
  }
};