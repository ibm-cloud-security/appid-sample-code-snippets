import React, {useMemo, useState} from 'react';
import logo from './images/app_id_icon.svg';
import hint from './images/hint_icon.svg';
import AppID from 'ibmcloud-appid-js';

export default function Welcome() {
    const [userName, setUserName] = useState('');
    const [idToken, setIdToken] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [errorState, setErrorState] = useState('hide')
    const [errorMessage, setErrorMessage] = useState('Error');
    const [displayState, setDisplayState] = useState('show');
    const [welcomeDisplayState, setWelcomeDisplayState] = useState('hide');

    const appid = useMemo(() => {
        return new AppID()
    }, []);

    (async () => {
        try {
            await appid.init({
                "clientId": "2539e6da-a271-48a1-906e-34b38da4a446",
                "discoveryEndpoint": "https://us-south.appid.cloud.ibm.com/oauth/v4/47ce5998-b92c-4a2a-b391-eae164be788a/.well-known/openid-configuration"
            });
        } catch (e) {
            setErrorState('error')
            setErrorMessage(e.message);
        }
    })();

    const loginAction = async () => {
        try {
            const tokens = await appid.signin();
            const userInformation =  await appid.getUserInfo(tokens.accessToken);
            const decodeToken = tokens.idTokenPayload;
            setUserName(decodeToken.name);
            setIdToken(JSON.stringify(decodeToken));
            setUserInfo(JSON.stringify(userInformation));
            setDisplayState('hide');
            setWelcomeDisplayState('show');
        } catch (e) {
            setErrorState('error')
            setErrorMessage(e.message);
        }
    };
    return (
        <>
            <div className="wrapper">
                <span><b>IBM Cloud AppID SDK Sample SPA</b></span>
            </div>
            <div className={displayState}>
                <div className='welcome-display'>
                    <img alt="App ID Logo" className="logo-icon" src={logo} />
                    <p>
                        Welcome to the<br/>
                        IBM Cloud App ID SPA SDK<br/>
                        Sample App
                    </p>
                    <button id="login" onClick={loginAction} >Login</button>
                    <div className={errorState}>{errorMessage}</div>
                </div>
                <div className="hintSection">
                    <div className="flex-bottom">
                        <img alt="hint icon" id="hintIcon" src={hint} />
                    </div>
                    <div className="flex-bottom">
                        Hint: To get started, click<br/>
                        the Login button above to reveal<br/>
                        the App ID login Pop-up window.
                    </div>
                </div>
            </div>
            <div className={welcomeDisplayState}>
                <div className="welcome-display">
                    <p id="welcomeNameID">Hi {userName}, Congratulations!</p>
                    <p id="welcomeMessageII">You've made your first authentication.</p>
                </div>
                <div className="token-display">
                    <h4>ID Token</h4>
                    <hr/>
                    <p>{idToken}</p>
                </div>
                <div className="info-display">
                    <h4>User Information</h4>
                    <hr/>
                    <p>{userInfo}</p>
                </div>
            </div>
        </>
    );
}
