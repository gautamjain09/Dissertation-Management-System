import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { Router } from '@angular/router';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { ThesesService } from '../../../../base/services/theses.service';
import { UserService } from '../../../../base/services/user.service';
import { SessionService } from '../../../../base/services/session.service';
import { Role } from '../../../../base/models/dto/role.model';
import { map, Observable, switchMap } from 'rxjs';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { ThesisStatus } from '../../../../base/models/dto/topic-status.model';
import { partition } from 'lodash-es';

@Component({
  selector: 'app-lecturer-topics',
  templateUrl: './lecturer-topics.component.html',
  styleUrls: ['./lecturer-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerTopicsComponent extends RoleComponent implements OnInit {

  proposedTheses?: Thesis[];
  toCorrectTheses?: Thesis[];
  otherTheses?: Thesis[];

  canSubmit?: boolean;

  constructor(private readonly deadlinesService: PermissionsService,
              private readonly thesesService: ThesesService,
              private readonly userService: UserService,
              private readonly router: Router,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.LECTURER];
  }

  ngOnInit(): void {
    this.initData();
    this.initButtonsAvailability();
  }

  private initData(): void {
    this.addSubscription(
      this.getDataSource().subscribe((theses) => {
        const parts1 = partition(theses, t => t.status === ThesisStatus.PROPOSED_BY_STUDENT);
        const parts2 = partition(parts1[1], t => t.status === ThesisStatus.TO_CORRECT);
        this.proposedTheses = parts1[0];
        this.toCorrectTheses = parts2[0];
        this.otherTheses = parts2[1];
        this.markForCheck();
      })
    );
  }

  initButtonsAvailability(): void {
    this.addSubscription(
      this.contextSource.pipe(
        map(context => this.deadlinesService
          .canLectureSubmitThesisWithSameDiplomaSession(context.diplomaSession!))
      ).subscribe(canSubmit => {
        this.canSubmit = canSubmit;
        this.markForCheck();
      })
    );
  }

  private getDataSource(): Observable<Thesis[]> {
    return this.contextSource.pipe(
      switchMap(context => this.thesesService
        .getThesisForLecturerAndDiplomaSession(context.userRole.id, context.diplomaSession!.id))
    );
  }

  public manageTopic(topic: Thesis): void {
    this.router.navigate(['/lecturer/topic/details', topic.id]).then();
  }

  public reviewTopic(topic: Thesis): void {
    this.router.navigate(['/lecturer/topic/review', topic.id]).then();
  }

  public correctTopic(topic: Thesis): void {
    this.router.navigate(['/lecturer/topic/correct', topic.id]).then();
  }

  public createTopic(): void {
    this.router.navigate(['/lecturer/topic/create']).then();
  }
}
