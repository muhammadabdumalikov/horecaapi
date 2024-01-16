const { newLine, isNumber } = require("../support/types");
const maxLength = 3;

module.exports.getAllMid = async (req, res, next) => {
	try {
		const { pageIndex, search, pageSize, active } = req?.query;
		const l = pageSize && isNumber(Number(pageSize)) ? pageSize : 40;
		const offset = pageIndex ? (pageIndex - 1) * Number(l) : 0;
		if (newLine([search])) {
			res.status(449).json({
				error: true,
				message: "Yangi qatorlar bilan kiritish cheklangan",
			});
			return;
		} else if (pageIndex && isNaN(offset)) {
			res.status(449).json({
				error: true,
				message: "Sahifa uchun raqam kiriting",
			});
			return;
		} else {
			req.body = {
				page: offset,
				limit: l,
				search: search ? search.trim() : "",
				active:
					active === "true"
						? active
						: active === "false"
						? active
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

module.exports.createMid = async (req, res, next) => {
	try {
		const { uzName, ruName, enName } = req?.body;
		if (!uzName || !ruName || !enName) {
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
			uzName?.length < maxLength ||
			ruName?.length < maxLength ||
			enName?.length < maxLength
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
		const { uzName, ruName, enName, id } = req?.body;
		if (!uzName || !ruName || !enName || !id) {
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
				id: Number(id),
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
