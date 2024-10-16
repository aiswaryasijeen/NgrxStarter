import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { loadUsers, loadUsersSuccess, loadUsersFailure,
  updateUser, updateUserSuccess, updateUserFailure } from '../actions/user.actions';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userService: UserService,
    private toastr: ToastrService) {}

    loadUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadUsers),
        switchMap(() =>
          this.userService.getUsers().pipe(
            map((users: User[]) => loadUsersSuccess({ users })),
            catchError(error => of(loadUsersFailure({ error })))
          )
        )
      )
    );
    updateUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateUser),
        mergeMap(userAction =>
          this.userService.updateUser(userAction.user).pipe(
            map((user: User) => {
              this.toastr.success(`User details of id #${user.id} updated`, '');
              return updateUserSuccess({ user })
            }),
            catchError(error => of(updateUserFailure({ error })))
          )
        )
      )
    );
}
