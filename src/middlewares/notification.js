const { newLine, isNumber } = require("../support/types");
const { makeid } = require("../support/files");
const maxSize = 1024 * 1024 * 3; // max size 3 MB

module.exports.getAllMid = async (req, res, next) => {
	try {
		const { pageIndex, search, pageSize } = req?.query;
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
		const { topic, content } = req?.body;
		const image = req?.files?.file;
		const format = image?.mimetype?.split("/")[1];
		const imageName = `${Date.now()}${makeid(5)}.${format}`;

		if (!topic || !content || !image) {
			res.status(449).json({
				error: true,
				message: "Qatorlar to'ldirilganini tekshiring",
			});
			return;
		} else if (newLine([topic])) {
			res.status(449).json({
				error: true,
				message: "Yangi qatorlar bilan kiritish cheklangan",
			});
			return;
		} else if (image?.size > maxSize) {
			res.status(449).json({
				error: true,
				message: `Rasm uchun cheklangan hajm ${maxSize}MB`,
			});
			return;
		} else {
			req.body = {
				topic: topic.trim(),
				content: content.trim(),
				imageName: imageName.trim(),
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
		const { topic, content, id } = req?.body;
		const image = req?.files?.file;
		const format = image?.mimetype?.split("/")[1];
		const imageName = `${Date.now()}${makeid(5)}.${format}`;
		if (!topic || !content || !image || !id) {
			res.status(449).json({
				error: true,
				message: "Qatorlar to'ldirilganini tekshiring",
			});
			return;
		} else if (newLine([topic])) {
			res.status(449).json({
				error: true,
				message: "Yangi qatorlar bilan kiritish cheklangan",
			});
			return;
		} else if (image?.size > maxSize) {
			res.status(449).json({
				error: true,
				message: `Rasm uchun cheklangan hajm ${maxSize}MB`,
			});
			return;
		} else {
			req.body = {
				topic: topic.trim(),
				content: content.trim(),
				imageName: imageName.trim(),
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

module.exports.delMid = async (req, res, next) => {
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
