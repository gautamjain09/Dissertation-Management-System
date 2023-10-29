import { Injectable } from '@angular/core';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { Timetable } from '../models/dto/timetable.model';
import { map } from 'rxjs/operators';
import { filterExists } from '../../core/tools/filter-exists';
import { ThesesService } from './theses.service';
import { isEmpty } from 'lodash-es';
import { IdType } from '../models/dto/id.model';
import { GeneralResourcesService } from './general-resources.service';
import { UserService } from './user.service';
import { isNotNil } from '../../core/tools/is-not-nil';
import { ThesisStatus } from '../models/dto/topic-status.model';
import { RequestsService } from './requests.service';
import { RequestStatus } from '../models/dto/request-status.model';
import { Employee } from '../models/dto/employee.model';
import { DiplomaSession } from '../models/dto/diploma-session.model';
import { Context } from '../models/context.model';

export type DeadlineSelector = (timetable: Timetable) => Date;

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {


  constructor(private readonly generalResourcesService: GeneralResourcesService,
              private readonly requestsService: RequestsService,
              private readonly thesesService: ThesesService,
              private readonly userService: UserService) {
  }

  // Coordinator
  public canCoordinatorConsiderThesis(coordinatorId: IdType, thesisId: IdType): Observable<boolean> {
    return this.canEmployeeActOnThesis(coordinatorId, thesisId,
      t => t.approvingThesisByCoordinator, ThesisStatus.WAITING);
  }

  // CommitteeMember
  public canCommitteeMemberConsiderThesis(committeeMemberId: IdType, thesisId: IdType): Observable<boolean> {
    return this.canEmployeeActOnThesis(committeeMemberId, thesisId,
      t => t.approvingThesisByCommittee, ThesisStatus.APPROVED_BY_COORDINATOR);
  }

  // Lecturer
  // public canLecturerAcceptProposedThesis(coordinatorId: IdType, thesisId: IdType): Observable<boolean> {
  //   return combineLatest([
  //     this.userService.getEmployeeForId(coordinatorId),
  //     this.thesesService.getThesisForId(thesisId)
  //   ]).pipe(switchMap(([employee, thesis]) =>
  //     thesis.status !== ThesisStatus.PROPOSED_BY_STUDENT || thesis.supervisorId !== employee.id
  //       ? of(false)
  //       : this.verifyDeadlineForDiplomaSessionId(thesis.diplomaSessionId, t => t.submittingThesis)
  //   ));
  // }

  public canLectureSubmitThesisWithSameDiplomaSession(diplomaSession: DiplomaSession): boolean {
    return this.verifyDeadline(diplomaSession.timetable, t => t.submittingThesis);
  }


  // Dean
  public canDeanConsiderClarificationRequest(deanId: IdType, requestId: IdType): Observable<boolean> {
    return combineLatest([
      this.userService.getEmployeeForId(deanId),
      this.requestsService.getClarificationRequestForId(requestId)
    ]).pipe(switchMap(([dean, request]) => request.status !== RequestStatus.WAITING ? of(false)
      : this.generalResourcesService.getDiplomaSessionForId(request.baseThesis.diplomaSessionId).pipe(
        map(requestDS => dean.departmentId === requestDS.fieldOfStudy.departmentId
          && this.verifyDeadline(requestDS.timetable, t => t.clarificationThesis))
      )
    ));
  }


  // Committee
  public canCommitteeConsiderChangeRequest(committeeId: IdType, requestId: IdType): Observable<boolean> {
    return combineLatest([
      this.userService.getEmployeeForId(committeeId),
      this.requestsService.getChangeRequestForId(requestId)
    ]).pipe(switchMap(([dean, request]) => request.status !== RequestStatus.WAITING ? of(false)
      : this.generalResourcesService.getDiplomaSessionForId(request.newThesis.diplomaSessionId).pipe(
        map(requestDS => dean.departmentId === requestDS.fieldOfStudy.departmentId
          && this.verifyDeadline(requestDS.timetable, t => t.clarificationThesis))
      )
    ));
  }

  //Employee
  public canEmployeeActOnThesis(employeeId: IdType, thesisId: IdType, selector: DeadlineSelector, thesisStatus?: ThesisStatus): Observable<boolean> {
    return combineLatest([
      this.userService.getEmployeeForId(employeeId),
      this.thesesService.getThesisForId(thesisId)
    ]).pipe(switchMap(([employee, thesis]) =>
      isNotNil(thesisStatus) && thesis.status !== thesisStatus
        ? of(false)
        : this.checkEmployeeAccess(employee, thesis.diplomaSessionId, selector)
    ));
  }

  public checkEmployeeAccess(employee: Employee, targetDiplomaSessionId: IdType, selector: DeadlineSelector): Observable<boolean> {
    return this.generalResourcesService.getDiplomaSessionForId(targetDiplomaSessionId).pipe(
      switchMap(ds => !this.verifyDeadline(ds.timetable, selector) ? of(false)
        : this.generalResourcesService.getFieldsOfStudyForId(ds.fieldOfStudy.id).pipe(
          map(thesisFieldOfStudy => thesisFieldOfStudy.departmentId === employee.departmentId)
        )
      )
    );
  }


  // Students
  public canReserveThesisWithId(studentContext: Context, thesisId: IdType): Observable<boolean> {
    return this.thesesService.getThesisForId(thesisId).pipe(
      switchMap(thesis => thesis.status !== ThesisStatus.APPROVED_BY_COMMITTEE
        || thesis.diplomaSessionId !== studentContext.diplomaSession!.id
        || !this.verifyDeadline(studentContext.diplomaSession!.timetable, t => t.selectingThesis)
          ? of(false)
          : this.thesesService.hasConfirmedStudentReservation(studentContext.userRole.id, studentContext.diplomaSession!.id)
            .pipe(map(has => !has))
      ));
  }

  public canStudentReserveThesisFromSameDiplomaSession(studentId: IdType, diplomaSession: DiplomaSession): Observable<boolean> {
    return this.thesesService.getConfirmedStudentReservations(studentId, diplomaSession.id).pipe(
      map(blockers => isEmpty(blockers) && this.verifyDeadline(diplomaSession.timetable, t => t.selectingThesis))
    );
  }

  public canCreateThesisProposition(studentId: IdType, diplomaSession: DiplomaSession): Observable<boolean> {
    return !this.verifyDeadline(diplomaSession.timetable, t => t.submittingThesis) ? of(false)
      : this.thesesService.hasConfirmedStudentReservation(studentId, diplomaSession.id)
        .pipe(map(has => !has));
  }

  public canCreateClarificationRequest(studentId: IdType, diplomaSession: DiplomaSession): Observable<boolean> {
    return this.checkForStudentWithConfirmedReservation(studentId, diplomaSession, t => t.clarificationThesis);
  }

  public canCreateChangeRequest(studentId: IdType, diplomaSession: DiplomaSession): Observable<boolean> {
    return this.checkForStudentWithConfirmedReservation(studentId, diplomaSession, t => t.changingThesis);
  }

  private checkForStudentWithConfirmedReservation(studentId: IdType, diplomaSession: DiplomaSession, deadlineSelector: DeadlineSelector): Observable<boolean> {
    return !this.verifyDeadline(diplomaSession.timetable, deadlineSelector) ? of(false)
      : this.thesesService.hasConfirmedStudentReservation(studentId, diplomaSession.id);
  }

  // General
  public verifyDeadlineForDiplomaSessionId(diplomaSessionId: IdType, deadlineSelector: DeadlineSelector): Observable<boolean> {
    return this.generalResourcesService.getDiplomaSessionForId(diplomaSessionId).pipe(
      filterExists(), map(ds => this.verifyDeadline(ds.timetable, deadlineSelector))
    );
  }

  public verifyDeadline(timetable: Timetable, deadlineSelector: DeadlineSelector): boolean {
    return new Date() < deadlineSelector(timetable);
  }

}
