const { fetch, fetchOne } = require("../../pg/pool");
const {
	ALL,
	SIGNUP,
	SIGIN,
	VERIFYPASSWORD,
	RETRYVERIFYPASSWORD,
	GETONE,
} = require("./model");

module.exports.signUp = async (
	contact,
	fullname,
	organization,
	legalName,
	location,
	address
) => {
	// console.log(contact, fullname, organization, legalName, location, address);
	return await fetchOne(
		SIGNUP,
		contact,
		fullname,
		organization,
		legalName,
		location,
		address
	);
};

module.exports.signin = async (contact) => {
	return await fetchOne(SIGIN, contact);
};

module.exports.verifyPassword = async (userId, password) => {
	console.log(userId, password);
	return await fetchOne(VERIFYPASSWORD, userId, password);
};

module.exports.retrySmsVerify = async (keyId) => {
	return await fetchOne(RETRYVERIFYPASSWORD, keyId);
};

module.exports.all = async (search, page) => {
	return await fetchOne(ALL, `%${search}%`, page);
};

module.exports.getOne = async (userId) => {
	return await fetchOne(GETONE, userId);
};
