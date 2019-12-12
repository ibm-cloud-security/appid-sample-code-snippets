# IBM Cloud AppID React Sample App

The IBM Cloud App ID SDK can be used with React to create a secure single-page application. You will need an IBM Cloud App ID instance with a single-page application created. Use the client ID and discovery endpoint from your application credentials to initialize the App ID instance.

## Prerequisites
* Node.js version 8 or later
* npm package manager
* [IBM Cloud App ID](https://cloud.ibm.com/catalog/services/app-id) instance with [SPA credentials](https://cloud.ibm.com/docs/services/appid?topic=appid-single-page#create-spa-credentials)
* A [Redirect URI](https://cloud.ibm.com/docs/services/appid?topic=appid-managing-idp#add-redirect-uri) set in the App ID service dashboard

## To run locally

1. Clone the repository.
```
git clone https://github.com/ibm-cloud-security/appid-sample-code-snippets.git
```
2. Navigate to application workspace folder.
```
cd react-sample-app
```
3. Install dependencies for the application.
```
npm install
```

4. Start the development server. Navigate to http://localhost:3000 to access your application.
```
npm start
```

The app will automatically reload if you change any of the source files.
