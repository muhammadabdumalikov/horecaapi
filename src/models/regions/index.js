const { fetchOne } = require("../../pg/pool");
const { DISTRICTS } = require("./model");

module.exports.all = async () => {
	return await fetchOne(DISTRICTS);
};
