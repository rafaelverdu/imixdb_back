const express = require("express");
const {
  Create,
  List,
  Update,
  Desactivate,
} = require("../controller/admin-controller");
const router = express.Router();

router.post("/admin/create", Create);
router.put("/admin/update/:id", Update);
router.get("/admin/list", List);
router.put("/admin/desactivate/:id", Desactivate);

module.exports = router;
