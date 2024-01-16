const CompanyModel = require("../models/companies");

module.exports.all = async (req, res) => {
	try {
		const { search, page, active, limit } = req?.body;
		const data = await CompanyModel.all(search, page, active, limit);

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
		const { uzName, ruName, enName, uzCountry, ruCountry, enCountry } =
			req?.body;

		const data = await CompanyModel.create(
			uzName,
			ruName,
			enName,
			uzCountry,
			ruCountry,
			enCountry
		);

		if (!data) {
			res.status(401).json({
				error: true,
				message: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (data.constraint === "company_uz_name_uniq") {
			res.status(449).json({
				error: true,
				message: `Bu nomdagi kompaniya avval ro'yxatdan o'tgan`,
			});
			return;
		} else if (data.constraint === "company_ru_name_uniq") {
			res.status(449).json({
				error: true,
				message: `Bu nomdagi kompaniya avval ro'yxatdan o'tgan`,
			});
			return;
		} else if (data.constraint === "company_en_name_uniq") {
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
		const { uzName, ruName, enName, uzCountry, ruCountry, enCountry, id } =
			req?.body;

		const data = await CompanyModel.update(
			uzName,
			ruName,
			enName,
			uzCountry,
			ruCountry,
			enCountry,
			id
		);

		if (!data) {
			res.status(401).json({
				error: true,
				message: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (data.constraint === "company_uz_name_uniq") {
			res.status(449).json({
				error: true,
				message: `Bu nomdagi kompaniya avval ro'yxatdan o'tgan`,
			});
			return;
		} else if (data.constraint === "company_ru_name_uniq") {
			res.status(449).json({
				error: true,
				message: `Bu nomdagi kompaniya avval ro'yxatdan o'tgan`,
			});
			return;
		} else if (data.constraint === "company_en_name_uniq") {
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

		const data = await CompanyModel.inActive(id);

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
