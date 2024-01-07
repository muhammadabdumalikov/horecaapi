const { fetch, fetchOne } = require("../../pg/pool");
const {
	ALL,
	SIGNUP,
	SIGIN,
	VERIFYPASSWORD,
	RETRYVERIFYPASSWORD,
} = require("./model");

module.exports.signUp = async (
	contact,
	password,
	fullname,
	organization,
	legalName,
	lang,
	location,
	address
) => {
	return await fetchOne(
		SIGNUP,
		contact,
		password,
		fullname,
		organization,
		legalName,
		lang,
		location,
		address
	);
};

module.exports.signin = async (contact, password) => {
	return await fetchOne(SIGIN, contact, password);
};

module.exports.verifyPassword = async (userId, password) => {
	return await fetchOne(VERIFYPASSWORD, userId, password);
};

module.exports.retrySmsVerify = async (userId) => {
	return await fetchOne(RETRYVERIFYPASSWORD, userId);
};

module.exports.all = async (search, page) => {
	return await fetchOne(ALL, `%${search}%`, page);
};
