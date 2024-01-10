const { fetch, fetchOne, fetchOneTransaction } = require("../../pg/pool");
const { ALL, CREATE, UPDATE, INACTIVE, GET_ONE } = require("./model");

module.exports.all = async ({search, page = 1, limit = 40, active = true, companyId, categoryId}) => {
	return await fetchOne(
		ALL,
		`%${search}%`,
		page,
		limit,
		active,
		companyId,
		categoryId
	);
};

module.exports.create = async (
	companyId,
	categoryId,
	barcode,
	image,
	countInBlock,
	description,
	countPrice,
	blockCount,
	blockPrice,
	discountPrice,
	uzName,
	ruName,
	enName,
) => {
	return await fetchOne(
		CREATE,
		companyId,
		categoryId,
		uzName,
		ruName,
		enName,
		barcode,
		image,
		blockCount,
		countInBlock,
		description,
		countPrice,
		blockPrice,
		discountPrice,
	);
};

module.exports.update = async (
	companyId,
	categoryId,
	barcode,
	image,
	countInBlock,
	description,
	countPrice,
	blockPrice,
	discountPrice,
	uzName,
	ruName,
	enName,
	id
) => {
	return await fetchOne(
		UPDATE,
		companyId,
		categoryId,
		uzName,
		ruName,
		enName,
		barcode,
		image,
		countInBlock,
		description,
		countPrice,
		blockPrice,
		discountPrice,
		id
	);
};

module.exports.getOne = async (id) => {
	return await fetchOne(GET_ONE, id);
}

module.exports.getOneTransaction = async (id, client) => {
	return await fetchOneTransaction(client, GET_ONE, id);
}

module.exports.inActive = async (id) => {
	return await fetchOne(INACTIVE, id);
};
