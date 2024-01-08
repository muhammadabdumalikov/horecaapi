const router = require("express").Router();
const CategoryController = require("../controllers/categories");

const {
	getAllMid,
	createMid,
	updateMid,
	updateInAcMid,
} = require("../middlewares/categories");
const { verify } = require("../jwt");

router.get("/", getAllMid, CategoryController.all);
router.post("/create", verify, createMid, CategoryController.add);
router.put("/update", verify, updateMid, CategoryController.upd);
router.put("/in-active", verify, updateInAcMid, CategoryController.inActive);

module.exports = router;
