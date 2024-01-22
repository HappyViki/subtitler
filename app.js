require('dotenv').config();
const express = require('express');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');

const authApi = require('./routes/auth');
const userApi = require('./routes/user');
const projectApi = require('./routes/project');
const subtitleApi = require('./routes/subtitle');

const User = require('./database/models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({
	extended: true,
}));
app.use(express.json());

/* DATABASE CONNECTION */

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb://0.0.0.0:27017/subtitlerTest')

	// await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');
}

app.use(express.static('public'));
app.use(express.static('template'));

/* SESSION SETUP */

app.use(expressSession({
	secret: process.env.EXPRESS_SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* API ENDPOIINTS */

app.use(authApi);
app.use(connectEnsureLogin.ensureLoggedIn(), userApi);
app.use(connectEnsureLogin.ensureLoggedIn(), projectApi);
app.use(connectEnsureLogin.ensureLoggedIn(), subtitleApi);

/* RUN APP */

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});