const router = require("express").Router();
const Orders = require("../controllers/orders");

const {
	getAllMid,
	createMid,
	updateInAcMid,
} = require("../middlewares/orders");
const { verify } = require("../jwt");

router.get("/", getAllMid, Orders.all);
router.post("/create", createMid, Orders.add);
router.put("/in-active", updateInAcMid, Orders.inActive);
router.get("/my", verify, getAllMid, Orders.getOwnOrders);

module.exports = router;
