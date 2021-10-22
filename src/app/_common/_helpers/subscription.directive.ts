import { Directive, OnDestroy } from '@angular/core';
import { Observable, PartialObserver, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Directive({
  selector: 'app-subscription'
})
export class SubscriptionDirective implements OnDestroy {
  private subSink = new Subscription();

  /**
   * implementation of onDestroy in your component will stop this hook from running
   * you will need to call this manually
   */

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  /**
   * this can be used to listen for state or directly call an endpoint if state is not needed
   * @param observable 
   * @param observerOrNext 
   * @param error 
   * @param complete 
   * @param final 
   * @returns a subscription to an observable
   */

  protected subscribe<T>(
    observable: Observable<T>,
    observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void,
    final?: () => void
  ): Subscription {
    return this.subSink.add(
      observable
        .pipe(
          finalize(() => {
            if (final != null) {
              final();
            }
          })
        )
        .subscribe({
          next: observerOrNext as any,
          error,
          complete,
        })
    );
  }

  /**
   * 
   * @param observable 
   * @returns data from endpoint
   */

  protected dispatchTo<T>(observable: Observable<T>): void {
    if (!observable) return;

    this.subSink.add(observable.subscribe());
  }

  protected unsubscribe(innerSubscription: Subscription): void {
    this.subSink.remove(innerSubscription);
  }
}
