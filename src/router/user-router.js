const express = require("express");
const {
  Create,
  Status,
  Detalhes,
  Vote,
} = require("../controller/user-controller");
const router = express.Router();

router.post("/user/create", Create);
router.get("/user/list", Detalhes);
router.put("/user/status/:id", Status);
router.post("/user/vote", Vote);
router.get("/", (req, res) => {
  res.send("okay");
});

module.exports = router;
