const router = require("express").Router();
const Users = require("../controllers/users");

const {
	signupMid,
	signinMid,
	verifyPasswordMid,
	retrySmsVerifyMid,
} = require("../middlewares/users");
const { verify } = require("../jwt");

// router.get("/", verify, getAllMid, Users.all);
router.post("/signup", signupMid, Users.signup);
router.post("/signin", signinMid, Users.signin);
router.post("/verify", verifyPasswordMid, Users.verifyPassword);
router.post("/r-sms", retrySmsVerifyMid, Users.retrySmsVerify);
// router.put("/update", verify, updateMid, Users.upd);
// router.put("/in-active", verify, updateInAcMid, Users.inActive);

module.exports = router;
