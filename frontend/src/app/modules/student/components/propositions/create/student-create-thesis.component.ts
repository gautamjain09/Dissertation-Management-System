import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThesesService } from '../../../../../base/services/theses.service';
import { map, Observable, switchMap } from 'rxjs';
import { AppValidators } from '../../../../../base/utils/validators.utils';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { Role } from '../../../../../base/models/dto/role.model';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { SessionService } from '../../../../../base/services/session.service';
import { Employee } from '../../../../../base/models/dto/employee.model';
import { UserService } from '../../../../../base/services/user.service';
import { Context } from '../../../../../base/models/context.model';

@Component({
  selector: 'app-student-create-thesis',
  templateUrl: './student-create-thesis.component.html',
  styleUrls: ['./student-create-thesis.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentCreateThesisComponent extends RoleComponent implements OnInit {

  form?: FormGroup;

  supervisors?: any[];
  context?: Context;

  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly userService: UserService,
              private readonly thesesService: ThesesService,
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
    this.initForms();
    this.initData();
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      topic: [undefined, AppValidators.topicValidator],
      supervisorId: [undefined, Validators.required],
      numberOfStudents: [undefined, AppValidators.numberOfStudentsValidator],
      description: [undefined, AppValidators.descriptionValidator],
      fieldOfStudy: [{ value: '', disabled: true }]
    });
  }

  private initData(): void {
    this.addSubscription(this.getDataSource()
      .subscribe(([context, supervisors]) => {
        this.context = context;
        this.supervisors = supervisors;
        this.setFormData(context);
        this.markForCheck();
      })
    );
  }

  private getDataSource(): Observable<[Context, Employee[]]> {
    return this.contextSource.pipe(
      switchMap(context => this.userService.getAvailableSupervisors(context.diplomaSession!.id).pipe(
        map(supervisors => ([context, supervisors] as [Context, Employee[]]))
      ))
    );
  }

  private setFormData(context: Context): void {
    this.form?.patchValue({
      fieldOfStudy: context.fieldOfStudy!.name
    });
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  private prepareCreatePayload(context: Context, formData: any): Partial<Thesis> {
    return {
      topic: formData.topic,
      supervisorId: formData.supervisorId,
      authorStudentId: context.userRole.id,
      numberOfStudents: formData.numberOfStudents,
      description: formData.description,
      reportedByStudent: true,
      diplomaSessionId: context.diplomaSession!.id
    };
  }

  public redirectOnSuccess(): void {
    this.router.navigate(['/student/topic-propositions']).then();
  }

}
