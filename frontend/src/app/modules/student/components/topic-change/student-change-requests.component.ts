import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeRequest } from '../../../../base/models/dto/change-request.model';
import { Role } from '../../../../base/models/dto/role.model';
import { switchMap } from 'rxjs';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { RequestsService } from '../../../../base/services/requests.service';
import { SessionService } from '../../../../base/services/session.service';
import { RoleComponent } from '../../../../base/components/role-component.directive';

@Component({
  selector: 'app-student-change-requests',
  templateUrl: './student-change-requests.component.html',
  styleUrls: ['./student-change-requests.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentChangeRequestsComponent extends RoleComponent implements OnInit {

  changeRequests?: ChangeRequest[];
  canCreateNew = false;

  constructor(private readonly deadlinesService: PermissionsService,
              private readonly requestsService: RequestsService,
              private readonly router: Router,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  ngOnInit(): void {
    this.initChangeRequests();
    this.initButtonsAvailability();
  }

  private initChangeRequests(): void {
    this.addSubscription(
      this.contextSource.pipe(switchMap(context =>
        this.requestsService.getChangeRequestsForStudent(context.diplomaSession!.id, context.userRole.id))
      ).subscribe(requests => {
        this.changeRequests = requests!;
        this.markForCheck();
      })
    );
  }

  initButtonsAvailability(): void {
    this.addSubscription(
      this.contextSource.pipe(switchMap(context =>
        this.deadlinesService.canCreateChangeRequest(context.userRole.id, context.diplomaSession!)
      )).subscribe(canCreateNew => {
        this.canCreateNew = canCreateNew;
        this.markForCheck();
      })
    );
  }

  public requestDetails(request: ChangeRequest): void {
    this.router.navigate(['/student/change-requests/details', request.id]).then();
  }

  public createRequest() {
    this.router.navigate(['/student/change-requests/create']).then();
  }

}
