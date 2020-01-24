import { Component } from '@angular/core';
import AppID from 'ibmcloud-appid-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-sample-spa';
  userName = '';
  errorMessage = '';
  buttonStyle = 'show';
  messageStyle = 'hide';
  errorStyle = 'hide';
  async onLoginClick() {
    const appID = new AppID();
    try {
      await appID.init({
        clientId: '<CLIENT_ID>',
        discoveryEndpoint: '<WELL_KNOWN_ENDPOINT>'
      });
      const tokens = await appID.signin();
      const decodeIDTokens = tokens.idTokenPayload;
      this.userName = decodeIDTokens.name;
      this.buttonStyle = 'hide';
      this.messageStyle = 'show';
      this.errorStyle = 'hide';
    } catch (e) {
      this.errorStyle = 'show';
      this.errorMessage = e.message;
    }
  }
}
