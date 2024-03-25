const {
  CreateUser,
  ListUser,
  DesativateUser,
  CreateVote,
} = require("../Repo/user-model");

const Create = CreateUser;

const Detalhes = ListUser;

const Status = DesativateUser;

const Vote = CreateVote;

module.exports = { Create, Detalhes, Status, Vote };
