import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { RequestsService } from '../../../../base/services/requests.service';
import { SessionService } from '../../../../base/services/session.service';
import { Role } from '../../../../base/models/dto/role.model';
import { combineLatest, switchMap } from 'rxjs';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { ChangeRequest } from '../../../../base/models/dto/change-request.model';

@Component({
  selector: 'app-program-committee-topic-change',
  templateUrl: './program-committee-topic-change.component.html',
  styleUrls: ['./program-committee-topic-change.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramCommitteeTopicChangeComponent extends RoleComponent implements OnInit {

  requestsToConsider?: ChangeRequest[];
  requestsConsidered?: ChangeRequest[];

  constructor(private readonly deadlinesService: PermissionsService,
              private readonly requestsService: RequestsService,
              private readonly router: Router,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.PROGRAM_COMMITTEE_MEMBER];
  }

  ngOnInit(): void {
    this.initRequests();
  }

  private initRequests(): void {
    this.addSubscription(
      this.contextSource.pipe(switchMap(context => combineLatest([
        this.requestsService.getChangeRequestsToReview(context.diplomaSession!.id),
        this.requestsService.getReviewedChangeRequests(context.diplomaSession!.id, context.userRole.id)
      ]))).subscribe(([toReview, reviewed]) => {
        this.requestsToConsider = toReview;
        this.requestsConsidered = reviewed;
        this.markForCheck();
      })
    );
  }

  showDetails(application: ChangeRequest): void {
    this.router.navigate(['/program-committee/change-requests/', application.id]);
  }
}
