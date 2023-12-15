const { fetch, fetchOne } = require("../../pg/pool");
const { ALL, CREATE, UPDATE, INACTIVE } = require("./model");

module.exports.all = async (search, page) => {
	return await fetchOne(ALL, `%${search}%`, page);
};

module.exports.create = async (uzName, ruName, enName) => {
	return await fetchOne(CREATE, uzName, ruName, enName);
};

module.exports.update = async (uzName, ruName, enName, id) => {
	return await fetchOne(UPDATE, uzName, ruName, enName, id);
};

module.exports.inActive = async (id) => {
	return await fetchOne(INACTIVE, id);
};
