const express = require("express");
const { Create, Details, List } = require("../controller/movie-controller");
const verifyJWT = require("../auth/verifyJWT");
const router = express.Router();

router.post("/movie/create", verifyJWT, Create);
router.get("/movie/detail/:id", Details);
router.get("/movie/list", List);

module.exports = router;
