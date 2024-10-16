import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user.model';

export enum UserActionTypes {
  LoadUsers = '[Users] Load Users',
  LoadUsersSuccess = '[Users] Load Users Success',
  LoadUsersFailure = '[Users] Load Users Failure',

  UpdateUser = '[Users] Update User',
  UpdateUserSuccess = '[Users] Update User Success',
  UpdateUserFailure = '[Users] Update User Failure',
}
export const loadUsers = createAction(
  UserActionTypes.LoadUsers
);
export const loadUsersSuccess = createAction(
  UserActionTypes.LoadUsersSuccess,
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  UserActionTypes.LoadUsersFailure,
  props<{ error: any }>()
);

export const updateUser = createAction(
  UserActionTypes.UpdateUser,
  props<{ user: User }>()
);
export const updateUserSuccess = createAction(
  UserActionTypes.UpdateUserSuccess,
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  UserActionTypes.UpdateUserFailure,
  props<{ error: any }>()
);
