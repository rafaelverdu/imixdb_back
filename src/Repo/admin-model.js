const db = require("../model/conexao");
const knex = require("knex");
const crypto = require("crypto");

const CreateAdmin = async (req, res) => {
  console.log("teste");
  try {
    const { username, cpf, ativo } = req.body;
    const { password } = req.body;
    const hash = crypto.createHash("sha256").update(password).digest("hex");

    await db("admin").insert({ username, password: hash, cpf, ativo });
    res.status(201).send("Admin cadastrado com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar admin");
  }
};

const UpdateAdmin = async (req, res) => {
  try {
    await db("admin").where({ id: req.params.id }).update(req.body);
    res.status(201).send("Admin atualizado com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro em atualizar User");
  }
};

const ListAdmin = async (req, res) => {
  try {
    const filters = {};

    if (req?.query?.nome) {
      filters.nome = req?.query?.nome;
    }

    const data = await db("admin")
      .select("username", "id")
      .where({ ...filters });
    res.status(201).send({ data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar admin");
  }
};

const DesactivateAdmin = async (req, res) => {
  try {
    const { ativo } = req.body;

    await db("admin").where({ id: req.params.id }).update(req.body);
    res.status(201).send("Admin atualizado com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro em atualizar User");
  }
};

module.exports = { CreateAdmin, ListAdmin, UpdateAdmin, DesactivateAdmin };
