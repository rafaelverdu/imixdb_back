const db = require("../model/conexao");
const knex = require("knex");
const jwt = require("jsonwebtoken");
const SECRET = "id|name|email|id_permission";

const verifyJWT = async (req, res, next) => {
  const token = req.headers["x-acess-token"];
  jwt.verify(token, SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }

    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      perm: decoded?.perm,
    };

    next();
  });
};

module.exports = verifyJWT;
