const AuthModel = require("../models/auth");
const jwt = require("../jwt");

module.exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const admin = await AuthModel.login(username, password);

		if (!admin) {
			res.status(401).json({
				error: true,
				message: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (admin?.severity) {
			res.status(409).json({
				error: true,
				message: `Bazaviy xatolik: ${String(admin)}`,
			});
			return;
		} else {
			const accessToken = jwt.signAdmin(admin);
			res.status(201).json({
				error: false,
				admin: admin,
				accessToken,
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
