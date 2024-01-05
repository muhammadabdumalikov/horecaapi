const router = require("express").Router();
const Orders = require("../controllers/orders");

const {
	getAllMid,
	createMid,
	updateMid,
	updateInAcMid,
} = require("../middlewares/orders");
const { verify } = require("../jwt");

router.get("/", getAllMid, Orders.all);
router.post("/create", createMid, Orders.add);
router.put("/update", updateMid, Orders.upd);
router.put("/in-active", updateInAcMid, Orders.inActive);

module.exports = router;
