/*
 Copyright 2017 IBM Corp.
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
const nconf = require("nconf");
const appID = require("bluemix-appid");

const helmet = require("helmet");
const express_enforces_ssl = require("express-enforces-ssl");
const cfEnv = require("cfenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const WebAppStrategy = appID.WebAppStrategy;
const userAttributeManager = appID.UserAttributeManager;
const UnauthorizedException = appID.UnauthorizedException;

const LOGIN_URL = "/ibm/bluemix/appid/login";
const CALLBACK_URL = "/ibm/bluemix/appid/callback";

const UI_BASE_URL = "http://localhost:4200";

var app = express();
var port = process.env.PORT || 3000;

app.use(cors({credentials: true, origin: UI_BASE_URL}));

const isLocal = cfEnv.getAppEnv().isLocal;
const config = getLocalConfig();
configureSecurity();

// Setup express application to use express-session middleware
// Must be configured with proper session storage for production
// environments. See https://github.com/expressjs/session for
// additional documentation
app.use(session({
    secret: "keyboardcat",
    resave: true,
    saveUninitialized: true,
      proxy: true,
      cookie: {
          httpOnly: true,
          secure: !isLocal,
          maxAge: 600000000
      }
  }));

// Configure express application to use passportjs
app.use(passport.initialize());
app.use(passport.session());


let webAppStrategy = new WebAppStrategy(config);
passport.use(webAppStrategy);

userAttributeManager.init(config);

// Configure passportjs with user serialization/deserialization. This is required
// for authenticated session persistence accross HTTP requests. See passportjs docs
// for additional information http://passportjs.org/docs
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});


// Protected area. If current user is not authenticated - redirect to the login widget will be returned.
// In case user is authenticated - a page with current user information will be returned.
app.get("/auth/login", passport.authenticate(WebAppStrategy.STRATEGY_NAME, {successRedirect : UI_BASE_URL, forceLogin: true}));

// Callback to finish the authorization process. Will retrieve access and identity tokens/
// from AppID service and redirect to either (in below order)
// 1. the original URL of the request that triggered authentication, as persisted in HTTP session under WebAppStrategy.ORIGINAL_URL key.
// 2. successRedirect as specified in passport.authenticate(name, {successRedirect: "...."}) invocation
// 3. application root ("/")
app.get(CALLBACK_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {allowAnonymousLogin: true}));



app.get("/auth/logout", function(req, res, next) {
	WebAppStrategy.logout(req);
	res.redirect(UI_BASE_URL);
});

app.get('/auth/logged', (req,res) => {
    
    let loggedInAs = {};
    if(req.session[WebAppStrategy.AUTH_CONTEXT]) {
        loggedInAs['name'] = req.user.name;
        loggedInAs['email'] = req.user.email;
    }
    
    res.send({
        logged: req.session[WebAppStrategy.AUTH_CONTEXT] ? true : false,
        loggedInAs: loggedInAs
    })
});

function isLoggedIn(req,res,next) {
	if(req.session[WebAppStrategy.AUTH_CONTEXT]) {
        next();
    } else {
        res.redirect(UI_BASE_URL);
    }
}

app.use('/user/*', isLoggedIn);


app.get('/user/rewardpoints',(req,res) => {
    
    res.send({
        "points" : 150
    })
});


function getLocalConfig() {
	if (!isLocal) {
		return {};
	}
	let config = {};
	const localConfig = nconf.env().file(`${__dirname}/config.json`).get();
	const requiredParams = ['clientId', 'secret', 'tenantId', 'oauthServerUrl', 'profilesUrl'];
	requiredParams.forEach(function (requiredParam) {
		if (!localConfig[requiredParam]) {
			console.error('When running locally, make sure to create a file *config.json* in the root directory. See config.template.json for an example of a configuration file.');
			console.error(`Required parameter is missing: ${requiredParam}`);
			process.exit(1);
		}
		config[requiredParam] = localConfig[requiredParam];
	});
	config['redirectUri'] = `http://localhost:${port}${CALLBACK_URL}`;
	return config;
}

app.listen(port, function(){
    console.log("Listening on http://localhost:" + port);
  });


function configureSecurity() {
	app.use(helmet());
	app.use(cookieParser());
	app.use(helmet.noCache());
	app.enable("trust proxy");
	if (!isLocal) {
		app.use(express_enforces_ssl());
	}
}