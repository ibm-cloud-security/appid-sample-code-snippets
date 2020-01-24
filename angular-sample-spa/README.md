# IBM Cloud AppID React Sample App

The IBM Cloud App ID SDK can be used with React to create a secure single-page application. You will need an IBM Cloud App ID instance with a single-page application created. Use the client ID and discovery endpoint from your application credentials to initialize the App ID instance.

## Prerequisites
* Node.js version 8 or later
* npm package manager
* [IBM Cloud App ID](https://cloud.ibm.com/catalog/services/app-id) instance with [SPA credentials](https://cloud.ibm.com/docs/services/appid?topic=appid-single-page#create-spa-credentials)
* A [Redirect URI](https://cloud.ibm.com/docs/services/appid?topic=appid-managing-idp#add-redirect-uri) set in the App ID service dashboard

## To run locally

1 Clone the repository.
```
git clone https://github.com/ibm-cloud-security/appid-sample-code-snippets.git
```
2 Navigate to application workspace folder.
```
cd angular-sample-app
```
3 Install dependencies for the application.
```
npm install
```
4 Start the development server. Navigate to http://localhost:4200 to access your application.
```
ng serve
```

The app will automatically reload if you change any of the source files.

## Detailed instructions on Creating you application


1 Install the Angular CLI
```
npm install -g @angular/cli
```
2 Create a workspace and initial application and go to the workspace folder
```
ng new angular-sample-spa
cd angular-sample-spa
```
3 Install the IBM Cloud AppID SDK dependency using npm
```
npm install ibmcloud-appid-js
```

4 In the src directory, go to the app folder and import App ID in the `app.component.ts` file, with the following code:
```
import AppID from 'ibmcloud-appid-js';
```
5 In the AppComponent class initialize the states of the variables to be used in the application
```
userName = '';
errorMessage = '';
buttonStyle = 'show';
messageStyle = 'hide';
errorStyle = 'hide'
```
6 Create a loginAction function which when triggered will start the authentication flow and use tokens to get the user's information. 
```
async onLoginClick() {
    const appID = new AppID();
    try {
      await appID.init({
        clientId: '<CLIENT_ID>',
        discoveryEndpoint: '<WELLKNOWN_ENDPOINT>
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
```
7 In the `app.component.html` file, clear all the content in it and add the HTML and CSS code for the application.
```
<style>
  .hide {display: none;}
  .show {display: block;}
</style>

<button
  [ngClass]="buttonStyle"
  style="background-color: #4178BE; width: 270px; height: 40px;color: #FFFFFF;font-size: 14px;border: none; margin: 10px 5px;"
  (click)="onLoginClick()">Login with IBM Cloud App ID
</button>
<p [ngClass]="messageStyle" style="margin-left: 10px;">Hi {{userName}} congratulations! You are now authenticated </p>
<div [ngClass]="errorStyle" style="margin-left: 10px; color: red;">{{errorMessage}}</div>

```
8 Save all the files and in your terminal, run the following command to access your app from http://localhost:4200.
```
ng serve
```
9 Make sure you register your redirect_uri (in this case http://localhost:3000/*) with App ID to ensure that only authorized clients are allowed to participate in the authorization workflow. This can be done on the App ID dashboard under the Manage Authentication tab in the Authentication Settings. Click [here](https://cloud.ibm.com/docs/services/appid?topic=appid-managing-idp#add-redirect-uri) for more details.

Well done! You successfully integrated IBM Cloud App ID's SDK for SPA into an Angular application.
