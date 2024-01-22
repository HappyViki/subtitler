const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../database/models/user');

router.post('/login', (req, res, next) => {

	passport.authenticate('local', (err, user, info) => {

	if (err) {			
		return next(err);
	}

	req.logIn(user, (err) => {	

		if (err) {			
			return next(err);
		}

		return res.redirect('/');
	});

	})(req, res, next);
});

router.post('/logout', (req, res, next) => {

	req.logout((err) => {
		if (err) {			
			return next(err);
		}

		return res.redirect('/');
	});
});

router.post('/register', (req, res, next) => {

	User.register({username: req.body.username, active: false}, req.body.password, (err, user) => {
		if (err) {			
			return next(err);
		}

		return res.redirect('/login.html');
	});
});

module.exports = router;