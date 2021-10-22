import { StateType } from 'src/app/_common/_helpers/_enums/state-type.enum';
import { State } from 'src/app/_common/_helpers/_models/state';

/**
 * simple enum to set state properties
 */

export enum UserState {
  User = 'user',
  initialUserState = 'initialUser'
}

/**
 * this will create a retainable state value
 */

export const LoggedInUserState: State = {
  name: 'loggedUser',
  type: StateType.BehaviorSubject,
};

export const InitialLoggedInUserState: State = {
  name: 'initialLoggedUser',
  type: StateType.BehaviorSubject,
};
