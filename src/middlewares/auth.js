const { newLine } = require("../support/types");
module.exports.authMid = async (req, res, next) => {
	try {
		const { username, password } = req?.body;
		if (!username || !password) {
			res.status(449).json({
				error: true,
				message: "Qatorlar to'ldirilganini tekshiring",
			});
			return;
		} else if (newLine([username, password])) {
			res.status(449).json({
				error: true,
				message: "Yangi qatorlar bilan kiritish cheklangan",
			});
			return;
		} else if (username?.length < 5 || password?.length < 5) {
			res.status(449).json({
				error: true,
				message: "5 belgidan kam kiritish cheklangan",
			});
			return;
		} else {
			req.body = {
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
