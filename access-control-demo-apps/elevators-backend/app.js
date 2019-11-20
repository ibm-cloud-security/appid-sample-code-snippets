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

const APIStrategy = appID.APIStrategy;

const app = express();

const port = process.env.PORT || 1234;

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

// Configure passportjs with user serialization/deserialization. This is required
// for authenticated session persistence accross HTTP requests. See passportjs docs
// for additional information http://passportjs.org/docs
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

// Configure express application to use passportjs
app.use(passport.initialize());
app.use(passport.session());

const config = getAppIDConfig();
passport.use(new APIStrategy({
	oauthServerUrl: config.oauthServerUrl
}));

//-------------------------------------- access control ----------------------------------------//
app.get("/protected/serviceMode",
	passport.authenticate(APIStrategy.STRATEGY_NAME, {
		audience: config.clientId,
		scope: "elevator.service"
	}),
	function(req, res) {
		res.send('success');
	});
app.get("/protected/stopElevator",
	passport.authenticate(APIStrategy.STRATEGY_NAME, {
		audience: config.clientId,
		scope: "elevator.stop"
	}),
	function(req, res) {
		res.send('success');
	});
//-----------------------------------------------------------------------------------------------------//

app.listen(port, () => {
	console.log("Listening on http://localhost:" + port);
});

function getAppIDConfig() {
	const config = require('./localdev-config.json');
	return config;
}