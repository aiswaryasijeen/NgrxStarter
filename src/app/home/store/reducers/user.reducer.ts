import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../model/user.model';
import * as userActions from '../actions/user.actions';

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}
export const initialState: UserState = {
  users: [
      {
        id: 0,
        name: '',
        email: '',
        username: '',
        isEdit: false
      }
    ],
  loading: false,
  error: null
};
export const userReducer = createReducer(
  initialState,
  on(userActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),
  on(userActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(userActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: state.users.map(u => u.id === user.id ? user : u),
    error: null
  })),
  on(userActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
