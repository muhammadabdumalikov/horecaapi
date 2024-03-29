const { newLine, isNumber } = require("../support/types");
const minLength = 3;
const maxLength = 128;
const barcodeMaxLength = 24;
const imageMaxlength = 256;
const descriptionMaxLength = 512;
const { makeid } = require("../support/files");
module.exports.getAllMid = async (req, res, next) => {
	try {
		const { search, page, companyId, categoryId, active, limit } =
			req?.query;
		const offset = page ? (page - 1) * 2 : 0;

		if (newLine([search])) {
			res.status(449).json({
				error: true,
				message: "Yangi qatorlar bilan kiritish cheklangan",
			});
			return;
		} else if (page && isNaN(offset)) {
			res.status(449).json({
				error: true,
				message: "Sahifa uchun raqam kiriting",
			});
			return;
		} else {
			req.query = {
				page: offset,
				search: search ? search.trim() : "",
				categoryId,
				companyId,
				active,
				limit,
			};
			return await next();
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Server Midd xatolik: ${String(e)}`,
		});
		return;
	}
};

module.exports.createMid = async (req, res, next) => {
	try {
		const {
			companyId,
			categoryId,
			barcode,
			countInBlock,
			description,
			countPrice,
			blockCount,
			blockPrice,
			discountPrice,
			uzName,
			ruName,
			enName,
		} = req?.body;

		const image = req?.files?.file;
		const format = image?.mimetype?.split("/")[1];
		const imageName = `${Date.now()}${makeid(5)}.${format}`;
		if (
			!uzName ||
			!ruName ||
			!enName ||
			!companyId ||
			!categoryId ||
			!barcode ||
			!blockCount ||
			!image ||
			!countInBlock ||
			!description ||
			!countPrice
		) {
			res.status(449).json({
				error: true,
				message: "Qatorlar to'ldirilganini tekshiring",
			});
			return;
		} else if (newLine([uzName, ruName, enName])) {
			res.status(449).json({
				error: true,
				message: "Yangi qatorlar bilan kiritish cheklangan",
			});
			return;
		} else if (
			uzName?.length < minLength ||
			ruName?.length < minLength ||
			enName?.length < minLength ||
			barcode?.length < minLength ||
			description?.length < minLength ||
			image?.length < minLength ||
			uzName?.length > maxLength ||
			ruName?.length > maxLength ||
			enName?.length > maxLength ||
			barcode?.length > barcodeMaxLength ||
			description?.length > descriptionMaxLength ||
			image?.length > imageMaxlength
		) {
			res.status(449).json({
				error: true,
				message: `${maxLength} belgidan kam kiritish cheklangan yoki belgilangan limitdan ko'p belgi kiritilgan`,
			});
			return;
		} else {
			req.body = {
				uzName: uzName.trim(),
				ruName: ruName.trim(),
				enName: enName.trim(),
				companyId,
				categoryId,
				barcode: barcode?.trim(),
				imageName: imageName.trim(),
				blockCount,
				countInBlock,
				description: description?.trim(),
				countPrice,
				blockPrice: blockPrice,
				discountPrice:
					discountPrice &&
					isNumber(Number(discountPrice)) &&
					Number(discountPrice) > 0
						? discountPrice
						: null,
			};
			return await next();
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Server Midd xatolik: ${String(e)}`,
		});
		return;
	}
};

module.exports.updateMid = async (req, res, next) => {
	try {
		const {
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
		} = req?.body;
		const { id } = req.query;
		if (newLine([uzName, ruName, enName])) {
			res.status(449).json({
				error: true,
				message: "Yangi qatorlar bilan kiritish cheklangan",
			});
			return;
		} else if (
			uzName?.length < minLength ||
			ruName?.length < minLength ||
			enName?.length < minLength ||
			barcode?.length < minLength ||
			description?.length < minLength ||
			image?.length < minLength ||
			uzName?.length > maxLength ||
			ruName?.length > maxLength ||
			enName?.length > maxLength ||
			barcode?.length > barcodeMaxLength ||
			description?.length > descriptionMaxLength ||
			image?.length > imageMaxlength
		) {
			res.status(449).json({
				error: true,
				message: `${maxLength} belgidan kam kiritish cheklangan yoki belgilangan limitdan ko'p belgi kiritilgan`,
			});
			return;
		} else if (isNaN(id)) {
			res.status(449).json({
				error: true,
				message: "ID uchun raqam kiriting",
			});
			return;
		} else {
			req.body = {
				uzName: uzName?.trim(),
				ruName: ruName?.trim(),
				enName: enName?.trim(),
				companyId,
				categoryId,
				barcode: barcode?.trim(),
				image: image?.trim(),
				countInBlock,
				description: description?.trim(),
				countPrice,
				blockPrice: blockPrice,
				discountPrice: discountPrice,
				id: Number(id),
			};
			req.query = { id };
			return await next();
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Server Midd xatolik: ${String(e)}`,
		});
		return;
	}
};

module.exports.updateInAcMid = async (req, res, next) => {
	try {
		const { id } = req?.body;
		if (!id) {
			res.status(449).json({
				error: true,
				message: "Qatorlar to'ldirilganini tekshiring",
			});
			return;
		} else if (id && isNaN(id)) {
			res.status(449).json({
				error: true,
				message: "ID uchun raqam kiriting",
			});
			return;
		} else {
			return await next();
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Server Midd xatolik: ${String(e)}`,
		});
		return;
	}
};
