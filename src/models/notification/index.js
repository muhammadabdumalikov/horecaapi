const { fetch, fetchOne } = require("../../pg/pool");
const { ALL, CREATE, UPDATE, INACTIVE, DELETED } = require("./model");

module.exports.all = async (search, page) => {
	return await fetchOne(ALL, `%${search}%`, page);
};

module.exports.create = async (topic, content, image) => {
	return await fetchOne(CREATE, topic, content, image);
};

module.exports.update = async (topic, content, image, id) => {
	return await fetchOne(UPDATE, topic, content, image, id);
};

module.exports.inActive = async (id) => {
	return await fetchOne(INACTIVE, id);
};

module.exports.deleted = async (id) => {
	return await fetchOne(DELETED, id);
};
