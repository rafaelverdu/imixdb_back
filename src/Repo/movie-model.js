const db = require("../model/conexao");
const knex = require("knex");

const CreateMovie = async (req, res) => {
  try {
    const user = req?.user;

    const perm = user?.perm;

    const { nome, diretor, ano, descricao } = req.body;

    if (!perm) {
      return res.status(500).send("Admin sem permissão");
    }

    if (perm !== 1) {
      return res.status(500).send("Admin sem permissão");
    }

    await db("movie").insert({
      nome,
      diretor,
      ano,
      descricao,
    });
    return res.status(201).send({
      msg: "Filme Adicionado com sucesso",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro ao cadastrar filme");
  }
};

const ListMovie = async (req, res) => {
  console.log(req);
  try {
    const filters = {};

    if (req?.query?.nome) {
      filters.nome = "%" + req.query.nome + "%";
    }

    if (req?.query?.diretor) {
      filters.diretor = "%" + req.query.diretor + "%";
    }

    if (req?.query?.ano) {
      filters.ano = req?.query?.ano;
    }

    const resultado = await db("movie")
      .select("*")
      .where(function () {
        if (filters.nome) {
          this.where("nome", "like", filters.nome);
        }
        if (filters.diretor) {
          this.where("diretor", "like", filters.diretor);
        }
        if (filters.ano) {
          this.where("ano", filters.ano);
        }
      });
    res.status(201).send({ resultado });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar filme");
  }
};

const DetailMovie = async (req, res) => {
  try {
    const id = req.params.id;

    let movies = await db("movie").where("id", id);
    const selectedMovie = movies[0];

    if (!movies?.length) {
      return res.status(201).send({ msg: "se fudeu papai" });
    }
    const votos = await db("votes")
      .avg("votes.vote as media")
      .count("votes.vote as votos")
      .where("movie_id", id);

    selectedVotes = votos[0];

    return res.status(200).send({ selectedMovie, selectedVotes });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar filmes");
  }
};

module.exports = { CreateMovie, ListMovie, DetailMovie };
