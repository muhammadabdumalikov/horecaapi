const router = require("express").Router();
const Regions = require("../controllers/regions");

// const {
// 	getAllMid,
// 	createMid,
// 	updateMid,
// 	updateInAcMid,
// } = require("../middlewares/regions");
// const { verify } = require("../jwt");

router.get("/", Regions.all);
// router.post("/create", verify, createMid, Regions.add);
// router.put("/update", verify, updateMid, Regions.upd);
// router.put("/in-active", verify, updateInAcMid, Regions.inActive);

module.exports = router;
