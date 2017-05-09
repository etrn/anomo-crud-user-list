import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { EmitterService } from './services/emitter.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public host_id: "HOST_COMPONENT";
  public title: "CRUD User-List APP";
  private userInfo = "CRUD_USER_INFO";
  private clear = "CRUD_RESET";
  private userList = "CRUD_USER_LIST";

  constructor(
    private _emitterService: EmitterService
    ) {

  }
}