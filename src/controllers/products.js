const { ProductUnit } = require("../enums/index.enum");
const ProductModel = require("../models/products");
const { BodyToDbMapper, ProductBodyToDb } = require("../support/mappers");
const smsService = require('../support/sms-sender')
// import { nanoid } from 'nanoid';

module.exports.all = async (req, res) => {
	try {
		// const messageKey = nanoid(15);
		// const otp = Math.floor(10000 + Math.random() * 90000);

		// await smsService.sendSmsTo('998916084443', messageKey, otp);

		const body = req?.body;
		const data = await ProductModel.all(body);
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
			blockCount,
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
		blockCount,
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
		const data = await BodyToDbMapper({ body: req.body, mapper: ProductBodyToDb, action: 'UPDATE' }, 'products');
		
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
