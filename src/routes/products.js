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
router.get("/find/:id", getAllMid, Products.getOne);
router.post("/create", verify, createMid, Products.add);
router.put("/update", verify, updateMid, Products.upd);
router.put("/in-active", verify, updateInAcMid, Products.inActive);

module.exports = router;
