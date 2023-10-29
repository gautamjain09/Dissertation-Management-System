import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { Dictionary } from '../models/dictionary.model';

@Directive()
export abstract class Cleanable implements OnDestroy {
  private subs: Dictionary<Subscription> = {};

  public addSubscription(subscription: Subscription, id?: string): void {
    const key = id ?? UUID.UUID();
    this.cleanSubscription(key);
    this.subs[key] = subscription;
  }

  private cleanSubscription(key: string): void {
    this.subs[key]?.unsubscribe();
    delete this.subs[key];
  }

  ngOnDestroy(): void {
    Object.keys(this.subs).forEach(key => this.cleanSubscription(key));
  }
}
