const express = require('express');
const log4js = require('log4js');
const jwtDecode = require('jwt-decode');

const logger = log4js.getLogger('istio-sample-app');
logger.level = process.env['LOG_LEVEL'] || 'trace';

const app = express();

app.get('/', (req, res) => {
	return res.status(200).send({
		routes: [
			"/web/home",
			"/web/home/:id",
			"/api/headers",
			"/api/headers/:id",
		]
	})
});

const handler = (req, res) => {
	res.status(200).send(req.headers)
};

const protected = (req, res) => {
	let decodedToken;
	let protection;
	let name;
	if (req.headers.authorization != null) {
		decodedToken = jwtDecode(req.headers.authorization);
		name = "Test User";
	} else {
		decodedToken = "{}";
		name = "Guest";
		protection = "non";
	}
	res.render('protected.ejs', {decodedToken:decodedToken, name:name, protection:protection});
};

// Frontend
app.get('/web/home', protected);
app.get('/web/home/:id', handler);
app.get('/web/user', handler);
app.get('/protected/api/idPayload', (req, res) => {
	res.send(req.user);
});

// API
app.get('/api/headers', handler);
app.post('/api/headers',handler);
app.put('/api/headers', handler);
app.delete('/api/headers', handler);
app.patch('/api/headers', handler);

// API depth 2
app.get('/api/headers/:id', handler);
app.post('/api/headers/:id', handler);
app.put('/api/headers/:id', handler);
app.delete('/api/headers/:id', handler);
app.patch('/api/headers/:id', handler);

app.listen(8000, () => {
	logger.info('Listening on port 8000');
});
