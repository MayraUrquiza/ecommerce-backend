import UsersService from "../services/Users.js";

class UserController {
  constructor() {
    this.service = new UsersService();
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.service.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(error.status || 500).json({ error });
    }
  };

  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.service.getUserById(id);

      res.status(200).json(user);
    } catch (error) {
      res.status(error.status || 500).json({ error });
    }
  };

  saveUser = async (req, res) => {
    try {
      const result = await this.service.saveUser(req.body);
      res
        .status(201)
        .json({
          status: 201,
          description: "El usuario fue creado.",
          product: result,
        });
    } catch (error) {
      res.status(error.status || 500).json({ error });
    }
  };
}

export default UserController;
