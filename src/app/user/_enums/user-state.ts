import { StateType } from 'src/app/_common/_helpers/_enums/state-type.enum';
import { State } from 'src/app/_common/_helpers/_models/state';

export enum UserState {
  User = 'user',
}

export const LoggedInUserState: State = {
  name: 'loggedUser',
  type: StateType.BehaviorSubject,
};
