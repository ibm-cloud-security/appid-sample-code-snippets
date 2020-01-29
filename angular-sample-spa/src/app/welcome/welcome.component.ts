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
        clientId: '1b0e3658-fc1f-402e-843c-18402d4dbe58',
        discoveryEndpoint: 'https://eu-gb.appid.test.cloud.ibm.com/oauth/v4/5b1eb5f1-34bd-41fd-b6dd-e257c188a4dd/.well-known/openid-configuration'
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
