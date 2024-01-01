const { ProductUnit } = require("../enums/index.enum");
const ProductModel = require("../models/products");

module.exports.all = async (req, res) => {
	try {
		const { search, page } = req?.body;
		const data = await ProductModel.all(search, page);
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
    const {
      companyId,
		  categoryId,
		  measure = req?.body?.measure ? measure : ProductUnit.piece,
		  barcode,
		  image,
		  countInBlock,
		  description,
		  countPrice,
		  blockPrice,
		  discountPrice,
		  uzName,
		  ruName,
		  enName
    } = req?.body;
		const data = await ProductModel.create(companyId,
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
		enName);

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
    const {
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
    } = req?.body;
    const data = await ProductModel.update(
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
    );

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

		const data = await ProductModel.inActive(id);

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
