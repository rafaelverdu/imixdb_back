const {
  CreateAdmin,
  DesactivateAdmin,
  ListAdmin,
  UpdateAdmin,
} = require("../Repo/admin-model");

const Create = CreateAdmin;

const List = ListAdmin;

const Desactivate = DesactivateAdmin;

const Update = UpdateAdmin;

module.exports = { Create, List, Desactivate, Update };
