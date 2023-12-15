const router = require("express").Router();
const Companies = require("../controllers/companies");

const {
	getAllMid,
	createMid,
	updateMid,
	updateInAcMid,
} = require("../middlewares/companies");
const { verify } = require("../jwt");

router.get("/", verify, getAllMid, Companies.all);
router.post("/create", verify, createMid, Companies.add);
router.put("/update", verify, updateMid, Companies.upd);
router.put("/in-active", verify, updateInAcMid, Companies.inActive);

module.exports = router;
