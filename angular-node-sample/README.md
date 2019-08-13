
# Cloud Land sample Web application

## Package contents

### CloudLand-Backend
`cloudland-backend/app.js`  Uses Express to set the routes and views.

`user/rewardpoints`  is the protected resource in the backend. This is where
we check whether the user is authorized or not. In the case where the user is not authorized, we send a request to the
authentication server to start the OAuth flow. If the user is authorized, we show the protected data.

### CloudLand-UI

`cloudland-ui/src/app/app.component.html`  The application landing page. Click **Login** to start.

## Clarification
This sample runs on one instance and uses the session to store the authorization data.
In order to run it in production mode, use services such as Redis to store the relevant data.

## Running locally

### Usage

1. Install Node Package Manager

2. Install Angular CLI

3. Setup up your App ID Instance on IBM Cloud, refer to the App ID documentation for more information.

4. To run your local example configured against your working AppID instance in IBM Cloud, you must know the following properties: `clientId`, `oauthServerUrl`, `profilesUrl`, `secret`, `tenantId`.
You can get these from AppID dashboard in IBM Cloud in `Service credentials`.

Navigate to cloudland-backend directory and copy `config.template.json` to `config.json` and fill the properties mentioned above.

5. Navigate to cloudland-backend directory and Run `npm install` and then `npm start` and you should see that your Node backend is up and running on localhost:3000.

6. Navigate to cloudland-ui directory and Run `npm install` and then `ng serve --open` and you should see a new tab open up in your browser at localhost:4200





