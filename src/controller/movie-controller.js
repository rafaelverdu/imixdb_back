const { CreateMovie, ListMovie, DetailMovie } = require("../Repo/movie-model");

const Create = async (req, res) => {
  const result = await CreateMovie(req, res);
  return result;
};

const Details = DetailMovie;

const List = ListMovie;

module.exports = { Create, Details, List };
