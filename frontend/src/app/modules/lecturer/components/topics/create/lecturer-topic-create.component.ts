import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Context } from '../../../../../base/models/context.model';
import { UserService } from '../../../../../base/services/user.service';
import { ThesesService } from '../../../../../base/services/theses.service';
import { SessionService } from '../../../../../base/services/session.service';
import { AppValidators } from '../../../../../base/utils/validators.utils';
import { map, Observable, switchMap } from 'rxjs';
import { Employee } from '../../../../../base/models/dto/employee.model';
import { Role } from '../../../../../base/models/dto/role.model';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { LabelBuilder } from '../../../../../base/utils/label-builder.utils';
import { PermissionsService } from '../../../../../base/services/permissions.service';

@Component({
  selector: 'app-lecturer-topic-create',
  templateUrl: './lecturer-topic-create.component.html',
  styleUrls: ['./lecturer-topic-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerTopicCreateComponent extends RoleComponent implements OnInit {

  form?: FormGroup;

  supervisor?: Employee;
  context?: Context;

  canSubmit?: boolean;
  errorVisible = false;

  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly userService: UserService,
              private readonly thesesService: ThesesService,
              private readonly permissionsService: PermissionsService,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  confirm() {
    const formData = this.form?.value;
    const payload = this.prepareCreatePayload(this.context!, formData);
    this.thesesService.createThesis(payload).subscribe({
      next: () => this.redirectOnSuccess(),
      error: () => this.showError()
    });
  }

  ngOnInit(): void {
    this.initData();
    this.checkPermission();
  }

  private initData(): void {
    this.addSubscription(this.getDataSource()
      .subscribe(([context, supervisor]) => {
        this.context = context;
        this.supervisor = supervisor;
        this.initForm(context, supervisor);
        this.markForCheck();
      })
    );
  }

  private getDataSource(): Observable<[Context, Employee]> {
    return this.contextSource.pipe(
      switchMap(context => this.userService.getEmployeeForId(context.userRole!.id).pipe(
        map(supervisor => ([context, supervisor] as [Context, Employee]))
      ))
    );
  }

  private initForm(context: Context, lecturer: Employee): void {
    this.form = this.formBuilder.group({
      topic: [undefined, AppValidators.topicValidator],
      supervisorName: [{ value: this.LabelBuilder.forEmployee(lecturer), disabled: true }, Validators.required],
      numberOfStudents: [undefined, AppValidators.numberOfStudentsValidator],
      description: [undefined, AppValidators.descriptionValidator],
      fieldOfStudy: [{ value: LabelBuilder.forDiplomaSession(context.diplomaSession!), disabled: true }]
    });
  }

  get roles(): Role[] {
    return [Role.LECTURER];
  }

  private prepareCreatePayload(context: Context, formData: any): Partial<Thesis> {
    return {
      topic: formData.topic,
      supervisorId: context.userRole.id,
      numberOfStudents: formData.numberOfStudents,
      description: formData.description,
      diplomaSessionId: context.diplomaSession!.id,
      reportedByStudent: false
    };
  }

  private checkPermission(): void {
    this.addSubscription(
      this.contextSource.pipe(map(context =>
        this.permissionsService.canLectureSubmitThesisWithSameDiplomaSession(context.diplomaSession!)
      )).subscribe(canSubmit => this.canSubmit = canSubmit)
    );
  }

  public redirectOnSuccess(): void {
    this.router.navigate(['/lecturer/topic']).then();
  }


}
