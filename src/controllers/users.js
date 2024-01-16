const UsersModel = require("../models/users");
const jwt = require("../jwt");
const smsService = require("../support/sms-sender");

module.exports.signup = async (req, res) => {
	try {
		const {
			contact,
			fullname,
			organization,
			legalName,
			location,
			address,
		} = req?.body;

		const data = await UsersModel.signUp(
			contact,
			fullname,
			organization,
			legalName,
			location,
			address
		);
		console.log(data);
		if (!data) {
			res.status(400).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data.constraint === "user_contact_uniq") {
			res.status(400).json({
				error: true,
				uzMessage: `Bu telefon raqam avval band qilingan`,
				ruMessage: `Этот телефон номер был забронирован ранее`,
			});
			return;
		} else if (data.constraint === "user_organization_uniq") {
			res.status(400).json({
				error: true,
				uzMessage: `Bu nom avval ro'yxatdan o'tgan`,
				ruMessage: `Это имя было зарегистрировано ранее`,
			});
			return;
		} else if (data.constraint === "user_legal_name_uniq") {
			res.status(400).json({
				error: true,
				uzMessage: `Bu nom avval ro'yxatdan o'tgan`,
				ruMessage: `Это имя было зарегистрировано ранее`,
			});
			return;
		} else if (data?.severity) {
			res.status(400).json({
				error: true,
				uzMessage: `Bazaviy xatolik: ${String(data)}`,
				ruMessage: `Ошибка базы данных: ${String(data)}`,
			});
			return;
		} else if (!data?.signup_user) {
			res.status(400).json({
				error: true,
				uzMessage: `Bazaviy xatolik: ${String(data)}`,
				ruMessage: `Ошибка базы данных: ${String(data)}`,
			});
			return;
		} else if (data?.signup_user?.error) {
			res.status(200).json({
				error: true,
				uzMessage: data?.signup_user?.uzMessage,
				ruMessage: data?.signup_user?.ruMessage,
			});
			return;
		} else {
			const signupUser = data?.signup_user;
			await smsService.sendSmsTo(
				contact,
				signupUser?.keyId,
				signupUser?.verifyPass
			);
			const accessToken = jwt.signUser(data?.signup_user);
			delete signupUser.verifyPass;
			res.status(200).json({
				error: false,
				data: signupUser,
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
		const { contact } = req?.body;
		const data = await UsersModel.signin(contact);
		console.log(data);
		if (!data) {
			res.status(400).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data?.severity) {
			res.status(400).json({
				error: true,
				uzMessage: `Bazaviy xatolik: ${String(data?.sign_in?.message)}`,
				ruMessage: `Ошибка базы данных: ${String(
					data?.sign_in?.message
				)}`,
			});
			return;
		} else if (!data?.sign_in) {
			res.status(400).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data?.sign_in?.error) {
			res.status(200).json({
				error: false,
				status: data?.sign_in?.status,
				uzMessage: `${data?.sign_in?.uzMessage}`,
				ruMessage: `${data?.sign_in?.ruMessage}`,
			});
			return;
		} else {
			const signinUser = data?.sign_in;
			await smsService.sendSmsTo(
				contact,
				signinUser?.keyId,
				signinUser?.verifyPass
			);
			delete signinUser.verifyPass;
			res.status(200).json({
				error: false,
				data: signinUser,
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
		const { keyId, password } = req?.body;
		const data = await UsersModel.verifyPassword(keyId, password);
		if (!data) {
			res.status(400).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data?.severity) {
			res.status(400).json({
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
			res.status(400).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data?.verify_gmail_password_u?.error) {
			res.status(400).json({
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
		const { keyId } = req?.body;
		const data = await UsersModel.retrySmsVerify(keyId);
		if (!data) {
			res.status(400).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data?.severity) {
			res.status(400).json({
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
			res.status(400).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
				ruMessage: `Данные не найдены`,
			});
			return;
		} else if (data?.retry_sms_pass?.error) {
			res.status(400).json({
				error: true,
				uzMessage: `${data?.retry_sms_pass?.uzMessage}`,
				ruMessage: `${data?.retry_sms_pass?.ruMessage}`,
			});
			return;
		} else {
			const retryUser = data?.retry_sms_pass;
			await smsService.sendSmsTo(
				retryUser?.contact,
				retryUser?.keyId,
				retryUser?.verifyPass
			);
			delete retryUser.verifyPass;

			res.status(200).json({
				error: false,
				data: retryUser,
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
			res.status(400).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (data?.severity) {
			res.status(400).json({
				error: true,
				uzMessage: `Bazaviy xatolik ${String(data)}`,
			});
			return;
		} else {
			res.status(202).json({
				error: false,
				data,
				uzMessage: "Muvaffaqiyatli bajarildi",
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			uzMessage: `Server xatolik: ${String(e)}`,
		});
		return;
	}
};

module.exports.getOne = async (req, res) => {
	try {
		const { userId } = req?.user;

		const data = await UsersModel.getOne(userId);

		if (!data) {
			res.status(400).json({
				error: true,
				uzMessage: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (data?.severity) {
			res.status(400).json({
				error: true,
				uzMessage: `Bazaviy xatolik ${String(data)}`,
			});
			return;
		} else {
			res.status(202).json({
				error: false,
				data,
				uzMessage: "Muvaffaqiyatli bajarildi",
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
