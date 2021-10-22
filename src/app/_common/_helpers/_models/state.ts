import { StateType } from '../_enums/state-type.enum';

export interface State {
  [key: string]: { name: string; type?: StateType } | string;
}
