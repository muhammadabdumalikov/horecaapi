const UsersModel = require("../models/users");
const jwt = require("../jwt");

module.exports.signup = async (req, res) => {
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

		const data = await UsersModel.signUp(
			contact,
			password,
			fullname,
			organization,
			legalName,
			lang,
			location,
			address
		);

		if (!data) {
			res.status(401).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data.constraint === "user_contact_uniq") {
			res.status(449).json({
				error: true,
				uzMessage: `Bu telefon raqam avval band qilingan`,
				ruMessage: `Этот телефон номер был забронирован ранее`,
			});
			return;
		} else if (data.constraint === "user_organization_uniq") {
			res.status(449).json({
				error: true,
				uzMessage: `Bu nom avval ro'yxatdan o'tgan`,
				ruMessage: `Это имя было зарегистрировано ранее`,
			});
			return;
		} else if (data.constraint === "user_legal_name_uniq") {
			res.status(449).json({
				error: true,
				uzMessage: `Bu nom avval ro'yxatdan o'tgan`,
				ruMessage: `Это имя было зарегистрировано ранее`,
			});
			return;
		} else if (data?.severity) {
			res.status(409).json({
				error: true,
				uzMessage: `Bazaviy xatolik: ${String(data)}`,
				ruMessage: `Ошибка базы данных: ${String(data)}`,
			});
			return;
		} else if (!data?.signup_user) {
			res.status(409).json({
				error: true,
				uzMessage: `Bazaviy xatolik: ${String(data)}`,
				ruMessage: `Ошибка базы данных: ${String(data)}`,
			});
			return;
		} else if (data?.signup_user?.error) {
			res.status(409).json({
				error: true,
				uzMessage: `Bazaviy xatolik: ${String(
					data?.signup_user?.message
				)}`,
				ruMessage: `Ошибка базы данных: ${String(
					data?.signup_user?.message
				)}`,
			});
			return;
		} else {
			const accessToken = jwt.signUser(data?.signup_user);
			res.status(200).json({
				error: false,
				data: data?.signup_user,
				accessToken,
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			uzMessage: `Server xatolik: ${String(e)}`,
			ruMessage: `Ошибка сервера: ${String(e)}`,
		});
		return;
	}
};

module.exports.signin = async (req, res) => {
	try {
		const { contact, password } = req?.body;
		const data = await UsersModel.signin(contact, password);
		if (!data) {
			res.status(401).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data?.severity) {
			res.status(409).json({
				error: true,
				uzMessage: `Bazaviy xatolik: ${String(data?.sign_in?.message)}`,
				ruMessage: `Ошибка базы данных: ${String(
					data?.sign_in?.message
				)}`,
			});
			return;
		} else if (!data?.sign_in) {
			res.status(409).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data?.sign_in?.error) {
			res.status(409).json({
				error: true,
				uzMessage: `${data?.sign_in?.uzMessage}`,
				ruMessage: `${data?.sign_in?.ruMessage}`,
			});
			return;
		} else {
			const accessToken = jwt.signUser(data?.sign_in);
			res.status(200).json({
				error: false,
				data: data?.sign_in,
				accessToken,
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			uzMessage: `Server xatolik: ${String(e)}`,
			ruMessage: `Ошибка сервера: ${String(e)}`,
		});
		return;
	}
};

module.exports.verifyPassword = async (req, res) => {
	try {
		const { password } = req?.body;
		const { userId } = req?.user;
		const data = await UsersModel.verifyPassword(userId, password);
		if (!data) {
			res.status(401).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data?.severity) {
			res.status(409).json({
				error: true,
				uzMessage: `Bazaviy xatolik: ${String(
					data?.verify_gmail_password_u?.message
				)}`,
				ruMessage: `Ошибка базы данных: ${String(
					data?.verify_gmail_password_u?.message
				)}`,
			});
			return;
		} else if (!data?.verify_gmail_password_u) {
			res.status(409).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data?.verify_gmail_password_u?.error) {
			res.status(409).json({
				error: true,
				uzMessage: `${data?.verify_gmail_password_u?.uzMessage}`,
				ruMessage: `${data?.verify_gmail_password_u?.ruMessage}`,
			});
			return;
		} else {
			const accessToken = jwt.signUser(data?.verify_gmail_password_u);
			res.status(200).json({
				error: false,
				data: data?.verify_gmail_password_u,
				accessToken,
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			uzMessage: `Server xatolik: ${String(e)}`,
			ruMessage: `Ошибка сервера: ${String(e)}`,
		});
		return;
	}
};

module.exports.retrySmsVerify = async (req, res) => {
	try {
		const { userId } = req?.user;
		const data = await UsersModel.retrySmsVerify(userId);
		if (!data) {
			res.status(401).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data?.severity) {
			res.status(409).json({
				error: true,
				uzMessage: `Bazaviy xatolik: ${String(
					data?.retry_sms_pass?.message
				)}`,
				ruMessage: `Ошибка базы данных: ${String(
					data?.retry_sms_pass?.message
				)}`,
			});
			return;
		} else if (!data?.retry_sms_pass) {
			res.status(409).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data?.retry_sms_pass?.error) {
			res.status(409).json({
				error: true,
				uzMessage: `${data?.retry_sms_pass?.uzMessage}`,
				ruMessage: `${data?.retry_sms_pass?.ruMessage}`,
			});
			return;
		} else {
			const accessToken = jwt.signUser(data?.retry_sms_pass);
			res.status(200).json({
				error: false,
				data: data?.retry_sms_pass,
				accessToken,
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			uzMessage: `Server xatolik: ${String(e)}`,
			ruMessage: `Ошибка сервера: ${String(e)}`,
		});
		return;
	}
};

module.exports.inActive = async (req, res) => {
	try {
		const { userId } = req?.user;

		const data = await UsersModel.inActive(userId);

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
