const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/stuff");
const auth = require("../middleware/auth");
const multerconfig = require("../middleware/multerconfig");
const LikeCtrl = require("../controllers/like");

router.post("/", auth, multerconfig, stuffCtrl.CreateSauce);
router.put("/:id", auth, multerconfig, stuffCtrl.modifySauce);
router.delete("/:id", auth, stuffCtrl.deleteSauce);
router.get("/", auth, stuffCtrl.getAllSauce);
router.get("/:id", auth, stuffCtrl.getOneSauce);
router.post("/:id/like", auth, LikeCtrl.likeSauce);

module.exports = router;
