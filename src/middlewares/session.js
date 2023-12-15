const session = require('express-session');
require('dotenv').config();

module.exports.sessionMiddleware = session({
	secret: process.env.SESSION_SECRET_KEY,
	credentials: true,
	name: "sid",
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: process.env.NODE_ENV === 'production' ? true : 'auto',
		httpOnly: true,
		expires: 1000 * 60 * 60 * 24 * 7,
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
	}
});
