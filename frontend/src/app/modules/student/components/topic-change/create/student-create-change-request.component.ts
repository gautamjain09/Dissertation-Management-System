import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThesesService } from '../../../../../base/services/theses.service';
import { RequestsService } from '../../../../../base/services/requests.service';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { SessionService } from '../../../../../base/services/session.service';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { Role } from '../../../../../base/models/dto/role.model';
import { AppValidators } from '../../../../../base/utils/validators.utils';
import { IdType } from '../../../../../base/models/dto/id.model';
import { UserService } from '../../../../../base/services/user.service';
import { Student } from '../../../../../base/models/dto/student.model';
import {
  CreateChangeRequest,
  CreateChangeRequestNewThesis
} from '../../../../../base/models/dto/post/create-change-request.model';
import { Employee } from '../../../../../base/models/dto/employee.model';

const FORM_KEY = {
  TOPIC: 'TOPIC',
  DESCRIPTION: 'DESCRIPTION',
  SUPERVISOR_ID: 'SUPERVISOR_ID'
};

@Component({
  selector: 'app-student-topic-create-clarification',
  templateUrl: './student-create-change-request.component.html',
  styleUrls: ['./student-create-change-request.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentCreateChangeRequestComponent extends RoleComponent implements OnInit {
  FORM_KEY = FORM_KEY;
  form?: FormGroup;

  student?: Student;
  baseThesis?: Thesis;
  supervisors?: Employee[];

  errorVisible = false;


  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly userService: UserService,
              private readonly thesesService: ThesesService,
              private readonly requestsService: RequestsService,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  confirm() {
    const payload = this.prepareRequestForFormData();
    this.requestsService.createChangeRequest(this.baseThesis!.id, payload).subscribe({
      next: (request) => this.router.navigate(['/student/change-requests/details/', request.id]),
      error: () => this.showError()
    });
  }

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    this.addSubscription(
      this.getDataSource().subscribe(([student, thesis, supervisors]) => {
        this.baseThesis = thesis;
        this.student = student;
        this.supervisors = supervisors;
        this.initForm(thesis);
      })
    );
  }

  private getDataSource(): Observable<[Student, Thesis, Employee[]]> {
    return this.contextSource.pipe(
      switchMap(context => combineLatest([
        this.userService.getStudentForId(context.userRole.id),
        this.getBaseThesis(context.userRole.id, context.diplomaSession!.id),
        this.userService.getAvailableSupervisors(context.diplomaSession!.id)
      ]))
    );
  }

  private getBaseThesis(studentId: IdType, diplomaSessionId: IdType): Observable<Thesis> {
    return this.thesesService.getThesisForStudentConfirmedReservation(studentId, diplomaSessionId);
  }

  private initForm(thesis: Thesis): void {
    this.form = this.formBuilder.group({
      [FORM_KEY.TOPIC]: [thesis.topic, AppValidators.topicValidator],
      [FORM_KEY.DESCRIPTION]: [thesis.description, AppValidators.descriptionValidator],
      [FORM_KEY.SUPERVISOR_ID]: [thesis.supervisorId, Validators.required]
    });
    this.markForCheck();
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  private prepareRequestForFormData(): CreateChangeRequest {
    const formData = this.form?.value;
    const newThesis = new CreateChangeRequestNewThesis();
    newThesis.topic = formData[FORM_KEY.TOPIC];
    newThesis.description = formData[FORM_KEY.DESCRIPTION];
    newThesis.supervisorId = formData[FORM_KEY.SUPERVISOR_ID];
    const payload = new CreateChangeRequest();
    payload.studentId = this.student!.id;
    payload.previousThesisId = this.baseThesis!.id;
    payload.newThesis = newThesis;
    return payload;
  }

}
