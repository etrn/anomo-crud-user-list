import { UserModel } from './../user.model';
import { EmitterService } from './../services/emitter.service';
import { HttpService } from './../services/http.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [ HttpService ]
})
export class UserListComponent implements OnInit, OnChanges {
  @Input() clear: string;
  @Input() userInfo: string;
  @Input() userList: string;

  private usersList;
  private currentUser: UserModel;
  private isClear: boolean;

  constructor(
    private http: HttpService
    ) { }

  ngOnInit() {
    this.http.getAllUsers().subscribe(
      res => this.usersList = res.users,
      err => { console.log(`Couldn't load users`) }
    );
  }

  public userSelected(user) {
    this.currentUser = user;
    EmitterService.get(this.userInfo).emit(this.currentUser);
    this.isClear = true;
  }

  public isSelected(user): boolean {
    if (!this.currentUser) {
      return false;
    }
    return this.currentUser._id === user._id ? true : false;
  }

  public deleteUser(userId) {
    this.http.deleteUser(userId).subscribe(
      res => {
        if (res.err) {
          console.log('Server error, user could not be deleted');
        } else {
          this.userList = res.users;
        }
      },
      err => {
        console.log('Server error', err)
      }
    )
  }
  ngOnChanges(changes: any) {
    
    EmitterService.get(this.clear).subscribe(
      (clear: string) => {
        this.isClear = false;
      }
    );

    EmitterService.get(this.userList).subscribe(
      (userList: string) => {
        this.userList = userList;
      }
    );
  }

}
