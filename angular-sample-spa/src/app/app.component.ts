import { Component } from '@angular/core';
import AppID from 'ibmcloud-appid-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  userName = ''
  idToken = '';
  userData = '';
  errorMessage = '';
  style = 'show';
  displayState = 'hide';

  async onLoginClick() {
    const appid = new AppID();
    try {
      await appid.init({
        clientId: '<CLIENT_ID>',
        discoveryEndpoint: '<WELL_KNOWN_ENDPOINT>'
      });
      const tokens = await appid.signin();
      const userInfo =  await appid.getUserInfo(tokens.accessToken);
      const decodeIDTokens = tokens.idTokenPayload;
      this.userName = 'Hi ' + decodeIDTokens.name + ', Congratulations!';
      this.idToken = JSON.stringify(decodeIDTokens);
      this.userData = JSON.stringify(userInfo);
      this.style = 'hide';
      this.displayState = 'show';
    } catch (e) {
      this.errorMessage = e.message;
    }
  }
}
