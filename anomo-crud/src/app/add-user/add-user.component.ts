import { UserModel } from './../user.model';
import { EmitterService } from './../services/emitter.service';
import { HttpService } from './../services/http.service';
import { FormsModule } from '@angular/forms';
import { Component, OnChanges, Input } from '@angular/core';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [ HttpService ]
})
export class AddUserComponent implements OnChanges {

  @Input() userInfo: string;
  @Input() clear: string;
  @Input() userList: string;

  private isInsert: boolean = true;
  private userModel: UserModel = new UserModel('', '', '', '', '');

  constructor(
    private http: HttpService
  ) { }

  public addUser() {
    this.http.addUser(this.userModel).subscribe(
      res => {
        if (res.err) {
          console.log('Server error, user could not be added');
        } else {
          EmitterService.get(this.userList).emit(res.users);
        }
      },
      err => {
        console.log('Server error, user could not be added');
      }
    );
  }

  public updateUser() {
    this.http.editUser(this.userModel).subscribe(
      res => {
        if (res.err) {
          console.log('Server error, user could not be added');
        } else {
          EmitterService.get(this.userList).emit(res.users);
        }
      },
      err => {
        console.log('Server error, user could not be added');
      }
    );
  }

  public clearAddUser() {
    this.userModel = new UserModel('', '', '', '', '');
    EmitterService.get(this.clear).emit(true);
    this.isInsert = true;
  }

  ngOnChanges(changes: any) {
    EmitterService.get(this.userInfo).subscribe(
      (value: UserModel) => {
        this.userModel = new UserModel(value._id, value.name, value.email, value.password, value.avatar);
        this.isInsert = false;
      }
    )
  }

}
