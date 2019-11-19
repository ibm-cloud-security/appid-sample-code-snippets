/*
 Copyright 2019 IBM Corp.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const appID = require("ibmcloud-appid");
const WebAppStrategy = appID.WebAppStrategy;
const request = require("request-promise");

const app = express();

const CALLBACK_URL = "/ibm/cloud/appid/callback";

const port = process.env.PORT || 3000;

// Setup express application to use express-session middleware
// Must be configured with proper session storage for production
// environments. See https://github.com/expressjs/session for
// additional documentation
app.use(session({
	secret: "123456",
	resave: true,
	saveUninitialized: true,
	proxy: true
}));

// Configure express application to use passportjs
app.use(passport.initialize());
app.use(passport.session());

let webAppStrategy = new WebAppStrategy(getAppIDConfig());
passport.use(webAppStrategy);

// Configure passportjs with user serialization/deserialization. This is required
// for authenticated session persistence accross HTTP requests. See passportjs docs
// for additional information http://passportjs.org/docs
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

// Callback to finish the authorization process. Will retrieve access and identity tokens/
// from AppID service and redirect to either (in below order)
// 1. the original URL of the request that triggered authentication, as persisted in HTTP session under WebAppStrategy.ORIGINAL_URL key.
// 2. successRedirect as specified in passport.authenticate(name, {successRedirect: "...."}) invocation
// 3. application root ("/")
app.get(CALLBACK_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {failureRedirect: '/error'}));

// Protect everything under /protected
app.use("/protected", passport.authenticate(WebAppStrategy.STRATEGY_NAME));

// This will statically serve pages:
app.use(express.static("public"));

// // This will statically serve the protected page (after authentication, since /protected is a protected area):
app.use('/protected', express.static("protected"));

app.get("/logout", (req, res) => {
	WebAppStrategy.logout(req);
	res.redirect("/");
});

// Serves the identity token payload
app.get("/protected/api/idPayload", (req, res) => {
	res.send({idToken: req.session[WebAppStrategy.AUTH_CONTEXT].identityTokenPayload, accessToken: req.session[WebAppStrategy.AUTH_CONTEXT].accessTokenPayload});
});

//-------------------------------------- access control ----------------------------------------//

// This endpoint will return true if we should show the technician menu.
// we show this menu if request's access token contains the scopes "elevator.stop" and "elevator.service".
app.get("/protected/api/shouldShowTechnicianMenu", (req, res) => {
	res.send(WebAppStrategy.hasScope(req, 'elevator.service elevator.stop'));
});

// Call protected endpoint on backend, where we will check if the access token has the "elevator.service" scope.
app.get("/protected/serviceMode", async function(req, res) {
	const options = {
		url: 'http://localhost:1234/protected/serviceMode',
		headers: {
			'Authorization': 'Bearer ' + req.session[WebAppStrategy.AUTH_CONTEXT].accessToken + ' ' + req.session[WebAppStrategy.AUTH_CONTEXT].identityToken
		}
	};
	try {
		await request(options);
		res.send("Elevator is on service mode.");
	}catch(e) {
		res.send("You don't have permissions to perform this action.");
	}
});

// Call protected endpoint on backend, where we will check if the access token has the "elevator.stop" scope.
app.get("/protected/stopElevator", async function(req, res) {
	const options = {
		url: 'http://localhost:1234/protected/stopElevator',
		headers: {
			'Authorization': 'Bearer ' + req.session[WebAppStrategy.AUTH_CONTEXT].accessToken + ' ' + req.session[WebAppStrategy.AUTH_CONTEXT].identityToken
		}
	};
	try{
		await request(options);
		res.send("Elevator is now stopped.");
	} catch (e) {
		res.send("You don't have permissions to perform this action.");
	}
});

//--------------------------------------------------------------------------------------------//

app.get('/error', (req, res) => {
	res.send('Authentication Error');
});

app.listen(port, () => {
	console.log("Listening on http://localhost:" + port);
});

function getAppIDConfig() {
	let config;
	
	try {
		// if running locally we'll have the local config file
		config = require('./localdev-config.json');
	} catch (e) {
		if (process.env.APPID_SERVICE_BINDING) { // if running on Kubernetes this env variable would be defined
			config = JSON.parse(process.env.APPID_SERVICE_BINDING);
			config.redirectUri = process.env.redirectUri;
		} else { // running on CF
			let vcapApplication = JSON.parse(process.env["VCAP_APPLICATION"]);
			return {"redirectUri" : "https://" + vcapApplication["application_uris"][0] + CALLBACK_URL};
		}
	}
	return config;
}
