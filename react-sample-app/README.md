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

## Detailed instructions on creating and securing an app from scratch

### Creating your app

1. Set up a frontend build pipelines by using Create React App.
```JSX
npx create-react-app my-app
cd my-app
```
2. Install the IBM Cloud AppID SDK.
```JSX
npm install ibmcloud-appid-js
```
3. In your code editor, in the `src` directory of the application, open the `App.js` file. Import App ID by adding the following code:
```JSX
import AppID from 'ibmcloud-appid-js';
```
4. In the main App() function, declare a new App ID instance with `useMemo`, which recomputes a memoized value when a dependency changes.
```JSX
const appid = useMemo(() => {
    return new AppID()
  }, []);
```
5. Initialize App ID and add error handling. Add your client ID and discovery endpoint which can be found in the Applications tab of the App ID dashboard.
```JSX
const [errorState, setErrorState] = React.useState(false);
const [errorMessage, setErrorMessage] = React.useState('');
(async () => {
    try {
      await appid.init({
        clientId: '<SPA_CLIENT_ID>',
        discoveryEndpoint: '<WELL_KNOWN_ENDPOINT>'
      });
    } catch (e) {
      setErrorState(true);
      setErrorMessage(e.message);
    }
  })();
```
6. Create a login action that will execute when the login button is clicked. After a successful authentication, the welcomeDisplayState will be set to true and the userName will be set to the name returned in the App ID token.
```JSX
const [welcomeDisplayState, setWelcomeDisplayState] = React.useState(false);
const [loginButtonDisplayState, setLoginButtonDisplayState] = React.useState(true);
const [userName, setUserName] = React.useState('');
const loginAction = async () => {
  try {
    const tokens = await appID.signin();
    setErrorState(false);
    setLoginButtonDisplayState(false);
    setWelcomeDisplayState(true);
    setUserName(tokens.idTokenPayload.name);
  } catch (e) {
    setErrorState(true);
    setErrorMessage(e.message);
  }
};
```
7. Add a welcome div, the login button that calls the login action, and an error div.
```JSX
{welcomeDisplayState && <div> Welcome {userName}! You are now authenticated.</div>}
{loginButtonDisplayState && <button style={{fontSize: '24px', backgroundColor: 'skyblue', border: 'none'}} id='login' onClick={loginAction}>Login</button>}
{errorState && <div style={{color: 'red'}}>{errorMessage}</div>}
```
8. Save all of the files. Your entire `App.js` file should look like this:
```JSX
import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppID from 'ibmcloud-appid-js';

function App() {
  const appID = React.useMemo(() => {
  return new AppID()
}, []);

const [errorState, setErrorState] = React.useState(false);
const [errorMessage, setErrorMessage] = React.useState('');
(async () => {
  try {
    await appID.init({
      'clientId': '<SPA_CLIENT_ID>',
      'discoveryEndpoint': '<WELL_KNOWN_ENDPOINT>'
    });
  } catch (e) {
    setErrorState(true);
    setErrorMessage(e.message);
  }
})();

const [welcomeDisplayState, setWelcomeDisplayState] = React.useState(false);
const [loginButtonDisplayState, setLoginButtonDisplayState] = React.useState(true);
const [userName, setUserName] = React.useState('');
const loginAction = async () => {
  try {
    const tokens = await appID.signin();
    setErrorState(false);
    setLoginButtonDisplayState(false);
    setWelcomeDisplayState(true);
    setUserName(tokens.idTokenPayload.name);
  } catch (e) {
    setErrorState(true);
    setErrorMessage(e.message);
  }
};
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        {welcomeDisplayState && <div> Welcome {userName}! You are now authenticated.</div>}
        {loginButtonDisplayState && <button style={{fontSize: '24px', backgroundColor: 'skyblue', border: 'none'}} id='login' onClick={loginAction}>Login</button>}
        {errorState && <div style={{color: 'red'}}>{errorMessage}</div>}
      </header>
    </div>
  );
}

export default App;
```
9. Open your terminal. Run the following command to access your app from http://localhost:3000.
```JSX
npm start
```

Well done! You successfully integrated IBM Cloud App ID's SDK for SPA into a React application.
