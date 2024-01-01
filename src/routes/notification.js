const router = require("express").Router();
const Notifications = require("../controllers/notification");

const {
	getAllMid,
	createMid,
	updateMid,
	updateInAcMid,
	delMid,
} = require("../middlewares/notification");
const { verify } = require("../jwt");

router.get("/", verify, getAllMid, Notifications.all);
router.post("/create", verify, createMid, Notifications.add);
router.put("/update", verify, updateMid, Notifications.upd);
router.put("/in-active", verify, updateInAcMid, Notifications.inActive);
router.delete("/del", verify, delMid, Notifications.del);
module.exports = router;
