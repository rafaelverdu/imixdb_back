const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const admin = require("./src/router/admin-router");
const user = require("./src/router/user-router");
const movie = require("./src/router/movie-router");
const login = require("./src/router/login-router");

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api", admin);
app.use("/api", user);
app.use("/api", movie);
app.use("/api", login);

app.listen(3030, () => {
  console.log("servidor rodando na porta 3030");
});
