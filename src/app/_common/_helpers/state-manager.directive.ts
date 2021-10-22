import { Directive } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { SubscriptionDirective } from './subscription.directive';
import { DefaultState } from './_enums/default-state.enum';
import { StateType } from './_enums/state-type.enum';
import { NestedState } from './_models/nested-state';
import { State } from './_models/state';

@Directive({
  selector: 'app-state-manager'
})
export class StateManagerDirective extends SubscriptionDirective {
  private nestedState: NestedState = {};

  private getSubject(
    state: State = {} as State
  ): Subject<any> | BehaviorSubject<any> {
    switch (state.type) {
      case StateType.BehaviorSubject:
        return new BehaviorSubject(state.defaultValue);
      case StateType.ReplaySubject:
        return new ReplaySubject();
      case StateType.Subject:
        return new Subject();
      default:
        return new Subject();
    }
  }

  private getState(
    state: State | string,
    nesting?: string
  ): Subject<any> | BehaviorSubject<any> {
    if (typeof state === 'string') {
      return this.nestedState[state][nesting || state];
    }

    const stateName: string = state.name as string;

    return this.nestedState[stateName][nesting || stateName];
  }

  private createSimpleState(state: string, nesting: string = state): void {
    if (!this.nestedState[state]) {
      this.nestedState[state] = {};
    }

    if (!this.nestedState[state][nesting]) {
      this.nestedState[state][nesting] = this.getSubject();
    }
  }

  private createAdvancedState(state: State, nesting: string): void {
    if (!state || !state.name) return;

    const stateName: string = state.name as string;
    const stateNesting: string = nesting || stateName;

    if (!this.nestedState[stateName]) {
      this.nestedState[stateName] = {};
    }

    if (!this.nestedState[stateName][stateNesting]) {
      this.nestedState[stateName][stateNesting] = this.getSubject(state);
    }
  }

  private createState(state: State | string, nesting?: string): void {
    if (!state) return;

    if (typeof state === 'string') {
      this.createSimpleState(state, nesting);

      return;
    }

    this.createAdvancedState(state, nesting as any);
  }

  /**
   * get() is used to listen for state
   * @param state - key value is required to access state, then we can specify nesting
   * @param nesting - errors or isLoading
   */

  public get<T>(state: State | string, nesting?: string): Observable<T> {
    this.createState(state, nesting);

    return this.getState(state, nesting).asObservable();
  }

  /**
   * getStateValue() to be used with Behaviour Subjects
   * @param state key
   * @param nesting  - nested state such as errors or isLoading
   */

  public getStateValue<T>(state: State | string, nesting?: string): T {
    this.createState(state, nesting);

    const subject = this.getState(state, nesting);

    if (subject instanceof BehaviorSubject) {
      return subject.getValue();
    }

    return null as any;
  }

  public set(state: State | string, value: any, nesting?: string): void {
    this.createState(state, nesting);

    this.getState(state, nesting).next(value);
  }

  protected updateState =
    (state: State | string, nesting?: string) =>
    (
      src: Observable<any>,
      setGlobal = (key: any, value: any) => this.set(key, value, key),
      setState = (stateNesting: any, value: any) =>
        this.set(state, value, stateNesting)
    ) =>
      new Observable<any>((observer) => {
        setState(DefaultState.IsLoading, true);
        setGlobal(DefaultState.IsLoading, true);

        return src.subscribe({
          next(result) {
            setState(nesting, result);
            setState(DefaultState.IsLoading, false);
            setGlobal(DefaultState.IsLoading, true);

            observer.next(result);
          },
          error(err) {
            setState(DefaultState.Errors, err);
            setGlobal(DefaultState.Errors, err);
            setState(DefaultState.IsLoading, false);
            setGlobal(DefaultState.IsLoading, false);

            observer.error(err);
          },
          complete() {
            observer.complete();
          },
        });
      });
}
