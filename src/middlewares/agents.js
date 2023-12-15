const { newLine } = require("../support/types");
const maxLength = 3,
	contactLength = 9;

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
		const { districtId, fullname, contact, username, password } = req?.body;

		if (!districtId || !fullname || !contact || !username || !password) {
			res.status(449).json({
				error: true,
				message: "Qatorlar to'ldirilganini tekshiring",
			});
			return;
		} else if (
			newLine([districtId, fullname, contact, username, password])
		) {
			res.status(449).json({
				error: true,
				message: "Yangi qatorlar bilan kiritish cheklangan",
			});
			return;
		} else if (isNaN(districtId)) {
			res.status(449).json({
				error: true,
				message: "Hudud uchun to'g'ri standart kiriting",
			});
			return;
		} else if (String(contact).length !== contactLength || isNaN(contact)) {
			res.status(449).json({
				error: true,
				message: "Telefon raqam uchun to'g'ri standart kiriting",
			});
			return;
		} else if (
			fullname?.length < maxLength ||
			username?.length < maxLength ||
			password?.length < maxLength
		) {
			res.status(449).json({
				error: true,
				message: `${maxLength} belgidan kam kiritish cheklangan`,
			});
			return;
		} else {
			req.body = {
				districtId,
				fullname: fullname.trim(),
				contact: String(contact).trim(),
				username: username.trim(),
				password: password.trim(),
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
		const { districtId, fullname, contact, username, password, id } =
			req?.body;
		if (!districtId || !fullname || !contact || !username || !password) {
			res.status(449).json({
				error: true,
				message: "Qatorlar to'ldirilganini tekshiring",
			});
			return;
		} else if (
			newLine([districtId, fullname, contact, username, password])
		) {
			res.status(449).json({
				error: true,
				message: "Yangi qatorlar bilan kiritish cheklangan",
			});
			return;
		} else if (isNaN(id)) {
			res.status(449).json({
				error: true,
				message: "ID uchun raqam kiriting",
			});
			return;
		} else if (isNaN(districtId)) {
			res.status(449).json({
				error: true,
				message: "Hudud uchun to'g'ri standart kiriting",
			});
			return;
		} else if (String(contact).length !== contactLength || isNaN(contact)) {
			res.status(449).json({
				error: true,
				message: "Telefon raqam uchun to'g'ri standart kiriting",
			});
			return;
		} else if (
			fullname?.length < maxLength ||
			username?.length < maxLength ||
			password?.length < maxLength
		) {
			res.status(449).json({
				error: true,
				message: `${maxLength} belgidan kam kiritish cheklangan`,
			});
			return;
		} else {
			req.body = {
				districtId,
				fullname: fullname.trim(),
				contact: String(contact).trim(),
				username: username.trim(),
				password: password.trim(),
				id,
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
		} else if (isNaN(id)) {
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
