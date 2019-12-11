# IBM Cloud AppID React Sample App

The IBM Cloud AppID SDK can be used with React to create a secure single-page application. You will need an IBM Cloud App ID instance with a single-page application created. Use the clientId and discoveryEndpoint from the application credentials to initialize the AppID instance.

## Prerequisites
* Node.js version 8 or later
* npm package manager
* [IBM Cloud App ID](https://cloud.ibm.com/catalog/services/app-id) instance with [SPA credentials](https://cloud.ibm.com/docs/services/appid?topic=appid-single-page#create-spa-credentials)
* A [Redirect URI](https://cloud.ibm.com/docs/services/appid?topic=appid-managing-idp#add-redirect-uri) set in the App ID service dashboard

## To run locally

* Clone the repository
```
git clone 
```
* Navigate to application workspace folder.
```
cd angular-sample-spa
```
* To get the dpendencies for the app installed run
```
npm install
```

* To start the development server run 
```
ng serve
```

The app will automatically reload if you change any of the source files.
