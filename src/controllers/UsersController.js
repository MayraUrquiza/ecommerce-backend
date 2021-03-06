import { JWT_EXPIRES_IN } from "../config.js";
import UsersService from "../services/Users.js";
import { isValidPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

class UserController {
  constructor() {
    this.service = new UsersService();
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.service.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  saveUser = async (req, res) => {
    try {
      const user = req.body;
      user.image = req.file?.originalname;

      const result = await this.service.saveUser(user);

      res.status(201).json({
        status: 201,
        description: "El usuario fue creado.",
        user: result,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const service = new UsersService();
      const user = await service.getUserByEmail(email);

      if (isValidPassword(user, password))
        res.status(200).send({
          status: 200,
          description: "Inicio de sesión exitoso.",
          token: {
            token: generateToken(user),
            duration: JWT_EXPIRES_IN,
          },
        });
      else
        res.status(401).send({
          status: 401,
          description:
            "No se pudo iniciar sesión con los datos proporcionados.",
          credentials: {
            email,
            password,
          },
        });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };
}

export default UserController;
