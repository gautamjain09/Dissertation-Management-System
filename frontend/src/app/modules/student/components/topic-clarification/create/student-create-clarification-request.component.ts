import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClarificationRequest } from '../../../../../base/models/dto/clarification-request.model';
import { AppValidators } from '../../../../../base/utils/validators.utils';
import { ThesesService } from '../../../../../base/services/theses.service';
import { RequestsService } from '../../../../../base/services/requests.service';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { SessionService } from '../../../../../base/services/session.service';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { Role } from '../../../../../base/models/dto/role.model';
import { UserService } from '../../../../../base/services/user.service';
import { Student } from '../../../../../base/models/dto/student.model';
import { CreateClarificationRequest } from '../../../../../base/models/dto/post/create-clarification-request.model';

const FORM_KEY = {
  CURRENT_THESIS_TOPIC: 'CURRENT_THESIS_TOPIC',
  CURRENT_DESCRIPTION: 'CURRENT_DESCRIPTION',
  NEW_THESIS_TOPIC: 'NEW_THESIS_TOPIC',
  NEW_DESCRIPTION: 'NEW_DESCRIPTION'
};

@Component({
  selector: 'app-student-topic-create-clarification',
  templateUrl: './student-create-clarification-request.component.html',
  styleUrls: ['./student-create-clarification-request.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentCreateClarificationRequestComponent extends RoleComponent implements OnInit {
  FORM_KEY = FORM_KEY;
  request?: ClarificationRequest;

  form?: FormGroup;

  thesis?: Thesis;
  student?: Student;

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
    const request = this.prepareRequestForFormData();
    this.requestsService.createClarificationRequest(this.thesis!.id, request).subscribe({
      next: () => this.router.navigate(['/student/clarification-requests']),
      error: () => this.showError()
    });
  }

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    this.addSubscription(this.getDataSource()
      .subscribe(([student, thesis]) => {
        this.thesis = thesis;
        this.student = student;
        this.initForm(thesis);
      })
    );
  }

  private getDataSource(): Observable<[Student, Thesis]> {
    return this.contextSource.pipe(
      switchMap(context => combineLatest([
        this.userService.getStudentForId(context.userRole.id),
        this.thesesService.getThesisForStudentConfirmedReservation(context.userRole.id, context.diplomaSession!.id)
      ]))
    );
  }

  private initForm(thesis: Thesis): void {

    this.form = this.formBuilder.group({
      [FORM_KEY.CURRENT_THESIS_TOPIC]: [thesis.topic],
      [FORM_KEY.CURRENT_DESCRIPTION]: [thesis.description],
      [FORM_KEY.NEW_THESIS_TOPIC]: [undefined, AppValidators.topicValidator],
      [FORM_KEY.NEW_DESCRIPTION]: [undefined, AppValidators.descriptionValidator]
    });
    this.markForCheck();
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  private prepareRequestForFormData(): CreateClarificationRequest {
    const formData = this.form?.value;
    const payload = new CreateClarificationRequest();
    payload.studentId = this.student!.id;
    payload.topicId = this.thesis!.id;
    payload.newTopic = formData[FORM_KEY.NEW_THESIS_TOPIC];
    payload.newDescription = formData[FORM_KEY.NEW_DESCRIPTION];
    return payload;
  }

}
