import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import AppID from 'ibmcloud-appid-js';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  style = 'show';
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
      const tokens = await this.appid.signin();
      const decodeIDTokens = tokens.idTokenPayload;
      const userName = 'Hi ' + decodeIDTokens.name + ', Congratulations!';
      this.style = 'hide';
      this.changeState.emit({userName});
    } catch (e) {
      this.errorMessage = e.message;
      this.errorStyle = 'show';
      this.buttonDisplay = 'show';
    }
  }
}
