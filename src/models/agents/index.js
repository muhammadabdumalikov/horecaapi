const { fetch, fetchOne } = require("../../pg/pool");
const { ALL, CREATE, UPDATE, INACTIVE } = require("./model");

module.exports.all = async (search, page, active = true, limit = 40) => {
	return await fetchOne(ALL, `%${search}%`, page, active, limit);
};

module.exports.create = async (
	districtId,
	fullname,
	contact,
	username,
	password
) => {
	return await fetchOne(
		CREATE,
		districtId,
		fullname,
		contact,
		username,
		password
	);
};

module.exports.update = async (
	districtId,
	fullname,
	contact,
	username,
	password,
	id
) => {
	return await fetchOne(
		UPDATE,
		districtId,
		fullname,
		contact,
		username,
		password,
		id
	);
};

module.exports.inActive = async (id) => {
	return await fetchOne(INACTIVE, id);
};
