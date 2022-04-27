const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const passwordValidator = require("../middleware/password-validator");

router.post("/signup", passwordValidator, userCtrl.createUser);
router.post("/login", userCtrl.logUser);

module.exports = router;
