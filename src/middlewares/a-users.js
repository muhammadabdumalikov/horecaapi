const { newLine, isNumber } = require("../support/types");

module.exports.getAllMid = async (req, res, next) => {
	try {
		const { pageIndex, search, active, pageSize } = req?.query;
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
				limit: l,
				search: search ? search.trim() : "",
				active:
					active === "true"
						? active
						: active === "false"
						? active
						: null,
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
