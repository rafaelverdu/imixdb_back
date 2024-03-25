const db = require("../model/conexao");
const knex = require("knex");
const crypto = require("crypto");

const CreateUser = async (req, res) => {
  try {
    const { nome, cpf, password } = req.body;
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    await db("user").insert({ nome, cpf, password: hash });
    res.status(201).send("User cadastrado com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar user");
  }
};

const ListUser = async (req, res) => {
  try {
    const filters = {};

    if (req?.query?.nome) {
      filters.nome = req?.query?.nome;
    }

    const resultado = await db("user")
      .select("*")
      .where({ ...filters });
    res.status(201).send({
      data: resultado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar user");
  }
};

const DesativateUser = async (req, res) => {
  try {
    const { ativo } = req.body;
    await db("user")
      .where({ id: req.params.id })
      .update({ ativo: req.body.ativo, nome: req.body.nome });
    res.status(201).send("User atualizado com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro em atualizar User");
  }
};

const CreateVote = async (req, res) => {
  try {
    const { user_id, movie_id, vote } = req.body;
    await db("votes").insert({ user_id, movie_id, vote });
    res.status(201).send("Voto cadastrado com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar voto");
  }
};

module.exports = { CreateUser, ListUser, DesativateUser, CreateVote };
