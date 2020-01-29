import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayStateStatus = 'hide';
  userNameStatus = '';
  idTokenStatus = '';
  userDataStatus = '';
  onChangeState(value) {
    this.displayStateStatus = 'show';
    this.userNameStatus = value.userName;
    this.idTokenStatus = value.idToken;
    this.userDataStatus = value.userData;
  }
}
