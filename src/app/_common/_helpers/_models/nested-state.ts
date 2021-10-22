import { BehaviorSubject, Subject } from 'rxjs';

export interface NestedState {
  [key: string]: {
    [key: string]: Subject<any> | BehaviorSubject<any>;
  };
}
