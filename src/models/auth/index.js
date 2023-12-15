const { fetch, fetchOne } = require("../../pg/pool");
const { AUTH } = require("./model");

module.exports.login = async (username, password) => {
	return await fetchOne(AUTH, username, password);
};
