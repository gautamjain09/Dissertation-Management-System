import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../../../../base/models/dto/student.model';
import { UserService } from '../../../../../base/services/user.service';
import { ThesesService } from '../../../../../base/services/theses.service';
import { SessionService } from '../../../../../base/services/session.service';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { Role } from '../../../../../base/models/dto/role.model';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { LabelBuilder } from '../../../../../base/utils/label-builder.utils';
import { GeneralResourcesService } from '../../../../../base/services/general-resources.service';
import { DiplomaSession } from '../../../../../base/models/dto/diploma-session.model';
import { IdType } from '../../../../../base/models/dto/id.model';
import { PermissionsService } from '../../../../../base/services/permissions.service';
import { keyBy } from 'lodash-es';
import { isNotNil } from '../../../../../core/tools/is-not-nil';
import { CreateReservation } from '../../../../../base/models/dto/post/create-reservation.model';

@Component({
  selector: 'app-student-create-reservation',
  templateUrl: './student-create-reservation.component.html',
  styleUrls: ['./student-create-reservation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentCreateReservationComponent extends RoleComponent implements OnInit {

  form?: FormGroup;

  thesis?: Thesis;
  student?: Student;
  students?: Student[];

  canReserve = false;
  notUniqueStudents = false;

  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly userService: UserService,
              private readonly thesesService: ThesesService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly deadlinesService: PermissionsService,
              private readonly generalResourcesService: GeneralResourcesService,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }


  get thesisIdSource(): Observable<string> {
    return this.getPathParam(this.activatedRoute, 'thesisId');
  }

  get studentsForm(): FormArray {
    return this.form!.get('students') as FormArray;
  }

  confirm(): void {
    const formData = this.form!.value;
    const payload = this.preparePayloadForFormData(this.student!, this.thesis!, formData);
    this.thesesService.createReservation(this.student!.id, payload).subscribe({
      next: (request) => this.router.navigate(['/student/reservations/details/', request.id]),
      error: () => this.showError()
    });
  }

  ngOnInit(): void {
    this.checkButtonAvailability();
    this.initData();
  }

  private checkButtonAvailability(): void {
    this.addSubscription(
      combineLatest([this.contextSource, this.thesisIdSource]).pipe(
        switchMap(([context, thesisId]) => this.deadlinesService.canReserveThesisWithId(context, thesisId))
      ).subscribe(canReserve => {
        this.canReserve = canReserve;
        this.markForCheck();
      })
    );
  }

  private initData(): void {
    this.addSubscription(
      this.getDataSource().subscribe(([student, thesis, diplomaSession, students]) => {
        this.thesis = thesis;
        this.student = student;
        this.students = students;
        this.initForm(thesis, student, diplomaSession);
      })
    );
  }

  private getDataSource(): Observable<[Student, Thesis, DiplomaSession, Student[] | undefined]> {
    return combineLatest([
      this.userRoleSource.pipe(switchMap(userRole => this.userService.getStudentForId(userRole.id))),
      this.thesisIdSource.pipe(switchMap(thesisId => this.thesesService.getThesisForId(thesisId)))
    ]).pipe(switchMap(([student, thesis]) => combineLatest([
        this.generalResourcesService.getDiplomaSessionForId(thesis.diplomaSessionId),
        thesis.numberOfStudents === 1 ? of(undefined)
          : this.userService.getStudentsToParticipantInReservation(thesis.diplomaSessionId)
      ]).pipe(map(([diplomaSession, students]) =>
        ([student, thesis, diplomaSession, students] as [Student, Thesis, DiplomaSession, Student[] | undefined])
      ))
    ));
  }

  private initForm(thesis: Thesis, student: Student, diplomaSession: DiplomaSession): void {
    this.form = this.formBuilder.group({
      topic: [{ value: thesis.topic, disabled: true }],
      supervisor: [{ value: LabelBuilder.forEmployee(thesis.supervisor), disabled: true }],
      diplomaSession: [{ value: LabelBuilder.forDiplomaSession(diplomaSession), disabled: true }],
      initiator: [{ value: LabelBuilder.forStudent(student), disabled: true }],
      students: this.formBuilder.array([]),
      description: [{ value: thesis.description, disabled: true }]
    });
    this.addSubscription(
      (this.form.get('students') as FormArray).valueChanges.subscribe(studentIdList => {
        const allParticipants = [this.student!.id, ...studentIdList].filter(item => isNotNil(item));
        const unique = Object.keys(keyBy(allParticipants, i => i));
        this.notUniqueStudents = unique.length !== allParticipants.length;
      })
    );
    this.markForCheck();
  }

  public createStudentFormControl(): AbstractControl {
    return this.formBuilder.control(undefined, Validators.required);
  }

  public canAddNextStudent(): boolean {
    const students = this.form!.get('students') as FormArray;
    return students.length + 1 < this.thesis!.numberOfStudents;
  }

  public addStudentFormGroup() {
    const students = this.form!.get('students') as FormArray;
    if (this.canAddNextStudent()) {
      students.push(this.createStudentFormControl());
    }
  }

  public removeStudentControl(i: number) {
    const students = this.form!.get('students') as FormArray;
    students.removeAt(i);
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  private preparePayloadForFormData(student: Student, thesis: Thesis, formData: any): CreateReservation {
    const initiatorStudentId: IdType = student.id;
    const extraStudentsIds: IdType[] = formData['students'];
    const payload = new CreateReservation();
    payload.studentIds = [...extraStudentsIds, initiatorStudentId];
    payload.thesisId = thesis.id;
    return payload;
  }

}
