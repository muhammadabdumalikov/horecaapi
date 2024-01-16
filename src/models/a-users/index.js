const { fetch, fetchOne } = require("../../pg/pool");
const { ALL } = require("./model");

module.exports.getAll = async (search, page, active = true, limit = 40) => {
	return await fetchOne(ALL, `%${search}%`, page, active, limit);
};
