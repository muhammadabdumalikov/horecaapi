const { newLine } = require("../support/types");
const maxLength = 3;

module.exports.getAllMid = async (req, res, next) => {
	try {
		const { page, search } = req?.query;
		const offset = page ? (page - 1) * 40 : 0;

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
			req.body = {
				page: offset,
				search: search ? search.trim() : "",
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
		const { uzName, ruName, enName, uzCountry, ruCountry, enCountry } =
			req?.body;
		if (
			!uzName ||
			!ruName ||
			!enName ||
			!uzCountry ||
			!ruCountry ||
			!enCountry
		) {
			res.status(449).json({
				error: true,
				message: "Qatorlar to'ldirilganini tekshiring",
			});
			return;
		} else if (
			newLine([uzName, ruName, enName, uzCountry, ruCountry, enCountry])
		) {
			res.status(449).json({
				error: true,
				message: "Yangi qatorlar bilan kiritish cheklangan",
			});
			return;
		} else if (
			uzName?.length < maxLength ||
			ruName?.length < maxLength ||
			enName?.length < maxLength ||
			uzCountry?.length < maxLength ||
			ruCountry?.length < maxLength ||
			enCountry?.length < maxLength
		) {
			res.status(449).json({
				error: true,
				message: `${maxLength} belgidan kam kiritish cheklangan`,
			});
			return;
		} else {
			req.body = {
				uzName: uzName.trim(),
				ruName: ruName.trim(),
				enName: enName.trim(),
				uzCountry: uzCountry.trim(),
				ruCountry: ruCountry.trim(),
				enCountry: enCountry.trim(),
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
		const { uzName, ruName, enName, uzCountry, ruCountry, enCountry, id } =
			req?.body;
		if (
			!uzName ||
			!ruName ||
			!enName ||
			!uzCountry ||
			!ruCountry ||
			!enCountry ||
			!id
		) {
			res.status(449).json({
				error: true,
				message: "Qatorlar to'ldirilganini tekshiring",
			});
			return;
		} else if (
			newLine([uzName, ruName, enName, uzCountry, ruCountry, enCountry])
		) {
			res.status(449).json({
				error: true,
				message: "Yangi qatorlar bilan kiritish cheklangan",
			});
			return;
		} else if (
			uzName?.length < maxLength ||
			ruName?.length < maxLength ||
			enName?.length < maxLength
		) {
			res.status(449).json({
				error: true,
				message: `${maxLength} belgidan kam kiritish cheklangan`,
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
				uzName: uzName.trim(),
				ruName: ruName.trim(),
				enName: enName.trim(),
				uzCountry: uzCountry.trim(),
				ruCountry: ruCountry.trim(),
				enCountry: enCountry.trim(),
				id: id,
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
