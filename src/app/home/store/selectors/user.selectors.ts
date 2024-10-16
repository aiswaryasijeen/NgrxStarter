import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsersState } from '../user.state'; // Replace with your state interface
import { UserState } from '../reducers/user.reducer'; // Replace with your specific state interface
export const selectUserState = createFeatureSelector<UsersState, UserState>('users');
export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);
export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);
export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
