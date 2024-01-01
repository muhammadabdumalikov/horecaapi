const { fetch, fetchOne } = require("../../pg/pool");
const { ALL, CREATE, UPDATE, INACTIVE } = require("./model");

module.exports.all = async (search, page) => {
	return await fetchOne(ALL, `%${search}%`, page);
};

module.exports.create = async (
	companyId,
	categoryId,
	measure,
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
) => {
	return await fetchOne(
		CREATE,
		companyId,
		categoryId,
		uzName,
		ruName,
		enName,
		measure,
		barcode,
		image,
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
	measure,
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
		measure,
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

module.exports.inActive = async (id) => {
	return await fetchOne(INACTIVE, id);
};
