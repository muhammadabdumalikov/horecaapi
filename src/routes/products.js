const router = require("express").Router();
const Products = require("../controllers/products");

const {
	getAllMid,
	createMid,
	updateMid,
	updateInAcMid,
} = require("../middlewares/products");
const { verify } = require("../jwt");

router.get("/", getAllMid, Products.all);
router.post("/create", createMid, Products.add);
router.put("/update", updateMid, Products.upd);
router.put("/in-active", updateInAcMid, Products.inActive);

module.exports = router;
