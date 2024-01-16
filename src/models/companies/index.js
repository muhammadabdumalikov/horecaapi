const { fetch, fetchOne } = require("../../pg/pool");
const { ALL, CREATE, UPDATE, INACTIVE } = require("./model");

module.exports.all = async (search, page, active = true, limit = 40) => {
	return await fetchOne(ALL, `%${search}%`, page, active, limit);
};

module.exports.create = async (
	uzName,
	ruName,
	enName,
	uzCountry,
	ruCountry,
	enCountry
) => {
	return await fetchOne(
		CREATE,
		uzName,
		ruName,
		enName,
		uzCountry,
		ruCountry,
		enCountry
	);
};

module.exports.update = async (
	uzName,
	ruName,
	enName,
	uzCountry,
	ruCountry,
	enCountry,
	id
) => {
	return await fetchOne(
		UPDATE,
		uzName,
		ruName,
		enName,
		uzCountry,
		ruCountry,
		enCountry,
		id
	);
};

module.exports.inActive = async (id) => {
	return await fetchOne(INACTIVE, id);
};
