const router = require("express").Router();
const AuthController = require("../controllers/auth");
const { authMid } = require("../middlewares/auth");

router.post("/login", authMid, AuthController.login);

module.exports = router;
