const { newLine } = require("../support/types");
const maxLength = 3,
	contactLenth = 12,
	maxLengthPass = 5,
	languages = ["uz", "ru", "en"];

module.exports.signupMid = async (req, res, next) => {
	try {
		const {
			contact,
			password,
			fullname,
			organization,
			legalName,
			lang,
			location,
			address,
		} = req?.body;
		if (
			newLine([
				contact,
				password,
				fullname,
				organization,
				legalName,
				lang,
				location,
				address,
			])
		) {
			res.status(449).json({
				error: true,
				uzMessage: "Yangi qatorlar bilan kiritish cheklangan",
				ruMessage: "Ввод с новыми строками ограничен",
			});
			return;
		} else if (String(contact).length !== contactLenth) {
			res.status(449).json({
				error: true,
				uzMessage: "Telefon raqam standart ko'rinishda emas",
				ruMessage: "Номер телефона не отображается по умолчанию.",
			});
			return;
		} else if (String(password).length < maxLengthPass) {
			res.status(449).json({
				error: true,
				uzMessage: `Parol uchun minimum belgilar soni: ${maxLengthPass}`,
				ruMessage: `Минимальное количество символов для пароля: ${maxLengthPass}`,
			});
			return;
		} else if (!languages.includes(lang)) {
			res.status(449).json({
				error: true,
				uzMessage: `Noto'g'ri til kiritildi`,
				ruMessage: `Вводится неправильный язык`,
			});
			return;
		} else {
			req.body = {
				contact: contact.trim(),
				password: password.trim(),
				fullname: fullname.trim(),
				organization: organization.trim(),
				legalName: legalName.trim(),
				lang: lang.trim(),
				location,
				address: address.trim(),
			};
			return await next();
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			uzMessage: `Server Midd xatolik: ${String(e)}`,
			ruMessage: `Ошибка сервера Midd: ${String(e)}`,
		});
		return;
	}
};

module.exports.signinMid = async (req, res, next) => {
	try {
		const { contact, password } = req?.body;
		if (!contact || !password) {
			res.status(449).json({
				error: true,
				uzMessage: "Qatorlar to'ldirilganini tekshiring",
				ruMessage: "Проверьте, заполнены ли строки",
			});
			return;
		} else if (isNaN(password)) {
			res.status(449).json({
				error: true,
				uzMessage: "Parol uchun raqam kiriting",
				ruMessage: "Введите число для пароля",
			});
			return;
		} else {
			req.body = {
				contact: String(contact).trim(),
				password: String(password).trim(),
			};
			return await next();
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			uzMessage: `Server Midd xatolik: ${String(e)}`,
			ruMessage: `Ошибка сервера Midd: ${String(e)}`,
		});
		return;
	}
};

module.exports.verifyPasswordMid = async (req, res, next) => {
	try {
		const { password } = req?.body;
		const { userId } = req?.user;
		if (!userId) {
			res.status(449).json({
				error: true,
				uzMessage: "ID uchun raqam kiriting",
				ruMessage: "Введите номер для ID",
			});
			return;
		} else if (!password) {
			res.status(449).json({
				error: true,
				uzMessage: "Qatorlar to'ldirilganini tekshiring",
				ruMessage: "Проверьте, заполнены ли строки",
			});
			return;
		} else if (isNaN(password)) {
			res.status(449).json({
				error: true,
				uzMessage: "Parol uchun raqam kiriting",
				ruMessage: "Введите число для пароля",
			});
			return;
		} else {
			req.body = {
				password: String(password).trim(),
			};
			return await next();
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			uzMessage: `Server Midd xatolik: ${String(e)}`,
			ruMessage: `Ошибка сервера Midd: ${String(e)}`,
		});
		return;
	}
};

module.exports.retrySmsVerifyMid = async (req, res, next) => {
	try {
		const { password } = req?.body;
		const { userId } = req?.user;
		if (!userId) {
			res.status(449).json({
				error: true,
				uzMessage: "ID uchun raqam kiriting",
				ruMessage: "Введите номер для ID",
			});
			return;
		} else if (!password) {
			res.status(449).json({
				error: true,
				uzMessage: "Qatorlar to'ldirilganini tekshiring",
				ruMessage: "Проверьте, заполнены ли строки",
			});
			return;
		} else {
			req.body = {
				password: String(password).trim(),
			};
			return await next();
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			uzMessage: `Server Midd xatolik: ${String(e)}`,
			ruMessage: `Ошибка сервера Midd: ${String(e)}`,
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
