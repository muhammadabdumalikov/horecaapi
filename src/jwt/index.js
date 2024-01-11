const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.signAdmin = ({ id, username, inActive, createdAt }) => {
	return jwt.sign(
		{
			id,
			username,
			inActive,
			createdAt,
		},
		process.env.JWT_SECRET_KEY,
		{ expiresIn: "30d" }
	);
};

module.exports.signUser = ({
	userId,
	contact,
	fullname,
	inActive,
	legalName,
	isVerified,
	organization
}) => {
	return jwt.sign(
		{
			userId,
			contact,
			fullname,
			inActive,
			isVerified,
		},
		process.env.JWT_SECRET_KEY,
		{ expiresIn: "30d" }
	);
};

module.exports.verify = (req, res, next) => {
	try {
		const authHeader = req.headers.token;
		if (authHeader) {
			jwt.verify(authHeader, process.env.JWT_SECRET_KEY, (err, user) => {
				if (err) {
					res.status(403).json({
						error: true,
						message: `Token noto'g'ri`,
						tokenError: true,
					});
				} else {
					req.user = user;
					next();
				}
			});
		} else {
			res.status(401).json({
				error: true,
				message: `Siz ro'yxatdan o'tmagansiz`,
				tokenError: true,
			});
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Serverda xatolik yuz berdi. JWT MIDD: ${String(e)}`,
		});
	}
};
