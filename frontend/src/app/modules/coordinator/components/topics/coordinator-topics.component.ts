import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { Router } from '@angular/router';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { SessionService } from '../../../../base/services/session.service';
import { Role } from '../../../../base/models/dto/role.model';
import { switchMap } from 'rxjs';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { ThesesService } from '../../../../base/services/theses.service';
import { UserService } from '../../../../base/services/user.service';
import { ThesisStatus } from '../../../../base/models/dto/topic-status.model';

@Component({
  selector: 'app-topic-change-requests',
  templateUrl: './coordinator-topics.component.html',
  styleUrls: ['./coordinator-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatorTopicsComponent extends RoleComponent implements OnInit {

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
    return [Role.COORDINATOR];
  }

  ngOnInit(): void {
    this.initTheses();
  }

  private initTheses(): void {
    this.addSubscription(
      this.contextSource.pipe(
        switchMap(context => this.thesesService
          .getThesisWithStatus(context.diplomaSession?.id!, ThesisStatus.WAITING))
      ).subscribe(thesesToConsider => {
        this.thesesToConsider = thesesToConsider;
        this.markForCheck();
      })
    );
  }

  public reviewTopic(topic: Thesis): void {
    this.router.navigate(['/coordinator/topic', topic.id]).then();
  }
}
