const router = require("express").Router();
const Users = require("../controllers/a-users");

const { getAllMid } = require("../middlewares/a-users");
const { verify } = require("../jwt");

router.get("/", verify, getAllMid, Users.all);

module.exports = router;
