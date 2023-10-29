import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { Router } from '@angular/router';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { ThesesService } from '../../../../base/services/theses.service';
import { UserService } from '../../../../base/services/user.service';
import { SessionService } from '../../../../base/services/session.service';
import { Role } from '../../../../base/models/dto/role.model';
import { switchMap } from 'rxjs';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { ThesisStatus } from '../../../../base/models/dto/topic-status.model';

@Component({
  selector: 'app-lecturer-topics',
  templateUrl: './program-committee-topics.component.html',
  styleUrls: ['./program-committee-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramCommitteeTopicsComponent extends RoleComponent implements OnInit {

  thesesToConsider?: Thesis[];

  constructor(private readonly deadlinesService: PermissionsService,
              private readonly thesesService: ThesesService,
              private readonly userService: UserService,
              private readonly router: Router,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.PROGRAM_COMMITTEE_MEMBER];
  }

  ngOnInit(): void {
    this.initTheses();
  }

  private initTheses(): void {
    this.addSubscription(
      this.contextSource.pipe(
        switchMap(context => this.thesesService
          .getThesisWithStatus(context.diplomaSession?.id!, ThesisStatus.APPROVED_BY_COORDINATOR))
      ).subscribe(thesesToConsider => {
        this.thesesToConsider = thesesToConsider;
        this.markForCheck();
      })
    );
  }

  public reviewTopic(topic: Thesis): void {
    this.router.navigate(['/program-committee/topic', topic.id]).then();
  }
}
