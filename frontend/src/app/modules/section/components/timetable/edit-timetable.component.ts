import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { UserRole } from '../../../../base/models/dto/user-role.model';
import { combineLatest, switchMap } from 'rxjs';
import { GeneralResourcesService } from '../../../../base/services/general-resources.service';
import { SessionService } from '../../../../base/services/session.service';
import { Role } from '../../../../base/models/dto/role.model';

import { Timetable } from '../../../../base/models/dto/timetable.model';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { AppValidators } from '../../../../base/utils/validators.utils';

@Component({
  selector: 'app-section-edit-timetable',
  templateUrl: './edit-timetable.component.html',
  styleUrls: ['./edit-timetable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTimetableComponent extends RoleComponent implements OnInit {

  form?: FormGroup;

  userRole?: UserRole;
  timetable?: Timetable;

  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly generalResourcesService: GeneralResourcesService,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.DIPLOMA_SECTION_MEMBER];
  }

  ngOnInit(): void {
    this.loadTimetable();
  }

  private loadTimetable(): void {
    this.addSubscription(combineLatest([this.contextSource, this.reloadTrigger])
      .pipe(switchMap(([context]) => this.generalResourcesService
        .getTimetableForId(context.diplomaSession!.timetableId)))
      .subscribe((timetable) => {
        this.timetable = timetable;
        this.initForm(timetable);
      })
    );
  }

  private initForm(timetable: Timetable): void {
    this.form = this.formBuilder.group({
      id: [timetable.id],
      submitDeadline: this.getDateControl(timetable.submittingThesis),
      selectingDeadline: this.getDateControl(timetable.selectingThesis),
      approvingCoordinatorDeadline: this.getDateControl(timetable.approvingThesisByCoordinator),
      approvingCommitteeDeadline: this.getDateControl(timetable.approvingThesisByCommittee),
      clarificationsDeadline: this.getDateControl(timetable.clarificationThesis),
      changingDeadline: this.getDateControl(timetable.changingThesis)
    });
    this.markForCheck();
  }

  getDateControl(date: Date): [string, ValidatorFn] {
    return [date.toISOString().split('T')[0], AppValidators.deadline];
  }


  private getPayload(): Timetable {
    const formData = this.form!.value!;
    const timeTable = new Timetable();
    timeTable.id = formData.id;

    timeTable.submittingThesis = new Date(formData.submitDeadline);
    timeTable.selectingThesis = new Date(formData.selectingDeadline);
    timeTable.approvingThesisByCoordinator = new Date(formData.approvingCoordinatorDeadline);
    timeTable.approvingThesisByCommittee = new Date(formData.approvingCommitteeDeadline);
    timeTable.clarificationThesis = new Date(formData.clarificationsDeadline);
    timeTable.changingThesis = new Date(formData.changingDeadline);
    return timeTable;
  }

  public modify(): void {
    const payload = this.getPayload();
    const actionSource = this.generalResourcesService.modifyTimetable(this.timetable!.id, payload);
    this.handleAction(actionSource);
  }

}
