import {Component, OnInit} from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { User } from './model/user.model';
import { UserService } from './services/user.service';
import { UsersState } from './store/user.state';
import { loadUsers, updateUser } from './store/actions/user.actions';
import { selectUsers } from './store/selectors/user.selectors';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userForm: FormGroup;
  dataSource = new MatTableDataSource<User>([]);

  constructor(private fb: FormBuilder, private userService: UserService,
    private store: Store<UsersState>) {
    this.userForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  ngOnInit() {
    this.store.dispatch(loadUsers());
    this.store.select(selectUsers).subscribe((res: User[]) => {
      this.createControl(res);
    });
  }

  get items(): FormArray {
    return this.userForm.get('items') as FormArray;
  }

  getUserFormControl(index: number): AbstractControl {
    return (<FormArray>this.userForm.get('items')).at(index);
  }

  updateRowData(index:number) {
    const item = (<FormArray>this.userForm.get('items')).at(index);
    item.get('isEdit')?.setValue(false);
    this.updateDataSource();
    this.store.dispatch(updateUser({ user: item.value }));
  }

  private createControl(userData: User[]): void {
    this.items.clear();
    userData.forEach((item: User) => {
      this.items.push(this.fb.group({
        name: [item.name, Validators.required],
        username: [item.username, Validators.required],
        email: [item.email, [Validators.required, Validators.email]],
        id: [item.id],
        isEdit: [false]
      }));
      this.updateDataSource();
    });
  }

  private updateDataSource(): void {
    const currentData = this.items.value;
    this.dataSource.data = currentData;
  }
}
