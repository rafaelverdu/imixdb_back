const db = require("../model/conexao");
const knex = require("knex");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const SECRET = "id|name|email|id_permission";

const LoginAdm = async (req, res) => {
  const { username, password } = req.body;
  hash = crypto.createHash("sha256").update(password).digest("hex");
  try {
    const user = await db("admin").where({ username, password: hash }).first();

    if (user && hash) {
      console.log({ user });
      const token = jwt.sign(
        {
          id: user?.id,
          name: user?.username,
          email: user?.email,
          perm: user?.id_permission,
        },
        SECRET,
        {
          expiresIn: 3000000,
        }
      );

      const to = `Bearer ${token}`;
      return res.json({ auth: true, token: to, tokenAll: token, user });
    } else {
      res.json({ existe: false });
    }
  } catch (error) {
    console.error("Erro ao verificar o usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = LoginAdm;
