const CategoryModel = require("../models/categories");

module.exports.all = async (req, res) => {
	try {
		const { search, page } = req?.body;
		const data = await CategoryModel.all(search, page);
		if (!data) {
			res.status(401).json({
				error: true,
				message: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (data?.severity) {
			res.status(409).json({
				error: true,
				message: `Bazaviy xatolik ${String(data)}`,
			});
			return;
		} else {
			res.status(200).json({
				error: false,
				data,
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Server xatolik: ${String(e)}`,
		});
		return;
	}
};

module.exports.add = async (req, res) => {
	try {
		const { uzName, ruName, enName } = req?.body;

		const data = await CategoryModel.create(uzName, ruName, enName);

		if (!data) {
			res.status(401).json({
				error: true,
				message: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (data.constraint === "category_uz_name_uniq") {
			res.status(449).json({
				error: true,
				message: `Bu nomdagi kompaniya avval ro'yxatdan o'tgan`,
			});
			return;
		} else if (data.constraint === "category_ru_name_uniq") {
			res.status(449).json({
				error: true,
				message: `Bu nomdagi kompaniya avval ro'yxatdan o'tgan`,
			});
			return;
		} else if (data.constraint === "category_en_name_uniq") {
			res.status(449).json({
				error: true,
				message: `Bu nomdagi kompaniya avval ro'yxatdan o'tgan`,
			});
			return;
		} else if (data?.severity) {
			res.status(409).json({
				error: true,
				message: `Bazaviy xatolik ${String(data)}`,
			});
			return;
		} else {
			res.status(201).json({
				error: false,
				data,
				message: "Muvaffaqiyatli bajarildi",
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Server xatolik: ${String(e)}`,
		});
		return;
	}
};

module.exports.upd = async (req, res) => {
	try {
		const { uzName, ruName, enName, id } = req?.body;
		const data = await CategoryModel.update(uzName, ruName, enName, id);

		if (!data) {
			res.status(401).json({
				error: true,
				message: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (data.constraint === "category_uz_name_uniq") {
			res.status(449).json({
				error: true,
				message: `Bu nomdagi kompaniya avval ro'yxatdan o'tgan`,
			});
			return;
		} else if (data.constraint === "category_ru_name_uniq") {
			res.status(449).json({
				error: true,
				message: `Bu nomdagi kompaniya avval ro'yxatdan o'tgan`,
			});
			return;
		} else if (data.constraint === "category_en_name_uniq") {
			res.status(449).json({
				error: true,
				message: `Bu nomdagi kompaniya avval ro'yxatdan o'tgan`,
			});
			return;
		} else if (data?.severity) {
			res.status(409).json({
				error: true,
				message: `Bazaviy xatolik ${String(data)}`,
			});
			return;
		} else {
			res.status(201).json({
				error: false,
				data,
				message: "Muvaffaqiyatli bajarildi",
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Server xatolik: ${String(e)}`,
		});
		return;
	}
};

module.exports.inActive = async (req, res) => {
	try {
		const { id } = req?.body;

		const data = await CategoryModel.inActive(id);

		if (!data) {
			res.status(401).json({
				error: true,
				message: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (data?.severity) {
			res.status(409).json({
				error: true,
				message: `Bazaviy xatolik ${String(data)}`,
			});
			return;
		} else {
			res.status(202).json({
				error: false,
				data,
				message: "Muvaffaqiyatli bajarildi",
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Server xatolik: ${String(e)}`,
		});
		return;
	}
};
