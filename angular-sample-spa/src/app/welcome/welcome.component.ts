import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import AppID from 'ibmcloud-appid-js';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  style = 'show';
  spinner = 'hide';
  buttonDisplay = 'show';
  errorStyle = 'hide';
  errorMessage = '';
  appid = new AppID();
  @Output() changeState = new EventEmitter();
  async ngOnInit() {
    try {
      await this.appid.init({
        clientId: '<CLIENT_ID>',
        discoveryEndpoint: '<WELL_KNOWN_ENDPOINT>'
      });
    } catch (e) {
      this.errorMessage = e.message;
      this.errorStyle = 'show';
    }
  }
  async onLoginClick() {
    try {
      this.buttonDisplay = 'hide';
      this.spinner = 'show';
      const tokens = await this.appid.signin();
      const userInfo =  await this.appid.getUserInfo(tokens.accessToken);
      const decodeIDTokens = tokens.idTokenPayload;
      const userName = 'Hi ' + decodeIDTokens.name + ', Congratulations!';
      const idToken = JSON.stringify(decodeIDTokens);
      const userData = JSON.stringify(userInfo);
      this.style = 'hide';
      this.changeState.emit({userName, idToken, userData});
    } catch (e) {
      this.errorMessage = e.message;
      this.spinner = 'hide';
      this.errorStyle = 'show';
      this.buttonDisplay = 'show';

    }
  }
}
