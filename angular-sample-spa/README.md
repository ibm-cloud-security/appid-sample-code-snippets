# IBM Cloud AppID Angular Sample App

The IBM Cloud App ID SDK can be used with Angular to create a secure single-page application. You will need an IBM Cloud App ID instance with a single-page application created. Use the client ID and discovery endpoint from your application credentials to initialize the App ID instance.

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
cd angular-sample-spa
```
3 Install dependencies for the application.
```
npm install
```
4 Start the development server. Navigate to http://localhost:4200 to access your application.
```
ng serve
```
5 Make sure you register your redirect_uri (in this case http://localhost:4200/*) with App ID to ensure that only authorized clients are allowed to participate in the authorization workflow. This can be done on the App ID dashboard under the Manage Authentication tab in the Authentication Settings. Click [here](https://cloud.ibm.com/docs/services/appid?topic=appid-managing-idp#add-redirect-uri) for more details.

Well done! You successfully integrated IBM Cloud App ID's SDK for SPA into an Angular application.
