const router = require("express").Router();
const Agents = require("../controllers/agents");

const {
	getAllMid,
	createMid,
	updateMid,
	updateInAcMid,
} = require("../middlewares/agents");
const { verify } = require("../jwt");

router.get("/", verify, getAllMid, Agents.all);
router.post("/create", verify, createMid, Agents.add);
router.put("/update", verify, updateMid, Agents.upd);
router.put("/in-active", verify, updateInAcMid, Agents.inActive);

module.exports = router;
