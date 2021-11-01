import { Directive } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { SubscriptionDirective } from './subscription.directive';
import { DefaultState } from './_enums/default-state.enum';
import { StateType } from './_enums/state-type.enum';
import { NestedState } from './_models/nested-state';
import { State } from './_models/state';

@Directive({
  selector: 'app-state-manager',
})
export class StateManagerDirective extends SubscriptionDirective {
  private nestedState: NestedState = {};

  /**
   * 1. get() is used to listen for state when called within our components
   * @param state - key value is required to access state, then we can specify nesting
   * @param nesting - errors or isLoading
   */

  public get<T>(state: State | string, nesting?: string): Observable<T> {
    this.createState(state, nesting);

    return this.getState(state, nesting).asObservable();
  }

  /**
   * 1. Internal function that return state as an observable
   * @param  {State|string} state
   * @param  {string} nesting?
   * @returns Subject | BehaviorSubject
   */

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

  /**
   * 2. It's an internal function not used outside abstaction. It's used for creating state.
   * Before getting state or setting state it's checking if that state exists if not it's creating it
   * If nesting is not provided it will create it automatically with same name as key.
   * Default type is Subject
   * @param  {string} key
   * @param  {string} nesting
   */

  private createState(state: State | string, nesting?: string): void {
    if (!state) return;

    if (typeof state === 'string') {
      this.createSimpleState(state, nesting);

      return;
    }

    this.createAdvancedState(state, nesting as any);
  }

  /**
   * 3. Internal function for creating state from string
   * @param  {string} state
   * @param  {string=state} nesting
   * @returns void
   */

  private createSimpleState(state: string, nesting: string = state): void {
    if (!this.nestedState[state]) {
      this.nestedState[state] = {};
    }

    if (!this.nestedState[state][nesting]) {
      this.nestedState[state][nesting] = this.getSubject();
    }
  }

  /**
   * 3. Internal function for creating state from State object
   * @param  {State} state
   * @param  {string} nesting
   * @returns void
   */

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

  /**
   * 4. Internal function that checks type and return matching subject
   * @param  {State} state
   * @returns Subject | BehaviorSubject
   * Default type is Subject
   */

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

  /**
   * public accessible method to check on state at certain point in time
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

  /**
   * public accessible method to set state at certain point in time
   * This function is used to update state manually. We can specify state, nesting and pass value.
   * @param  {State|string} state
   * @param  {any} value
   * @param  {string} nesting?
   * @returns void
   */

  public set(state: State | string, value: any, nesting?: string): void {
    this.createState(state, nesting);

    this.getState(state, nesting).next(value);
  }

  /**
   * Called within our call backs in services
   * This is a custom rxJS pipe & it's used only inside observable `.pipe()`.
   * This function is updating state on success and error callback
   * This function also update `isLoading` state.
   * We can pass extra data to nesting like id. That will create unique state only for item with that ID.
   * It's useful when using 2 same components on one page.
   * Example: Observable.pipe(this.updateState('someState'))
   * Example: Observable.pipe(this.updateState('someState', 'someStateNesting')
   * @param  {string} key
   * @param  {string} nesting?
   */

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
