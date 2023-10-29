import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClarificationRequest } from '../../../../base/models/dto/clarification-request.model';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { RequestsService } from '../../../../base/services/requests.service';
import { SessionService } from '../../../../base/services/session.service';
import { Role } from '../../../../base/models/dto/role.model';
import { combineLatest, switchMap } from 'rxjs';
import { RoleComponent } from '../../../../base/components/role-component.directive';

@Component({
  selector: 'app-topic-change-requests',
  templateUrl: './dean-topic-clarification-requests.component.html',
  styleUrls: ['./dean-topic-clarification-requests.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeanTopicClarificationRequestsComponent extends RoleComponent implements OnInit {

  requestsToConsider?: ClarificationRequest[];
  requestsConsidered?: ClarificationRequest[];

  constructor(private readonly deadlinesService: PermissionsService,
              private readonly requestsService: RequestsService,
              private readonly router: Router,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.DEAN];
  }

  ngOnInit(): void {
    this.initClarificationRequests();
  }

  private initClarificationRequests(): void {
    this.addSubscription(
      this.contextSource.pipe(
        switchMap(context => combineLatest([
          this.requestsService.getClarificationRequestsToReview(context.diplomaSession!.id),
          this.requestsService.getReviewedClarificationRequests(context.diplomaSession!.id, context.userRole.id)
        ]))).subscribe(([toReview, reviewed]) => {
        this.requestsToConsider = toReview;
        this.requestsConsidered = reviewed;
        this.markForCheck();
      })
    );
  }

  showDetails(application: ClarificationRequest): void {
    this.router.navigate(['/dean/clarification/', application.id]);
  }
}
