const {
  getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  getUserValidation,
  addUserValidation,
} = require("../models/user.model");

const userRoutes = [
  {
    method: "GET",
    url: "/users",
    handler: getAllUsers,
  },
  {
    method: "GET",
    url: "/users/:id",
    schema: getUserValidation,
    handler: getOneUser,
  },
  {
    method: "POST",
    url: "/users",
    schema: addUserValidation,
    handler: addUser,
  },
  {
    method: "PUT",
    url: "/users/:id",
    handler: updateUser,
  },
  {
    method: "DELETE",
    url: "/users/:id",
    handler: deleteUser,
  },
];

module.exports = userRoutes;
